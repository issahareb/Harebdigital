# Startup media performance

Baseline source: a30a085. Three serial Lighthouse 13.5.0 runs per device on https://hareb.digital/, Chromium 134, default mobile/desktop profiles and simulated throttling, fresh browser profiles through the workspace proxy. Median performance: 87 mobile / 92 desktop; mobile LCP 2.723 s. Accessibility 96, best practices and SEO 100. Scores are laboratory observations, not field Core Web Vitals.

Changes:
- Gallery and motion-video fallback stills use responsive, lazy Next images. Remove the redundant video poster attribute, which previously forced all stills to download immediately despite preload=none. Keep the independent still beneath the video until the first presented frame, including reduced-motion and no-JavaScript fallbacks.
- At rest, prefetch only the first two scroll-sequence frames instead of thirteen. Expand the existing bounded frame window as soon as scrolling advances. Videos still attach their source only when their actual media area enters the viewport.
- When frames decode out of order, only paint a loaded frame between the currently painted frame and the scroll target. This prevents backward jumps and overshooting during a continuous scroll direction.

No text colours, layout, animation timings or sound preferences change. Build passed. Local mobile/desktop checks confirmed two initial frames, zero initial gallery video sources, forward and reverse frame progression, no horizontal overflow and no JavaScript errors. Final live reports follow successful deployment.

## Case study proposal

Use the existing TaxiBB project page for a focused case study: the customer's booking task, preserved design and interaction requirements, the concrete technical changes, then a mobile/desktop before-and-after table with median and range. Add LCP, TBT, CLS and transferred bytes, dates, URLs, source revisions, Lighthouse/browser versions, throttling and the proxy limitation. Link raw reports and distinguish laboratory TBT from field INP. Show open goals as openly as improvements.

The externally reported 120-run, 23-competitor comparison remains unpublished: its raw reports and tested URLs are unavailable here. Do not reuse those scores as verified evidence or claim superiority over agencies. Historical 63/6.8 s and 72/4.0 s figures are not interchangeable with this controlled series. Report each series with its own method.

## Verified live results

24 successful serial runs, 16 October 2026 (Europe/Berlin), 00:30–00:44. Before and after each contain three runs per site/device. All reported numbers below are medians. Full unmodified reports, exact profiles, timestamps and SHA-256 checksums: `public/studio/evidence/lighthouse-20261016.zip`. Machine-readable summary: `data/performance-20261016.json`.

| Website / profile | Performance before → after | LCP before → after | TBT before → after | CLS before → after | Transfer before → after |
|---|---|---|---|---|---|
| taxi / mobile | 82 → 85 | 3.150 s → 2.852 s | 154 ms → 128 ms | 0.0000 → 0.0000 | 649 KiB → 583 KiB |
| taxi / desktop | 91 → 92 | 0.795 s → 0.721 s | 0 ms → 0 ms | 0.0000 → 0.0022 | 741 KiB → 664 KiB |
| hareb / mobile | 87 → 89 | 2.723 s → 2.418 s | 37 ms → 92 ms | 0.0000 → 0.0057 | 589 KiB → 340 KiB |
| hareb / desktop | 92 → 91 | 0.701 s → 0.660 s | 0 ms → 0 ms | 0.0021 → 0.0021 | 689 KiB → 377 KiB |

Interpretation: Taxi mobile transfer decreased by 10.1%, Hareb mobile by 42.2%. Mobile LCP improved on both. Taxi mobile performance remains below the 90-point target. Hareb desktop performance changed from 92 to 91 despite its lower LCP and transfer size: this is not evidence of a desktop-score improvement. Hareb mobile TBT increased from 37 to 92 ms; font-related CLS appeared at approximately 0.006. These regressions remain visible in the reports and must not be hidden behind headline scores. The remaining startup JavaScript, font rendering and visual-completion timing merit investigation in a future controlled series. Do not sacrifice the established animations to inflate a score.

Taxi accessibility, best practices and SEO were 100 in every run. Hareb accessibility was 96 before and after; best practices and SEO were 100. No runtime audit errors or run warnings. Lighthouse TBT is a lab metric, not field INP. Some observed document response times include substantial workspace-proxy delay; no backend-only latency claim can be derived from them. Older values from Lighthouse 12 or other environments are separate series.

Live deployment checks passed at 390 and 1440 CSS pixels: Taxi language switching, RTL, eight FAQ items and matching JSON-LD, responsive logo, time-slot selection and retained form state; Hareb two initial sequence frames, deferred gallery sources, monotonic forward/reverse frame selection, no horizontal overflow or JavaScript errors. Actual gallery playback was additionally checked in the cloud Chrome browser: readyState 4, time advancing in view, paused out of view. Local form tests used mocked responses and did not send production emails.

The Taxi project page now presents this specific optimization round, including medians, ranges, limits and raw-report download. It makes no competitor, revenue or booking-growth claim.
