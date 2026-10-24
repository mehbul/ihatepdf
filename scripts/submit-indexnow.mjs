import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {searchDiscovery as config} from '../src/content/search-discovery.mjs';

export function publicUrl(input) {
  const url=new URL(input),base=new URL(config.origin+'/');
  if(url.origin!==base.origin||!url.pathname.startsWith(base.pathname)||url.search||url.hash||url.username||url.password)throw Error('Only public iHatePDF canonical URLs may be submitted.');
  return url.href;
}
export function sitemapUrls(xml) {
  const urls=[...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(m=>publicUrl(m[1].trim().replaceAll('&amp;','&')));
  const unique=[...new Set(urls)];
  if(!unique.length||unique.length>10000)throw Error('Sitemap must contain 1–10,000 public URLs.');
  return unique;
}
export function changedUrls(previous,current) {
  return Object.keys(current).filter(url=>previous[url]!==current[url]);
}
export function payload(urls) {
  if(!urls.length||urls.length>10000)throw Error('Choose 1–10,000 URLs.');
  return {host:new URL(config.origin).host,key:config.indexNowKey,keyLocation:`${config.origin}/${config.indexNowKey}.txt`,urlList:[...new Set(urls.map(publicUrl))]};
}
async function get(url) {
  const response=await fetch(url,{redirect:'error',signal:AbortSignal.timeout(30000)});
  if(!response.ok)throw Error(`Public URL returned HTTP ${response.status}: ${url}`);
  return response.text();
}
export async function main(args=process.argv.slice(2)) {
  if(args.some(x=>!['--submit','--dry-run'].includes(x)))throw Error('Usage: node scripts/submit-indexnow.mjs [--dry-run | --submit]');
  const submit=args.includes('--submit'),stateFile=path.resolve('.cache/search/indexnow.json');
  const keyUrl=`${config.origin}/${config.indexNowKey}.txt`;
  if((await get(keyUrl)).trim()!==config.indexNowKey)throw Error('Published IndexNow key does not match. Nothing submitted.');
  const urls=sitemapUrls(await get(`${config.origin}/sitemap.xml`));
  let previous={};
  try {const state=JSON.parse(await fs.readFile(stateFile,'utf8'));if(state.origin!==config.origin||state.version!==1)throw Error('IndexNow state belongs to another site/version.');previous=state.hashes;}
  catch(error){if(error.code!=='ENOENT')throw error;}
  const current={};
  // Hash only public pages. Files chosen in the PDF workspace are never read here.
  for(let i=0;i<urls.length;i+=4)await Promise.all(urls.slice(i,i+4).map(async url=>{
    const html=await get(url);
    if(/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html))throw Error(`Page is marked noindex: ${url}`);
    current[url]=createHash('sha256').update(html).digest('hex');
  }));
  const changed=changedUrls(previous,current);
  // Removed sitemap URLs are notified only after the public server confirms removal.
  for(const url of Object.keys(previous).filter(url=>!(url in current))){
    publicUrl(url);
    const response=await fetch(url,{redirect:'error',signal:AbortSignal.timeout(30000)});
    if([404,410].includes(response.status))changed.push(url);
    else if(!response.ok)throw Error(`Unable to verify removed URL: HTTP ${response.status}`);
  }
  console.log(`${urls.length} public sitemap pages checked; ${changed.length} new, changed or removed URLs. ${submit?'Submission enabled.':'Dry run: no notification sent.'}`);
  if(!submit)return {urls:urls.length,changed:changed.length,submitted:false};
  if(changed.length){
    const response=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify(payload(changed)),signal:AbortSignal.timeout(30000)});
    if(![200,202].includes(response.status))throw Error(`IndexNow returned HTTP ${response.status}. Submission state was not saved.`);
    console.log(`IndexNow HTTP ${response.status}: ${response.status===202?'received; ownership validation pending':'notification received'}. This does not confirm crawling, indexing or ranking.`);
  }
  await fs.mkdir(path.dirname(stateFile),{recursive:true});
  await fs.writeFile(stateFile,JSON.stringify({version:1,origin:config.origin,hashes:current},null,2)+'\n');
  return {urls:urls.length,changed:changed.length,submitted:changed.length>0};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main().catch(error=>{console.error(error.message);process.exitCode=1;});
