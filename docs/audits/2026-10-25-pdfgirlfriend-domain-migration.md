# PDFGirlfriend identity and custom-domain migration

Owner-authorized rename on 25 October 2026. Current application identity: PDFGirlfriend. Repository: https://github.com/mehbul/pdfgirlfriend. Custom domain: https://pdfgirlfriend.dpdns.org/. Hosting remains GitHub Pages and document processing remains on-device. Source licensing remains PolyForm Noncommercial 1.0.0 with the official-host permission in LICENSING.md.

## Engineering and provider evidence

- Release 16447f8: root build, 77 handler executions, image layout and search-submission checks, 88-entry AI-readiness checks and all 53 Pages browser tests passed. GitHub Pages workflow 40220613123 and CI 40220613129 completed successfully.
- All 41 public sitemap pages returned HTTP 200 with PDFGirlfriend copy and correct HTTPS self-canonicals. This HTTP check does not establish a working HTTPS certificate.
- DigitalPlat DNS: four apex A records point to GitHub Pages, TTL 300; www CNAME points to mehbul.github.io. Public resolvers returned the expected values. GitHub Pages custom-domain setting is pdfgirlfriend.dpdns.org.
- The former root redirect repository was unavailable. Restored mehbul/mehbul.github.io from the existing redirect-only checkout and extended it to both /FolioCove/ and /ihatepdf/: 80 fixed route files preserve query/hash via client-side redirects, not HTTP 301. Root Pages workflow 40220842750 succeeded. Ten live legacy route samples returned 200 with matching targets. Unknown paths remain 404. No account, document collection or analytics was added.
- Fresh merge and extraction recordings use the new app and synthetic documents. Merge download contains two pages; extraction contains only source pages 2, 3 and 4, verified by page count and labels. The extraction preview is rendered from the actual recorded download. Existing media filenames remain stable. README screenshot is refreshed.
- Discovery and support heartbeat names, current URLs, repository references and new-brand query scope were updated. Historical ranking data remains unchanged. No search-ranking gain, AdSense approval or completed physical-device validation is claimed.

## HTTPS and remaining provider work

GitHub approved the root and www certificates. Normal TLS verification succeeded; HTTPS enforcement is enabled. HTTP and www redirect to the canonical HTTPS address. Live HTTPS merge and extraction each produced three-page PDFs; the mobile-width layout fit without horizontal overflow, with no observed external request origins or page JavaScript errors. No certificate warnings were bypassed. Google/Bing ownership and sitemap state for this new hostname remain separate from earlier URL properties; Google requires a new public HTML verification tag, now included in the public-only build. Provider verification/submission is not indexing.

DigitalPlat shows expiry on 25 October 2027 and free renewal within 120 days of expiry. Owner renewal is required. This delegated dpdns.org address is separate from the contemplated paid .in domain. No paid plan, ads, remote processing or private Sites publication was activated.
