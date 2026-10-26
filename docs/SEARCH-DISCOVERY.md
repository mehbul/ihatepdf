## Current migration — 25 October 2026

The owner selected PDFGirlfriend as the public brand and supplied the DigitalPlat domain https://pdfgirlfriend.dpdns.org/. The repository is now mehbul/pdfgirlfriend. Public canonicals, sitemap URLs, guide links, ownership files and IndexNow scope use the custom-domain root. Previous iHatePDF/FolioCove names and URLs below are historical evidence, not the current destination. Keep legacy ranking queries comparable and record pdfgirlfriend separately. Publishing or changing a name is not indexing or ranking success. Preserve private Sites access. Do not repeatedly submit older sitemap requests.

# Organic discovery

## Google, Bing and IndexNow setup — 24 October 2026

The current production URL remains `https://mehbul.github.io/ihatepdf/`. Keep this brand and URL stable. The signed-in Google URL Inspection report still identified the homepage as unknown to Google on this date. Its live test succeeded (page available to Google and indexable), while the sitemap report continued to show could not fetch, zero discovered pages and last read 23 October. Open Sitemap led to the correct public URL; host-root robots and the 40-URL XML sitemap both fetched successfully. This does not establish the cause of Google's earlier failed read. A bounded homepage indexing request failed because Search Console could not connect to reCAPTCHA; no accepted request is claimed. Complete that request manually if Google presents a challenge. Do not use the restricted Google Indexing API for ordinary PDF tool pages or repeatedly resubmit the same sitemap.

Bing Webmaster Tools setup uses the owner's existing Google sign-in with basic profile/email information, followed by manual HTML-tag ownership verification for this application. No Google Search Console account import or broader OAuth access is needed. `src/content/search-discovery.mjs` holds the public ownership settings. The public Pages builder places Bing's `msvalidate.01` tag on the homepage and the IndexNow ownership file under this application's path; the private Sites build retains its existing audience and does not publish these proofs.

The deployment workflow runs `scripts/submit-indexnow.mjs --submit` only after a successful Pages deployment. It verifies the live key, reads the public sitemap, checks indexability and fingerprints public HTML. GitHub Actions caches those fingerprints. Only new/changed pages or confirmed 404/410 removals are notified through the global IndexNow endpoint. The ownership file and URL validation scope submissions to `/ihatepdf/`. Unchanged pages are not resubmitted, and failed notifications do not overwrite accepted fingerprints. A failed notification is reported without rolling back the site. First-run cache absence causes a bounded initial submission of the public sitemap's URLs. HTTP 200 means received; HTTP 202 means received with ownership validation pending. Neither confirms indexing or ranking.

IndexNow notifications are shared with participating engines. Google has its separate Search Console process. DuckDuckGo says it largely sources traditional links from Bing alongside other sources; Bing discovery can therefore help, but is not a separate guaranteed DuckDuckGo submission. The host-root wildcard crawl permission also allows public search crawlers; no private-file upload, training pipeline, analytics or paid advertising is introduced.

The new `/guides/images-to-pdf-with-filters/` guide explains actual supported workflows, image ordering, adjustments, crop bounds, standard paper, quality and limits. It is generated into the guide directory, homepage links, sitemap and reading index. It targets a specific user task rather than duplicating the general PDF homepage. No invented statistics, testimonials or ranking claims are included.

Monitor actual indexed pages, query impressions and clicks in the correct Google/Bing properties. Public mentions and relevant links must come from real users and legitimate editorial decisions. Do not buy links, fabricate traffic, submit to the withdrawn awesome-pdf association or send unsolicited outreach. The guide, public source and existing synthetic demonstrations are shareable evidence for owner-authorized promotion.

Official references: [IndexNow documentation](https://www.indexnow.org/documentation), [Google recrawl requests](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl), [DuckDuckGo sources](https://duckduckgo.com/duckduckgo-help-pages/results/sources), [OpenAI crawlers](https://developers.openai.com/api/docs/bots).

Commands: `npm test` covers submission scope, duplicate handling, unchanged-page suppression, dry runs and failed-notification state recovery without contacting search engines. `node scripts/submit-indexnow.mjs --dry-run` validates live public pages without submitting. `--submit` is an explicit network notification. Do not describe a successful build as completed Bing verification: finish Verify and submit the sitemap in Bing after the ownership tag is live.

### Completed provider checks on 24 October

- Bing HTML verification completed after release `452249e`; the application dashboard became available. One submission of `https://mehbul.github.io/ihatepdf/sitemap.xml` appeared in Bing's sitemap table as Submitted / Processing, with zero URLs discovered at that time. Bing said initial reports can take up to 48 hours. This is ownership and submission evidence, not indexing evidence.
- The post-deployment notification job checked 41 public sitemap pages and received IndexNow HTTP 202 for 41 URLs. Ownership validation was pending. The accepted fingerprints were cached for later deployments.
- All 53 Pages browser checks and the independent CI workflow passed. The new guide, guide link in llms.txt, sitemap entry, Bing tag and ownership file were verified on the public host.
- A refreshed Google session retried the failed homepage request once. Google again reported a reCAPTCHA service connection error; neither attempt was accepted. Search Console was left open for an owner-operated retry. Do not resubmit automatically or claim this request reached Google's indexing queue.
- The host-root robots file allows public crawlers and points to the current sitemap. No additional search-account credentials, private-file collection, paid service, fabricated traffic or external outreach was introduced.

## Current evidence and next decision

The bounded Google audit on 10 October 2026 (00:01–00:09 IST) checked 22 queries in a signed-out browser with English, India and personalization-disabled parameters. Only “foliocove pdf” showed an ordinary organic FolioCove result, at position two. The other 21 did not show FolioCove on the inspected first page. Bare “foliocove” was automatically corrected to “folio cover,” and “foliocovepdf” to “folio ilovepdf.” A suggested correction on the spaced brand query was recorded separately. Results varied between the initial and confirmation reads; this is session evidence, not a universal ranking or deindexing claim. A CAPTCHA returned during an extra check after the audit was complete; it was not bypassed.

The following implementation responds to concrete task coverage gaps, not a newly discovered crawl block. A live audit found all 27 previously listed sitemap pages returning 200 with correct self-canonicals and indexable metadata. Five existing handlers now have dedicated routes: `/pdf-to-word/` (native, text-oriented DOCX), `/jpg-to-pdf/` (JPG/PNG images), `/pdf-to-jpg/` (page images in a ZIP), `/word-to-pdf/` (DOCX text), and `/lossless-compress-pdf/` (structural optimization). The shared route registry supplies build output, capability/directory URLs, static homepage links and the Pages sitemap. Existing ten Everyday tools and query links remain supported. The expanded Pages sitemap has 33 distinct URLs, including the new Smallpdf comparison; the local generated-link check found no broken local links.

Each new task page has distinct instructions, output names, related workflows and fidelity boundaries. Conversion and compression samples reuse synthetic PDFs with visible labels. The Smallpdf comparison cites official pricing, privacy, Trust Center and Windows app pages checked on 10 October; prior articles retain their own source-check dates. There is no unsupported offline-product claim or blanket claim about a competitor's retention period.

Validation for this change: the 18-check Pages browser suite passed, including no-JavaScript metadata and directory links, direct load/reload for all five new routes, genuine DOCX contents, DOCX-to-PDF text, two JPG files with valid headers, image ordering/page dimensions and retained selectable text after lossless compression. Those tested conversion workflows made no external requests. The root build, 77 generated-handler executions and 88-entry AI-readiness checks also passed before publishing. This is not physical-device validation or evidence of improved ranking. Google's [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) explains that search effects can take time and are not guaranteed; retain the measured baseline until a fresh bounded search check verifies a change. Do not repeatedly resubmit the already accepted indexing requests or create artificial search/click traffic.

On 9 October 2026, Search Console still reported the homepage indexed. The 28-day Web performance view showed two impressions, zero clicks, and only the homepage in the page table; the chart covered 30 September–6 October and the report was last updated about 16 hours earlier. No query rows were available. Its average position of two comes from that tiny sample and does not establish placement for generic PDF searches.

The same day's manual, non-personalized Google check in India found FolioCove second among regular web results for “foliocove pdf,” below an unrelated Folio PDF app. FolioCove was absent from page one for “pdf,” “free pdf tools” and “merge pdf online.” Bare “foliocove” was corrected to “folio cover.” These are observations from one session, not a universal or stable ranking.

The immediate response strengthens existing merge and extraction pages rather than adding duplicate keyword pages: practical answers, directly downloadable synthetic samples, related workflow links, and tested range examples. All ten tool pages now identify their WebApplication as FolioCove PDF tools plus the task name. GitHub's public repository description uses the same brand and on-device positioning. The awesome-pdf submission remains open with no reviews as of this check; it is not an accepted directory listing.

After release 81a87b0 deployed successfully and both changed pages passed live verification, URL Inspection reported the merge and extraction routes unknown to Google's index. On 9 October, Google accepted an indexing request for each into its priority crawl queue. That confirms submission, not subsequent crawling, index membership or ranking. Do not repeat these requests just to change queue priority.

For the next content decision, use Search Console's Web query and page tables over a consistent period. When non-brand queries appear, choose a relevant existing task page and improve the answer to the actual question. Compare impressions, clicks and landing pages after recrawling; do not interpret two impressions as evidence of broad demand or a ranking gain. On 9 October, the owner requested ongoing checks and a local-thread heartbeat named “FolioCove Google discovery” was activated every six hours. It records regional search evidence and reports meaningful changes; it does not generate traffic or install analytics in the website.

## PDF product identity

The owner suggested adding PDF to the brand after Google corrected bare “foliocove” to “folio cover.” The display name is now **FolioCove PDF**, with **FolioCovePDF** and the established **FolioCove** as alternate names. Shared identity drives page headers, concise titles, Open Graph site names, WebSite metadata, capabilities and the AI reading index. The operator remains FolioCove, India. Public URLs, tool IDs, preference keys and document output names remain stable.

Google's [site-name guidance](https://developers.google.com/search/docs/appearance/site-names) does not support an independent site-name label for subdirectories such as `/ihatepdf/`. This metadata describes the product; it is not a promise to replace the host label in Google results. [Title-link guidance](https://developers.google.com/search/docs/appearance/title-link) recommends concise, descriptive titles and explains that Google must recrawl changed sources. The product name and task copy can clarify relevance, but do not establish ranking for “free pdf tools” or “merge pdf online.” Continue improving existing pages based on actual Search Console queries, useful output examples and legitimate independent references.

Keep new public claims grounded in independently inspectable output examples and clearly visible tool limits. Additional directory submissions should fit their contribution rules and disclose self-submission; avoid repetitive follow-ups, paid ranking links and invented independent endorsements. See [the scoped audit](audits/2026-10-09-task-discovery-loading.md).

## PDF task discovery

The Pages build now aligns the homepage title, description, Open Graph fields and WebApplication metadata around free PDF tools for merging, splitting and compression. The visible introduction describes those tasks, local processing and account requirements. All ten core routes have task-specific H1 headings and introductions from the shared registry. A visible task navigation section is available in the initial HTML without JavaScript, while the interactive catalog stays intact. Google can also crawl JavaScript-generated links; this change improves initial availability rather than removing a confirmed indexing block.

Focused verification covers the initial-HTML links with JavaScript disabled, metadata consistency, navigation to the extraction tool and accurate public beta status on How it works. Existing Pages checks exercise initialized title stability, PDF downloads, local workers, guides and mobile blog layout. These changes do not establish ranking for generic PDF searches. Use Search Console impressions, queries and landing pages to decide subsequent content improvements; no remote document analytics or keyword-volume claims are introduced.

FolioCove's public homepage is indexed according to the owner's Google Search Console inspection on 3 October 2026. Index membership does not guarantee appearance for a particular query or ranking.

The public Pages build now adds distinct titles, descriptions, practical instructions, output expectations and privacy answers to the ten core tool routes. Visible descriptions and WebApplication metadata stay consistent. Content comes from src/content/discovery.mjs, the shared tool registry and current notices; the private Sites build is preserved.

Three task guides cover merging without uploads, selecting PDF page ranges and choosing lossless versus raster compression. They link to functioning workspaces and related guides, and are linked from the homepage, core routes, README, sitemap and AI reading index. No keyword volumes, testimonials, ratings or ranking promises are invented.

Use the existing Google Search Console Performance report to observe impressions, clicks, queries and landing pages when data becomes available. This is Google's search reporting; no remote analytics script was added to FolioCove. Improve pages based on observed queries and real task feedback rather than producing duplicate keyword pages. Search Console currently reports no manual actions. The sitemap processing warning remains distinct from the confirmed homepage indexing result.

Validation: npm run build, npm test (77 generated handler cases), node scripts/test-ai-readiness.mjs and the two focused Pages browser tests passed. The guide test covers navigation back to the merge workspace, metadata, sitemap inclusion and mobile reading overflow. These checks do not establish physical camera capture, native phone downloads, full output fidelity or ranking.

## Comparison and privacy blog

src/content/blog.mjs now generates a blog hub and three distinct articles: an iLovePDF alternative comparison, a PDF-tool privacy checklist and an open-source PDF selection guide. The comparison identifies FolioCove as its publisher, distinguishes iLovePDF online from Desktop, cites official privacy/pricing/Desktop pages checked on 3 October 2026, and includes FolioCove's unavailable capabilities. Do not refresh the checked date without rechecking the sources. No competitor security incident, certification claim or unverified performance comparison is implied.

Article titles/descriptions, canonical URLs, Open Graph fields, BlogPosting metadata, visible publisher/date, homepage links, README links, sitemap entries and AI reading links are generated together. Search intent is the task or decision in each article; there is no invented search-volume evidence. Three focused Pages checks now pass, including the comparison's source link, schema/heading consistency and mobile overflow. Root build, handler and AI-readiness checks also pass.


## Repository URL migration — 22 October 2026

The repository is now `mehbul/ihatepdf`; the current public URL and sitemap are https://mehbul.github.io/ihatepdf/ and https://mehbul.github.io/ihatepdf/sitemap.xml. Historic audit evidence and accepted indexing requests refer to the former `/FolioCove/` URL. GitHub repository redirects do not guarantee GitHub Pages redirects. Treat old and new URLs separately in ranking evidence. The old Search Console URL-prefix property does not cover the new path. The new property was verified by HTML tag on 22 October and its sitemap submission was accepted once, but the initial report still said "Couldn't fetch". Do not repeatedly resubmit it. Publication and successful live HTTP fetches do not establish Google indexing or ranking.


### Legacy URL recovery

A separate public redirect-only root site, [mehbul/mehbul.github.io](https://github.com/mehbul/mehbul.github.io), preserves the 40 known `/FolioCove/` routes from the current sitemap. Each page has a fixed matching `/ihatepdf/` destination, canonical link, `noindex,follow`, and a visible fallback link. JavaScript navigation preserves the query string and fragment; it is not an HTTP 301. Unknown paths keep a real 404. Root `robots.txt` permits crawling and advertises the current application sitemap. This is a hosting improvement, not proof that Google has fetched or indexed the sitemap. Do not create a new `mehbul/FolioCove` repository: leaving that source name unused preserves GitHub's repository redirect. Keep the root redirect list aligned when moving any additional historically published route.

The owner withdrew association with awesome-pdf on 22 October. Name/URL update PR #110 was closed. Removal PR #111 requests deletion of the historical entry; upstream action is pending. Do not use the directory as a promotional association or submit further listing updates.


### Provider completion — 26 October 2026

HTTPS is working with enforcement enabled; HTTP and www redirect to the canonical https://pdfgirlfriend.dpdns.org/. Google URL-prefix ownership was verified with the new HTML tag. The new-domain sitemap was submitted once on 26 October and immediately showed **Success**, with **41 discovered URLs**. Do not resubmit it. This is sitemap discovery, not confirmation that those URLs are indexed or ranked. The post-deployment IndexNow notification received HTTP 202 for 41 URLs; ownership validation was pending.

Release 2d7c54a passed all 53 Pages browser tests and completed Pages workflow 40221692237 and CI 40221692281. Live HTTPS merge and extraction each produced three-page PDFs, with no observed external request origins or page JavaScript errors in that scoped check. The restored redirect-only root repository must be retained for old /FolioCove/ and /ihatepdf/ links. No physical-device, AdSense or ranking milestone is implied.


### Search readiness completion — 26 October 2026

Release 13b404c completed Pages workflow 40224485082 and CI 40224485123. All 56 Pages browser checks passed; live fetches validated all 42 current sitemap pages, their self-canonicals, unique titles, page-specific Open Graph/Twitter metadata, structured identity, 1200×630 preview, RSS feed and corrected capability facts. The About page is readable at phone width.

Bing manually verified the current domain and accepted one sitemap submission. Its table showed **Success**, **42 discovered URLs**, zero errors and zero warnings. Do not resubmit this accepted sitemap. Google's current homepage report was **Discovered — currently not indexed**, with no recorded crawl. One new-host homepage indexing request was attempted but Google rejected it with a daily-quota message and a reCAPTCHA service connection error; no accepted indexing request is claimed and no challenge was bypassed. Do not retry in a loop. The prior successful Google sitemap submission remains accepted. Provider discovery is not index membership, rankings or AI citation evidence.

The root redirect repository added zero-second HTML refresh fallbacks for 80 known legacy routes, release 5ddafcb, completed root Pages workflow 40224604802. Eight Chromium/WebKit checks covered normal JavaScript query/hash preservation and fixed-path navigation without JavaScript. The live redirect HTML was checked for both legacy prefixes. These remain client-side redirects, not HTTP 301 responses.

### Homepage index membership verified — 26 October 2026

A new read-only Google URL Inspection returned **URL is on Google / Page is indexed** for https://pdfgirlfriend.dpdns.org/. This supersedes the earlier same-day unindexed-homepage observation. The /merge-pdf/ page remains **Discovered — currently not indexed**, with the current sitemap and /try/ referring page detected and last crawl N/A. Bing URL Inspection also confirmed homepage indexing today. None of these observations establishes task-page indexing, non-brand rankings or AI citations. No accepted submission was repeated. Sanitized evidence is local at .sites-runtime/proof/search-indexing-2026-10-26.json.

### Supported task-page improvement — 26 October 2026

The target-size compression page now describes its actual 200 KB, 500 KB, 1 MB, 2 MB and 5 MB presets, automatic quality/resolution selection, smallest-tried fallback when the target is missed, rasterization losses and the lossless alternative. Removed an inaccurate reference to manual quality options. This is a task-answer correction, not a ranking claim or a new keyword page. Root build, handler/image/discovery checks and all 88 AI-readable registry checks passed; focused Pages results and final live deployment evidence are recorded separately.
