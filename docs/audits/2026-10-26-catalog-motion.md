# Catalog simplification and motion

Owner request: remove the Everyday tools feature and make the website more animated and friendly. The grouping was removed from the homepage category bar and workspace selector. Homepage discovery now starts with all 36 visual cards; the sidebar starts with all 88 tool entries. No processing tools, output filenames, local preference keys or feature limitations were removed. Category search includes a result count and a clear-search/filter recovery action.

## Motion

A small self-hosted CSS/module layer adds one initial paper-preview fan, a moving category indicator, bounded catalog transitions, pointer feedback for tool/file/result state changes, and browser-supported cross-document fades. No animation package, remote service, analytics or document upload is added. The module does not read filenames or document contents. Keyboard actions cancel animations and skip spatial transitions. Reduced-motion mode uses static previews and no scripted animation; hiding a page cancels active effects. Search typing avoids animated re-layout. Content is visible without motion scripts.

## Scoped verification

- Root build, 77 handler executions, image-layout checks, submission-scope checks and 88-entry AI-readability validation passed.
- All 55 Pages Chromium checks passed. Two new checks exercise category/search recovery, preserved keyboard focus, removal of the old filter, reduced-motion behavior, mobile overflow, local sample selection and reading-page navigation. Existing download and conversion checks remained green.
- Desktop (1280×720) and phone-width (390×844) screenshots were reviewed together. Category navigation scrolls within its region; neither page overflowed horizontally. This is browser emulation, not real phone or Safari-app testing.
- The motion CSS and module total approximately 9.3 KB of uncompressed source. This is a source-size observation, not a field performance score. Browser support controls cross-document transitions; ordinary navigation remains the fallback.

Publication requires the commit-specific Pages workflow and live checks; local passing checks alone do not establish deployment. The separate Sites audience remains owner-private.
