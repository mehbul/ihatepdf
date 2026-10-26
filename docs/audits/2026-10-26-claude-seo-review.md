# Claude SEO review — PDFGirlfriend

Date: 26 October 2026. Target: https://pdfgirlfriend.dpdns.org/.

## Installation and method

Installed the MIT-licensed core/reference skill and technical, GEO, schema, sitemap and single-page skills from AgriciDaniel/claude-seo, pinned to commit 6be93f45064ffbadced572b5d5c95f55fd263af0. These are Codex-local skill files, not a Claude Code plugin/runtime installation. No paid extensions, account integrations or new app dependencies were enabled. Their checklists were applied using the existing Playwright HTTP/browser tooling. The optional Claude-specific helper runtime was not invoked.

## Measured findings

- All 42 sitemap URLs returned HTTP 200 without redirecting, with no detected HTML/header noindex directive.
- All 42 contain exactly one H1, a main element and parseable JSON-LD with a context. This is a syntax/identity check, not Google Rich Results Test certification.
- Existing live readiness checks passed for all 42 self-canonicals, unique titles, page-specific sharing metadata and structured identity. The preview image, four-entry article feed and capability/license text also passed.
- The largest HTML response was 32,999 bytes. Public page content and structured data are present in the initial HTML, rather than requiring the PDF workspace JavaScript to render.
- Root robots.txt returned HTTP 200, allows wildcard crawlers and advertises the working current-domain sitemap. OAI-SearchBot, Googlebot, PerplexityBot and Claude-SearchBot are not separately blocked. Training crawlers also fall under the wildcard; no policy change was made.
- Sitemap has 42 unique HTTPS URLs and omits lastmod rather than inventing fresh modification dates. No extra sitemap submission was made.
- The About page passed the existing 390px viewport check without horizontal overflow. This does not verify physical phones or native downloads.

Sanitized local evidence: .sites-runtime/proof/claude-seo-live-audit.json and .sites-runtime/proof/search-readiness-live.json. No customer files were used.

## Priorities and limits

No new crawl/access/metadata defect was demonstrated by this bounded pass, so no speculative page rewrites or extra keyword pages were shipped. Preserve the current task instructions, truthful conversion limits and working sample files.

The earlier same-day Search Console observation remains Discovered — currently not indexed; it was not rechecked during this pass. Bing earlier accepted the 42-URL sitemap. Provider acceptance is not indexing or ranking. Do not repeat the quota-rejected Google request in a loop.

Actual index membership, query rankings, AI mentions/citations, backlinks, field Core Web Vitals, complete internal-link graph and external-link validity were not measured in this pass. No fabricated overall SEO/GEO score is assigned. Continue with first-party Search Console evidence once available, then choose changes from observed queries and user task failures. No Wikipedia submissions, unsolicited directory outreach, paid links or artificial search traffic were performed.
