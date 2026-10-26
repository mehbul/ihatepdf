# PDFGirlfriend MCP server

Local, read-only MCP discovery and workflow planning for PDFGirlfriend. Runs over stdio on Node.js 24. No document processing or hosted HTTP endpoint.

From the repository root:

```powershell
npm ci --prefix tools/mcp
npm test --prefix tools/mcp
npm run config --prefix tools/mcp --silent
```

The generated config contains absolute Node and server paths for clients accepting `mcpServers` settings. Other clients require their own equivalent local stdio configuration. See the [full setup and privacy guide](../../docs/MCP.md) or [public setup page](https://pdfgirlfriend.dpdns.org/mcp/).

Tools: `pdfgirlfriend_list_tools`, `pdfgirlfriend_get_tool`, `pdfgirlfriend_plan_workflow`. Resources: `pdfgirlfriend://policy`, `pdfgirlfriend://catalog`. Prompt: `choose_pdf_workflow`.

Pass task words only. Do not provide private documents, contents, filenames, file paths or passwords. Plans are advisory; users select files and execute tools in the browser. Search uses the checked-out catalog, including conditional, experimental and unavailable entries with explicit status. GitHub hosts the source; the user's MCP client starts the local process. No npm package or remote service publication is implied.

Project-owned source: [PolyForm Noncommercial 1.0.0](../../LICENSING.md). Dependencies retain their licenses.
