import {capabilityData} from './ai.mjs';
import {toolRoutes} from './routes.mjs';
import {searchDiscovery} from './search-discovery.mjs';

export function publicCapabilities(){
  const data=capabilityData(toolRoutes),old=data.website;
  return {...data,releaseStatus:'public-beta',website:searchDiscovery.origin,tools:data.tools.map(t=>({...t,url:t.url.replace(old,searchDiscovery.origin)}))};
}
export const integrationPolicy={
  processing:'on-device',documentInputsAccepted:false,remoteProcessingEndpoint:null,
  purpose:'Read-only tool discovery, capability limits and browser workflow planning. Not document processing.',
  instructions:[
    'Never send document text, images, filenames, passwords or file paths to these tools.',
    'Read the selected tool limitations before recommending it. Implemented does not mean validated for every file.',
    'The user selects documents and reviews outputs in the browser. The MCP does not open pages or choose files.',
    'Browser AI is conditional; redaction is experimental; verified sanitization and validated PDF/A are unavailable.',
    'Do not promise editable Office layout reconstruction, legal signature verification, universal offline use or rankings.'
  ]
};
export function integrationManifest(){return {
  schemaVersion:1,name:'PDFGirlfriend AI integration',website:searchDiscovery.origin,
  capabilities:searchDiscovery.origin+'/capabilities.json',knowledge:searchDiscovery.origin+'/docs/capabilities.md',
  setup:searchDiscovery.origin+'/mcp/',source:'https://github.com/mehbul/pdfgirlfriend/tree/main/tools/mcp',
  mcp:{transport:'stdio',remoteEndpoint:null,tools:['pdfgirlfriend_list_tools','pdfgirlfriend_get_tool','pdfgirlfriend_plan_workflow'],resources:['pdfgirlfriend://policy','pdfgirlfriend://catalog']},
  ...integrationPolicy
};}
