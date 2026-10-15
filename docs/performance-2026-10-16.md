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
