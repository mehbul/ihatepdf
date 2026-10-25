# SEO, answer extraction and AI discovery

Scope: PDFGirlfriend at https://pdfgirlfriend.dpdns.org/, 26 October 2026. This records technical implementation and scoped checks, not rankings, AI citations, paid advertising or a permanent completion of SEO.

## Observed baseline

A bounded live fetch of all 41 initial sitemap pages found HTTP 200, unique titles, one H1 and correct self-canonicals throughout. Every page lacked an Open Graph image and Twitter card; 11 lacked og:url. The capability guide contained a rebrand error saying the current name was also its former name. Bing still showed the previous path-based site. Google had already verified the new hostname and read its sitemap successfully, with 41 discovered URLs; that is not index membership.

## Implemented

- One factual About/answers page covers identity, prior names, maintainer, document processing, hosted business use versus source licensing, conversion fidelity, offline/model constraints, current beta limits and support. It is linked from every public page and the AI reading index; the sitemap now has 42 pages. No duplicate task pages or invented statistics were added.
- All public pages get consistent page-specific sharing metadata, one actual 1200x630 product screenshot, a local favicon and article-feed links. Existing competitor source-check dates are preserved.
- Organization/WebSite identities reference the current HTTPS domain and owner repository. WebApplication facts identify free hosted use without fabricated ratings. Guide and information-page breadcrumb markup matches visible navigation. Structured data is descriptive, not a rich-result promise.
- Capability JSON and Markdown identify current source/licensing boundaries and real former names. Existing catalog, task instructions, sample PDFs and capability limits remain available without depending on the interactive UI.
- The article RSS feed contains actual published articles and their original dates. It does not invent a new publication date on each build.
- Public robots.txt already permits search crawlers, including AI search crawlers covered by the wildcard. No training-only bot access change is needed for this work. No document uploads, remote analytics, account imports, ads or private Sites publication were introduced.

## Provider state

Bing manual HTML-tag verification for pdfgirlfriend.dpdns.org completed and the new dashboard became available. Sitemap submission is a separate next step after release. The existing accepted Google sitemap must not be resubmitted just because content changed. Existing IndexNow notifications publish changed public URLs only and do not prove indexing.

## Verification

Root build, 77 handler checks, image-layout and search-submission checks, 88-entry AI-readability checks and 56 Pages browser checks passed. The new readiness check reads all public sitemap pages and validates canonical identity, metadata, schema, breadcrumb visibility, free-use facts, sharing asset delivery, article-feed entries and corrected knowledge text; it also checks mobile-width About-page reading. Final deployment and live metadata checks are recorded separately in local proof files.

## Provider-controlled and ongoing work

Indexing, non-brand rankings, AI answer selection/citations and visitor retention are not controllable completion gates. Continue using actual Search Console/Bing reports and real task feedback. Legacy routes use client-side redirects rather than HTTP 301. Do not create fake reviews, location pages, credentials, expert quotes, repetitive comparison articles, purchased links or artificial search/click traffic. Do not rejoin the withdrawn awesome-pdf association.

## Official guidance checked

- https://developers.google.com/search/docs/appearance/ai-features — ordinary search eligibility and useful textual content apply; no special AI file/schema guarantees inclusion.
- https://developers.openai.com/api/docs/bots — OAI-SearchBot is a search crawler; GPTBot training controls are independent. ChatGPT-User does not determine automatic search inclusion.
- https://developers.google.com/search/docs/crawling-indexing/301-redirects — redirect types and migration behavior.

No separate local-service PDF proposal, fake local business listing or new training permission is part of this online utility's SEO work.


### Search readiness completion — 26 October 2026

Release 13b404c completed Pages workflow 40224485082 and CI 40224485123. All 56 Pages browser checks passed; live fetches validated all 42 current sitemap pages, their self-canonicals, unique titles, page-specific Open Graph/Twitter metadata, structured identity, 1200×630 preview, RSS feed and corrected capability facts. The About page is readable at phone width.

Bing manually verified the current domain and accepted one sitemap submission. Its table showed **Success**, **42 discovered URLs**, zero errors and zero warnings. Do not resubmit this accepted sitemap. Google's current homepage report was **Discovered — currently not indexed**, with no recorded crawl. One new-host homepage indexing request was attempted but Google rejected it with a daily-quota message and a reCAPTCHA service connection error; no accepted indexing request is claimed and no challenge was bypassed. Do not retry in a loop. The prior successful Google sitemap submission remains accepted. Provider discovery is not index membership, rankings or AI citation evidence.

The root redirect repository added zero-second HTML refresh fallbacks for 80 known legacy routes, release 5ddafcb, completed root Pages workflow 40224604802. Eight Chromium/WebKit checks covered normal JavaScript query/hash preservation and fixed-path navigation without JavaScript. The live redirect HTML was checked for both legacy prefixes. These remain client-side redirects, not HTTP 301 responses.
