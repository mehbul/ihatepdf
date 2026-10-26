import {McpServer} from '@modelcontextprotocol/server';
import {StdioServerTransport} from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';
import {publicCapabilities,integrationPolicy} from '../../src/content/integration.mjs';
import {searchTermsForTool} from '../../src/content/search-topics.mjs';

const catalog=publicCapabilities();
const statuses=['implemented','experimental','browser-dependent','unavailable'];
const toolSchema=z.object({id:z.string(),name:z.string(),description:z.string(),url:z.string(),status:z.enum(statuses),limitations:z.string(),inputMimeTypes:z.array(z.string()),multipleFiles:z.boolean(),processing:z.literal('on-device')});
const result=data=>({content:[{type:'text',text:JSON.stringify(data)}],structuredContent:data});
const failure=message=>({isError:true,content:[{type:'text',text:message}]});
const annotations={readOnlyHint:true,destructiveHint:false,idempotentHint:true,openWorldHint:false};
const idSchema=z.string().min(1).max(60).regex(/^[a-z0-9]+$/).describe('Stable tool ID from pdfgirlfriend_list_tools, such as merge or docx. Not a filename.');
const server=new McpServer({name:'pdfgirlfriend-mcp-server',version:'0.1.0'},{instructions:integrationPolicy.instructions.join('\n')});

server.registerTool('pdfgirlfriend_list_tools',{
  title:'Find PDFGirlfriend tools',description:'Search the bundled public tool registry by task words. Returns IDs, URLs, statuses and fidelity limits. Never supply private document contents.',
  inputSchema:z.object({query:z.string().max(120).optional().describe('Task words only, e.g. merge PDF; never document text.'),status:z.enum(statuses).optional(),offset:z.number().int().min(0).default(0),limit:z.number().int().min(1).max(20).default(10)}).strict(),
  outputSchema:z.object({tools:z.array(toolSchema),total:z.number(),nextOffset:z.number().nullable()}),annotations
},async({query='',status,offset,limit})=>{
  const words=query.toLowerCase().split(/\s+/).filter(Boolean);
  const matches=catalog.tools.filter(t=>(!status||t.status===status)&&words.every(w=>(t.id+' '+t.name+' '+t.description+' '+searchTermsForTool(t.id)).toLowerCase().includes(w)));
  return result({tools:matches.slice(offset,offset+limit),total:matches.length,nextOffset:offset+limit<matches.length?offset+limit:null});
});
server.registerTool('pdfgirlfriend_get_tool',{
  title:'Read one tool and its limits',description:'Get a known tool ID, input MIME types, fidelity limitations and public browser URL. No document processing occurs.',
  inputSchema:z.object({id:idSchema}).strict(),outputSchema:z.object({tool:toolSchema}),annotations
},async({id})=>{const tool=catalog.tools.find(t=>t.id===id);return tool?result({tool}):failure('Unknown tool ID. Use pdfgirlfriend_list_tools to find a valid ID.');});
server.registerTool('pdfgirlfriend_plan_workflow',{
  title:'Plan browser steps',description:'Describe up to six ordered tool steps with limits and review requirements. This is advisory: it does not validate format compatibility, open files, upload documents or execute tools.',
  inputSchema:z.object({toolIds:z.array(idSchema).min(1).max(6)}).strict(),
  outputSchema:z.object({steps:z.array(toolSchema),warnings:z.array(z.string()),executesDocuments:z.literal(false)}),annotations
},async({toolIds})=>{
  const steps=toolIds.map(id=>catalog.tools.find(t=>t.id===id));
  if(steps.some(t=>!t))return failure('Unknown tool ID. Discover valid IDs before planning.');
  if(steps.some(t=>t.status==='unavailable'))return failure('This plan includes an unavailable capability. Choose a supported alternative; verified sanitization cannot be performed.');
  return result({steps,warnings:[...integrationPolicy.instructions,'Check output/input formats between steps; this plan does not certify compatibility. Keep originals and inspect every output.',...steps.filter(t=>t.status!=='implemented').map(t=>t.name+': '+t.status)],executesDocuments:false});
});
for(const [name,uri,data] of [['policy','pdfgirlfriend://policy',integrationPolicy],['catalog','pdfgirlfriend://catalog',catalog]]){
  server.registerResource(name,uri,{title:'PDFGirlfriend '+name,mimeType:'application/json'},async url=>({contents:[{uri:url.href,mimeType:'application/json',text:JSON.stringify(data)}]}));
}
server.registerPrompt('choose_pdf_workflow',{title:'Choose a private PDF workflow',description:'Start a capability-first PDF workflow without sending private documents.',argsSchema:z.object({})},async()=>({messages:[{role:'user',content:{type:'text',text:'Help me choose PDFGirlfriend tools. Ask only for the task and input/output formats, never document contents. Read pdfgirlfriend://policy, discover tools and explain fidelity limits before suggesting a browser workflow. Do not claim to have processed a document.'}}]}));
await server.connect(new StdioServerTransport());
