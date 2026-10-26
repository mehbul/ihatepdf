# PDFGirlfriend MCP server

PDFGirlfriend provides a local, read-only Model Context Protocol server for discovering browser tools, checking input formats and fidelity limits, and planning manual browser workflows. Source is hosted at [tools/mcp on GitHub](https://github.com/mehbul/pdfgirlfriend/tree/main/tools/mcp). It runs locally over **stdio**, launched by a compatible MCP client. There is no hosted HTTP MCP endpoint, account, API key or document-processing service.

## Install from GitHub

Use Node.js 24 and Git. Clone the complete repository: the server imports its public tool catalog from the app source, so downloading server.mjs alone is insufficient.

```powershell
git clone https://github.com/mehbul/pdfgirlfriend.git
cd pdfgirlfriend
npm ci --prefix tools/mcp
npm test --prefix tools/mcp
npm run config --prefix tools/mcp --silent
```

The last command prints an MCP client configuration containing the absolute paths to your Node executable and server. Merge its `pdfgirlfriend` entry into your client's existing MCP settings; do not overwrite other servers. Configuration syntax and reload steps vary by client. Clients that accept only a remote server URL cannot connect directly to this stdio server.

Example shape (replace both paths with your real installation paths, or use the generated configuration):

```json
{
  "mcpServers": {
    "pdfgirlfriend": {
      "command": "C:/path/to/node.exe",
      "args": ["C:/path/to/pdfgirlfriend/tools/mcp/server.mjs"]
    }
  }
}
```

For clients that use a different configuration format, select a local stdio server, the Node executable as the command, and the absolute server.mjs path as its only argument. No working-directory setting is needed. Paths containing spaces must remain one argument. Restart or reload the client and confirm these tools appear:

| MCP tool | Purpose |
| --- | --- |
| `pdfgirlfriend_list_tools` | Search task words, filter by status and page through results. `query`, `status`, `offset`, `limit` are supported; limits are 1–20 results per page. |
| `pdfgirlfriend_get_tool` | Read one stable tool ID, browser URL, supported input types and limitations. |
| `pdfgirlfriend_plan_workflow` | Return up to six ordered advisory steps. Does not execute tools or certify format compatibility; unavailable tools are rejected. |

Two JSON resources, `pdfgirlfriend://policy` and `pdfgirlfriend://catalog`, expose the privacy rules and bundled catalog. The `choose_pdf_workflow` prompt starts a capability-first conversation without document contents.

## Try a task

Ask your agent: “Find PDFGirlfriend tools for PDF to Word and explain the editable-text limits.” Or: “Find the PDF to PNG tool.” Or: “Plan merge followed by lossless compression, showing each browser link and its limitations.”

The agent reads public product facts; you open the returned URL, select documents yourself and review the output in the browser. The server does not read local document files, accept documents, open the browser, execute PDF operations or upload files. Task-search text is processed in the server's memory, but your MCP client or its model provider may receive your conversation and tool calls: provide only generic task words, never document text, filenames, file paths or passwords. There is no server-side request logging or network fetch in this implementation. Installation downloads npm dependencies; opening the browser app makes normal asset/model requests.

## Keep the catalog current

The server uses the checked-out registry, not a live network catalog. Update your checkout with Git after reviewing changes, run `npm ci --prefix tools/mcp` and rerun its tests. Stop or reload the client to use the updated server. To remove the integration, remove only its entry from your client's configuration and stop the server.

Current project-owned source uses PolyForm Noncommercial 1.0.0. See [LICENSING.md](https://github.com/mehbul/pdfgirlfriend/blob/main/LICENSING.md); commercial reuse or hosting requires separate permission. The official hosted application's permission for personal and business documents remains distinct.

## Validation scope

Automated SDK-client tests launch the real stdio server and exercise discovery, pagination across the 88-entry registry, aliases, fidelity limits, resources, prompts, invalid arguments and unavailable workflow steps. They do not establish compatibility with every MCP client or PDF output quality. The ten prompts in tools/mcp/evaluation.xml are an evaluation set for later agent testing, not a claim of completed cross-model evaluation.

References: [MCP transports](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports), [official TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk).
