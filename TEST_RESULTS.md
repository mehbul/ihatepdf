# iHatePDF validation

Review date: 24 October 2026. Public beta: https://mehbul.github.io/ihatepdf/.
See [the engineering review](docs/2026-10-24-engineering-review.md) for this release's findings and final test results.

## Builds and automated coverage

- `npm run build`: private root build; 19 dedicated tool routes and five information routes. Its `noindex,nofollow` policy is intentional.
- `npm test`: 77 generated-handler executions across ten synthetic PDFs, malformed-input rejection, range validation, route initialization, XLS/XLSX conversion, image-to-PDF layout rules and mocked IndexNow submission/state handling.
- `node scripts/test-ai-readiness.mjs`: all 88 registry entries, capabilities, knowledge files and private-build metadata consistency.
- `npm run test:e2e`: Chromium workflows, file ordering, conversion appearance, image filters/cropping/page layout, prepared downloads, tool handoff, malformed-input handling and unsupported-AI behavior. Public-only checks skip in the private build; network-dependent OCR runs separately.
- `npx playwright test --config=playwright.pages.config.mjs`: the public Pages build at `/ihatepdf/`, including indexable pages, canonical URLs, static task instructions, published samples, public ownership proof, guide links and actual synthetic downloads.
- `npx playwright test --config=playwright.pilot.config.mjs`: selected Android Chromium, iPhone WebKit and desktop WebKit workflows. These are browser-engine/emulation tests.
- `node scripts/audit-catalog.mjs` against the local server: one representative synthetic input per catalog tool. It records parsed artifacts, visible outcomes, page errors and network-guard observations in ignored `test-results/launch-catalog/report.json`. A parseable PDF does not establish fidelity or safety.

Browser network guards reject unexpected external requests and synthetic document-marker leakage in the workflows where installed. OCR has a documented language-model download allowance. This evidence is scoped to exercised cases; local processing does not mean zero asset/model network traffic.

## Current product boundaries

Privacy Inspector produces a read-only report. It does **not** create a verified sanitized copy. Verified sanitization and validated PDF/A are unavailable. Redaction is experimental and requires independent inspection. On-device AI depends on browser APIs and model availability.

Image-to-PDF supports ordering, per-image edits and shared paper/export settings. Its generated files are checked for page dimensions, numbering and filter pixels. Prepared-download handoff stays in memory; reloading clears selected files and unsaved settings.

Public Pages is indexable. The separate private Sites host retains private access and private-build indexing policy. Successful deployment, a submitted sitemap or an IndexNow receipt does not prove search indexing or ranking.

## Remaining evidence gaps

- Actual Android/iPhone camera capture, native download/open flows and Apple's Safari application.
- OCR accuracy across real languages/layouts; handwriting and universal text reconstruction are not promised.
- Fidelity for arbitrary complex Office documents, huge/malformed archives and every possible PDF structure.
- Independent redaction/sanitization assurance, security certification or a penetration test.
- Unaided user completion, satisfaction and production performance on representative low-memory physical devices.
- Legal review and provider decisions about crawling, indexing or ranking.

Older dated audits under `docs/` remain historical evidence. Do not transfer their browser counts, branding or search observations to the current release without a fresh check.
