# Engineering review — 24 October 2026

Application: **iHatePDF**, repository `mehbul/ihatepdf`, public beta https://mehbul.github.io/ihatepdf/. The separate Chopify application is outside this review.

## Findings resolved

1. **Raster output changed physical page sizes.** Standard compression used a 1.15-scale rendering viewport as PDF points: a 420-point page became 483 points wide. Grayscale and scan enhancement had the same issue at 1.35 scale. Output pages now divide out the render scale and draw images to the physical page bounds. The existing dimension regression now covers all three tools alongside target compression, workflow grayscale and experimental redaction. Compression remains raster conversion and can remove selectable text, forms and accessibility information; no guaranteed reduction is claimed.
2. **Tool handoff retained stale page context.** Selecting another workspace within a dedicated route now updates the visible main heading, introduction, breadcrumb and browser title. Original-route instructions hide while another tool is active and return when the original tool is selected again. Files remain in the local handoff; static URLs and canonical metadata remain the original document's identity. Reloading still opens that route's tool and clears unsaved files.
3. **A browser test raced application startup.** The extended-tool selection helper now waits for the file picker to become enabled before changing the filter. Initial baseline: 86 passed, 20 skipped and one startup failure; mobile/WebKit baseline: 51 passed.
4. **Validation and security documentation contained obsolete claims.** `TEST_RESULTS.md` no longer describes Privacy Inspector as producing a sanitized copy or all builds as private. `SECURITY.md` uses the current brand and general support channel. GitHub's API confirmed private vulnerability reporting remains enabled. The operations record now reflects the withdrawn directory association.
5. **CI omitted a useful consistency check.** General CI now validates the 88-tool registry, capabilities, metadata and machine-readable documentation in addition to existing unit/browser tests. The Pages workflow already ran this check.
6. **The catalog audit assumed old discovery defaults and a fixed date.** It now waits for startup, selects all tools (including after recovery), and timestamps fresh evidence.

## Review coverage and evidence

| Area | Evidence and limits |
| --- | --- |
| Catalog walkthrough | All 88 tools exercised with one representative synthetic input: 75 structurally parseable downloads, 10 reports/previews, 3 expected limitations (sanitization unavailable, browser AI summary/translation unavailable). No failed tools, page errors or network-guard violations in this run. Includes successful synthetic searchable OCR. This is an automated walkthrough, not 88 unaided human usability trials. |
| Output correctness | Generated-handler checks and browser regressions inspect page counts, order, dimensions, extracted text, image/filter pixels, Office ZIP structures, invalid-input rejection and recoverable downloads. They do not prove arbitrary-document fidelity. |
| Security/privacy | Production dependency advisory audit: zero reported vulnerabilities. Source review covered untrusted filenames, DOM text insertion, local HTML resource/script filtering, Office external relationships and result object-URL lifecycle. Regression coverage includes CSV formula neutralization, fail-closed sanitization, read-only inspection, invalid redaction and network guards. No security certification or exhaustive parser/penetration audit is claimed. |
| Accessibility/responsiveness | Keyboard file ordering and handoff/focus, generated control labels, narrow viewport overflow, no-JavaScript public task content and selected mobile/WebKit workflows. Physical assistive technologies and universal WCAG compliance remain unverified. |
| Performance | Existing public-build checks enforce deferred specialist libraries and a bounded startup entry. Tests include 51-page merge and file-size rejection. The catalog recorded per-tool timings locally; concurrent local test timings are not production benchmarks or Core Web Vitals. |
| Release reliability | Root and public builds are tested separately. General CI checks private policy; Pages checks public `/ihatepdf/` paths, workers, assets, metadata and synthetic downloads before deploying. Commit-specific release evidence must be checked before calling this release live. |
| Search | Bing ownership verified and sitemap submitted; IndexNow's initial 41-URL request returned HTTP 202 (receipt with ownership validation pending). Google's live URL test passed, but the homepage remained unknown to its index and an indexing request failed on Google's reCAPTCHA connection. See [provider evidence](SEARCH-DISCOVERY.md). No ranking improvement is established. |

Raw catalog evidence: ignored `.cache/qa/engineering-catalog-oct24.json` (copied from the audit's temporary output before subsequent test cleanup), timestamp `2026-10-24T17:32:31.019Z`. This structural audit preceded the page-size correction; the dimension regressions verify those repaired outputs separately. Synthetic artifacts stay local; no real documents were used.

## Follow-up priorities

- **Physical-device pilot:** actual Android/iPhone camera import, native download/open and Apple's Safari application. Emulation cannot complete these checks.
- **Search provider action:** the owner can complete Google's indexing request if its reCAPTCHA challenge appears. Bing sitemap processing, Google crawling and rankings are provider decisions. Do not repeat submissions merely to change status.
- **Resource budgets:** some older PDF/Office parsing paths still lack uniform decoded-size/page/time budgets. The 100 MB input cap does not bound decompressed archive or raster memory. Standardizing worker isolation and budgets is a separate change requiring large/adversarial fixtures; this review does not claim the concern is solved.
- **Architecture:** continue extracting dense legacy handlers from `src/app/index.mjs` into focused modules with artifact-level regressions when changing them. Avoid a broad rewrite during a reliability release.
- **Independent assurance:** keep sanitization/PDF-A unavailable and redaction experimental until independently validated. Review legal/public-business notices before broader launch commitments.

No new remote analytics, document uploads, paid services, outreach or account-security changes were introduced. This review is a bounded engineering pass, not continuous supervision or a promise that every input is safe or correct.

## Release validation

- Root build, unit/bundle checks (77 handler cases plus layout/submission checks) and 88-entry AI-readiness validation passed. Both production-only and full dependency advisory audits reported zero vulnerabilities; no dependencies were upgraded.
- Final root Chromium run: **87 passed, 20 skipped**. Public-only checks and the optional network-dependent OCR case skip here; the catalog's synthetic OCR conversion completed separately.
- Updated mobile/engine pilot: **51 passed** across Android Chromium emulation, iPhone WebKit emulation and desktop WebKit, including all three repaired raster tools and restored tool context.
- Public Pages suite: **53 passed**, including original-route instruction restoration, changed breadcrumbs/titles, all repaired raster sizes, static task help, ownership proofs, public indexability and subpath assets/workers. The private root distribution was regenerated afterward for the repository's normal build policy.
- During development, overlapping local Playwright invocations interfered with shared trace artifacts and a reused server. Those were harness failures; verification was restarted sequentially. The previously affected Unicode-font merge case passed on the final root run.
