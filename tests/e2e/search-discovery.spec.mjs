import {test,expect} from '@playwright/test';
import {searchDiscovery as config} from '../../src/content/search-discovery.mjs';
const pages=!!process.env.FOLIOCOVE_PAGES_TEST,base=pages?'':'';

test('Search ownership proofs are scoped to the public Pages publication',async({page,request})=>{
  await page.goto(base+'/');
  if(pages){
    await expect(page.locator('meta[name="msvalidate.01"]')).toHaveAttribute('content',config.bingVerification);
    const key=await request.get(`${base}/${config.indexNowKey}.txt`);expect(key.status()).toBe(200);expect((await key.text()).trim()).toBe(config.indexNowKey);
    const sitemap=await request.get(`${base}/sitemap.xml`);const text=await sitemap.text();expect(text).toContain('/guides/images-to-pdf-with-filters/');expect(text).not.toContain(config.indexNowKey);
  }else{
    await expect(page.locator('meta[name="msvalidate.01"]')).toHaveCount(0);
    expect((await request.get(`/${config.indexNowKey}.txt`)).status()).toBe(404);
  }
});

test('Ordered photo guide is discoverable, readable on mobile and honest about output limits',async({page})=>{
  test.skip(!pages,'Public guide is generated only for the public Pages publication.');
  await page.setViewportSize({width:390,height:844});
  await page.goto(base+'/guides/images-to-pdf-with-filters/');
  await expect(page.getByRole('heading',{level:1})).toHaveText('How to turn ordered pictures into a PDF with filters');
  await expect(page.getByRole('link',{name:'Images to PDF',exact:true})).toHaveAttribute('href',base+'/jpg-to-pdf/');
  await expect(page.getByRole('article')).toContainText('24 megapixels');await expect(page.getByRole('article')).toContainText('OCR are not included');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.goto(base+'/');await expect(page.getByRole('link',{name:'How to turn ordered pictures into a PDF with filters',exact:true})).toBeVisible();
});
