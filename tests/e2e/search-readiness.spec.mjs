import {test,expect} from '@playwright/test';
import {searchDiscovery} from '../../src/content/search-discovery.mjs';

test.skip(!process.env.FOLIOCOVE_PAGES_TEST,'Public discovery metadata belongs to the Pages publication.');
test('Every public sitemap page exposes consistent identity, sharing and structured facts',async({request,page})=>{
  const origin=searchDiscovery.origin,sitemap=await(await request.get('/sitemap.xml')).text();
  const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1]);
  expect(new Set(urls).size).toBe(urls.length);expect(urls).toContain(origin+'/about/');
  const titles=new Set();
  for(const url of urls){
    const response=await request.get(new URL(url).pathname);expect(response.status(),url).toBe(200);
    const html=await response.text(),title=html.match(/<title>(.*?)<\/title>/)[1];
    expect(titles.has(title),url).toBe(false);titles.add(title);
    expect(html.match(/<h1\b/g)?.length,url).toBe(1);
    expect(html,url).toContain(`rel="canonical" href="${url}"`);
    expect(html,url).toContain(`property="og:url" content="${url}"`);
    expect(html.match(/property="og:image"/g)?.length,url).toBe(1);
    expect(html,url).toContain('name="twitter:card" content="summary_large_image"');
    expect(html,url).toContain(`property="og:image" content="${origin}/assets/pdfgirlfriend-preview.png"`);
    expect(html,url).toContain('href="/about/"');
    const nodes=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(match=>{const value=JSON.parse(match[1]);return value['@graph']||[value]});
    const publisher=nodes.find(node=>node['@type']==='Organization');
    expect(publisher.name,url).toBe('PDFGirlfriend');expect(publisher.sameAs,url).toContain('https://github.com/mehbul/pdfgirlfriend');
    expect(nodes.some(node=>node['@type']==='WebSite'),url).toBe(true);
    if(url!==origin+'/'){expect(nodes.some(node=>node['@type']==='BreadcrumbList'),url).toBe(true);expect(html,url).toContain('aria-label="Breadcrumb');}
    const app=nodes.find(node=>node['@type']==='WebApplication');if(app){expect(app.isAccessibleForFree).toBe(true);expect(app.offers.price).toBe(0);}
    expect(html,url).not.toContain('aggregateRating');
  }
  const preview=await request.get('/assets/pdfgirlfriend-preview.png');expect(preview.status()).toBe(200);expect(preview.headers()['content-type']).toContain('image/png');
  const feed=await(await request.get('/feed.xml')).text();expect((feed.match(/<item>/g)||[]).length).toBe(4);expect(feed).not.toContain('mehbul.github.io');
  const knowledge=await(await request.get('/docs/capabilities.md')).text();expect(knowledge).not.toContain('previously named PDFGirlfriend');expect(knowledge).toContain('PolyForm Noncommercial');
  await page.setViewportSize({width:390,height:844});await page.goto('/about/');
  await expect(page.getByRole('heading',{name:'Do you upload my documents?',exact:true})).toBeVisible();
  await expect(page.locator('article')).toContainText('without an app account');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
