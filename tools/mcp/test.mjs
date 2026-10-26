import {test,before,after} from 'node:test';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import os from 'node:os';
import {Client} from '@modelcontextprotocol/client';
import {StdioClientTransport} from '@modelcontextprotocol/client/stdio';

const client=new Client({name:'pdfgirlfriend-protocol-test',version:'1.0.0'});
before(async()=>{
 const transport=new StdioClientTransport({command:process.execPath,args:[fileURLToPath(new URL('./server.mjs',import.meta.url))],cwd:os.tmpdir(),stderr:'pipe'});
 await client.connect(transport);
});
after(async()=>{await client.close();});
const call=async(name,args)=>client.callTool({name,arguments:args});

test('tools, resources and prompt are available over real stdio',async()=>{
 const {tools}=await client.listTools();
 assert.equal(tools.length,3);
 for(const t of tools){assert.equal(t.annotations.readOnlyHint,true);assert.equal(t.annotations.destructiveHint,false);}
 const {resources}=await client.listResources();assert.equal(resources.length,2);
 const {prompts}=await client.listPrompts();assert.equal(prompts.length,1);
 const prompt=await client.getPrompt({name:'choose_pdf_workflow',arguments:{}});
 assert.match(prompt.messages[0].content.text,/never document contents/);
});
test('catalog pagination covers all registered tools with public URLs',async()=>{
 const ids=[];let offset=0;
 do {
  const r=await call('pdfgirlfriend_list_tools',{offset,limit:20});assert.ok(!r.isError);
  for(const t of r.structuredContent.tools){assert.ok(t.url.startsWith('https://pdfgirlfriend.dpdns.org/'));assert.ok(t.limitations);ids.push(t.id);}
  offset=r.structuredContent.nextOffset;
 }while(offset!==null);
 assert.equal(ids.length,88);assert.equal(new Set(ids).size,88);
});
test('search finds common conversion aliases and filters unavailable tools',async()=>{
 const r=await call('pdfgirlfriend_list_tools',{query:'PDF to PNG'});
 assert.ok(r.structuredContent.tools.some(t=>t.id==='allpng'));
 const aliases=await call('pdfgirlfriend_list_tools',{query:'ebook to PDF'});
 assert.ok(aliases.structuredContent.tools.some(t=>t.id==='opendoc'&&t.status==='experimental'));
 const unavailable=await call('pdfgirlfriend_list_tools',{status:'unavailable'});
 assert.deepEqual(unavailable.structuredContent.tools.map(t=>t.id),['sanitize']);
});
test('lookup preserves OCR and Office fidelity boundaries',async()=>{
 for(const [id,pattern] of [['docx',/not editable|without layout/i],['searchableocr',/English/],['redact',/experimental/i]]){
  const r=await call('pdfgirlfriend_get_tool',{id});assert.match(r.structuredContent.tool.description+' '+r.structuredContent.tool.limitations,pattern);
 }
 assert.equal((await call('pdfgirlfriend_get_tool',{id:'doesnotexist'})).isError,true);
});
test('plans are advisory and reject unavailable or unknown steps',async()=>{
 const r=await call('pdfgirlfriend_plan_workflow',{toolIds:['merge','lossless']});
 assert.equal(r.structuredContent.executesDocuments,false);assert.equal(r.structuredContent.steps.length,2);
 assert.equal((await call('pdfgirlfriend_plan_workflow',{toolIds:['sanitize']})).isError,true);
 assert.equal((await call('pdfgirlfriend_plan_workflow',{toolIds:['doesnotexist']})).isError,true);
});
test('document arguments are rejected and resources disclose local processing',async()=>{
 assert.equal((await call('pdfgirlfriend_get_tool',{id:'merge',documentText:'synthetic forbidden argument'})).isError,true);
 assert.equal((await call('pdfgirlfriend_list_tools',{query:'merge',filePath:'synthetic.pdf'})).isError,true);
 assert.equal((await call('pdfgirlfriend_list_tools',{limit:21})).isError,true);
 assert.equal((await call('pdfgirlfriend_plan_workflow',{toolIds:Array(7).fill('merge')})).isError,true);
 const r=await client.readResource({uri:'pdfgirlfriend://policy'});
 const policy=JSON.parse(r.contents[0].text);
 assert.equal(policy.documentInputsAccepted,false);assert.equal(policy.remoteProcessingEndpoint,null);
});
