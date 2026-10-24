import assert from 'node:assert/strict';
import {publicUrl,sitemapUrls,changedUrls,payload,main} from './submit-indexnow.mjs';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {searchDiscovery as config} from '../src/content/search-discovery.mjs';
const home=config.origin+'/',tool=config.origin+'/jpg-to-pdf/';
assert.equal(publicUrl(home),home);
for(const url of ['https://example.com/','https://mehbul.github.io/','https://mehbul.github.io/ihatepdf-else/','https://mehbul.github.io/ihatepdf/../private/','https://mehbul.github.io/ihatepdf/?document=private','http://mehbul.github.io/ihatepdf/'])assert.throws(()=>publicUrl(url));
assert.deepEqual(sitemapUrls(`<urlset><url><loc>${home}</loc></url><url><loc>${home}</loc></url><url><loc>${tool}</loc></url></urlset>`),[home,tool]);
assert.throws(()=>sitemapUrls('<urlset/>'));
assert.deepEqual(changedUrls({[home]:'same',[tool]:'old'},{[home]:'same',[tool]:'new'}),[tool]);
assert.deepEqual(changedUrls({[home]:'same'},{[home]:'same'}),[]);
assert.deepEqual(payload([home,home]).urlList,[home]);
assert.equal(payload([home]).keyLocation,`${config.origin}/${config.indexNowKey}.txt`);
assert.match(config.bingVerification,/^[A-F0-9]{32}$/);assert.match(config.indexNowKey,/^[a-f0-9]{32}$/);
assert.throws(()=>payload([]));
const directory=await fs.mkdtemp(path.join(os.tmpdir(),'ihatepdf-indexnow-test-'));
const originalCwd=process.cwd(),originalFetch=globalThis.fetch;
let posts=0,status=202,html='<html><head><meta name="robots" content="index,follow"></head><body>Public tool</body></html>';
try {
  process.chdir(directory);
  globalThis.fetch=async(url,options={})=>{
    if(url==='https://api.indexnow.org/indexnow'){posts++;assert.deepEqual(JSON.parse(options.body).urlList,[home]);return new Response('',{status});}
    if(url.endsWith(config.indexNowKey+'.txt'))return new Response(config.indexNowKey);
    if(url.endsWith('/sitemap.xml'))return new Response(`<urlset><url><loc>${home}</loc></url></urlset>`);
    assert.equal(url,home);return new Response(html);
  };
  await main(['--dry-run']);assert.equal(posts,0);
  await assert.rejects(fs.readFile('.cache/search/indexnow.json'),{code:'ENOENT'});
  await main(['--submit']);assert.equal(posts,1);
  await main(['--submit']);assert.equal(posts,1,'Unchanged pages must not be submitted again.');
  const saved=await fs.readFile('.cache/search/indexnow.json','utf8');assert(!saved.includes('Public tool'));
  html=html.replace('Public tool','Updated public tool');status=403;
  await assert.rejects(main(['--submit']),/HTTP 403/);
  assert.equal(await fs.readFile('.cache/search/indexnow.json','utf8'),saved,'Failed notifications must not overwrite accepted fingerprints.');
} finally {globalThis.fetch=originalFetch;process.chdir(originalCwd);}
console.log('PASS: public-only IndexNow scope, sitemap parsing, duplicate handling, content-change detection and ownership settings.');
