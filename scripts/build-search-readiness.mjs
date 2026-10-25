import fs from 'node:fs/promises';
import path from 'node:path';
import {site} from '../src/content/site.mjs';
import {searchDiscovery} from '../src/content/search-discovery.mjs';
import {escapeHtml as e} from '../src/content/ai.mjs';

const repo='https://github.com/mehbul/pdfgirlfriend';
const decode=text=>text.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").replaceAll('&lt;','<').replaceAll('&gt;','>');
export async function buildSearchReadiness() {
  const origin=searchDiscovery.origin,image=origin+'/assets/pdfgirlfriend-preview.png';
  const png=await fs.readFile('src/static/social-preview.png');
  await fs.writeFile('dist/assets/pdfgirlfriend-preview.png',png);
  const width=png.readUInt32BE(16),height=png.readUInt32BE(20),posts=[];
  const organization={'@type':'Organization','@id':origin+'/#organization',name:site.operator,alternateName:site.alternateNames,url:origin+'/',sameAs:[repo],email:site.supportEmail};
  const website={'@type':'WebSite','@id':origin+'/#website',name:site.name,alternateName:site.alternateNames,url:origin+'/',inLanguage:'en',publisher:{'@id':organization['@id']}};
  async function walk(folder) {
    for(const entry of await fs.readdir(folder,{withFileTypes:true})) {
      const file=path.join(folder,entry.name);
      if(entry.isDirectory()){await walk(file);continue;}
      if(!file.endsWith('.html'))continue;
      let html=await fs.readFile(file,'utf8');
      const canonical=html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
      if(!canonical||!canonical.startsWith(origin+'/'))throw Error('Discovery metadata must target the public host: '+file);
      const title=decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1]||site.name);
      const description=decode(html.match(/<meta\b[^>]*name="description"[^>]*content="([^"]*)"/)?.[1]||'');
      const schemas=[];
      html=html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,(_,json)=>{
        const data=JSON.parse(json),nodes=data['@graph']||[data];
        for(const node of nodes) {
          if(node['@type']==='Organization')Object.assign(node,organization);
          if(node['@type']==='WebSite')Object.assign(node,website);
          if(['WebPage','WebApplication','BlogPosting'].includes(node['@type'])){
            node.inLanguage='en';node.isPartOf={'@id':origin+'/#website'};node.publisher={'@id':organization['@id']};
            node.image=image;
            if(node['@type']==='WebApplication'){node.isAccessibleForFree=true;node.offers={'@type':'Offer',price:0,priceCurrency:'INR'};node.license=repo+'/blob/main/LICENSE';}
          }
          if(node['@type']==='BlogPosting')posts.push({...node});
        }
        schemas.push(...nodes);
        return '<script type="application/ld+json">'+JSON.stringify(data).replaceAll('<','\\u003c')+'</script>';
      });
      const extra=[];
      if(!schemas.some(n=>n['@type']==='Organization'))extra.push(organization);
      if(!schemas.some(n=>n['@type']==='WebSite'))extra.push(website);
      const parts=new URL(canonical).pathname.split('/').filter(Boolean);
      if(parts.length&&!schemas.some(n=>n['@type']==='BreadcrumbList')) {
        const crumbs=[{name:'All PDF tools',url:origin+'/'}];
        if(parts.length>1)crumbs.push({name:({blog:'PDF comparisons & privacy',guides:'PDF guides',demo:'PDF demonstrations'})[parts[0]]||parts[0],url:origin+'/'+parts[0]+'/'});
        crumbs.push({name:decode(html.match(/<h1[^>]*>([^<]+)<\/h1>/)?.[1]||title),url:canonical});
        extra.push({'@type':'BreadcrumbList',itemListElement:crumbs.map((crumb,i)=>({'@type':'ListItem',position:i+1,name:crumb.name,item:crumb.url}))});
        if(!html.includes('class="task-breadcrumbs"'))html=html.replace(/<main\b[^>]*>/,m=>m+'<nav class="task-breadcrumbs" aria-label="Breadcrumb">'+crumbs.map((crumb,i)=>i===crumbs.length-1?'<span aria-current="page">'+e(crumb.name)+'</span>':'<a href="'+e(crumb.url)+'">'+e(crumb.name)+'</a>').join(' <span aria-hidden="true">/</span> ')+'</nav>');
      }
      html=html.replace(/<meta\b[^>]*(?:property="og:[^"]+"|name="twitter:[^"]+")[^>]*>/g,'');
      const social=[['property','og:type',posts.some(p=>p.url===canonical)?'article':'website'],['property','og:title',title],['property','og:description',description],['property','og:url',canonical],['property','og:site_name',site.name],['property','og:image',image],['property','og:image:alt',site.name+' PDF tool catalog with on-device processing'],['property','og:image:width',width],['property','og:image:height',height],['name','twitter:card','summary_large_image'],['name','twitter:title',title],['name','twitter:description',description],['name','twitter:image',image],['name','twitter:image:alt',site.name+' PDF tool catalog']].map(([attribute,key,value])=>`<meta ${attribute}="${key}" content="${e(value)}">`).join('');
      html=html.replace('</head>',social+'<link rel="icon" type="image/svg+xml" href="/assets/icons/file-pdf.svg"><link rel="alternate" type="application/rss+xml" title="'+e(site.name)+' articles" href="'+origin+'/feed.xml">'+(extra.length?'<script type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org','@graph':extra}).replaceAll('<','\\u003c')+'</script>':'')+'</head>');
      const aboutLink='<p class="about-link"><a href="/about/">About '+e(site.name)+' and common questions</a></p>';
      html=html.includes('</footer>')?html.replace('</footer>',aboutLink+'</footer>'):html.replace('</body>','<footer>'+aboutLink+'</footer></body>');
      await fs.writeFile(file,html);
    }
  }
  await walk('dist');
  const rss='<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>'+e(site.name)+' articles</title><link>'+origin+'/blog/</link><description>PDF task comparisons, document privacy and supported workflows.</description><language>en</language>'+posts.map(post=>'<item><title>'+e(post.headline)+'</title><link>'+e(post.url)+'</link><guid isPermaLink="true">'+e(post.url)+'</guid><description>'+e(post.description)+'</description><pubDate>'+new Date(post.datePublished+'T00:00:00Z').toUTCString()+'</pubDate></item>').join('')+'</channel></rss>';
  await fs.writeFile('dist/feed.xml',rss);
  await fs.appendFile('dist/llms.txt',`\n## Identity, source and common answers\n\n- [About ${site.name}](${origin}/about/): Maintainer, former names, document processing, free hosted use, source licensing and limitations.\n- [Articles feed](${origin}/feed.xml): Published comparison and privacy articles with their actual publication dates.\n`);
}
