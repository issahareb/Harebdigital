# Media refresh, 15 October 2026

- Replaced Taxi B&B presentation images with actual captures of
  `https://www.taxibbessen.de/`: desktop 1440 × 940, mobile 390 × 844.
  The capture declined optional tracking, waited for local fonts and visible
  hero content, and did not submit forms or modify the page's displayed UI.
  Both captures had no JavaScript errors or external Google Fonts requests.
- Updated the project detail image and its visible capture date as well as
  the two images on the main landing page.
- Added IRIS AI as the first of five gallery clips. The existing local
  `/videos/schau-1.mp4` is the video matching the previous service still.
  The same video path is used in the archived previews at `issahareb.me`.
  Existing viewport loading, muted inline playback, offscreen pause and
  reduced-motion/manual playback remain in force. No additional video copy
  or third-party hosting was introduced.
- Replaced service 02's archived still with a generated, explicitly labelled
  redesign concept of the fictional FORM studio. It is not client evidence.

## Image asset and generation

Asset: `public/studio/services-20261015/webdesign-redesign-1200.webp`
(1200 × 900, compressed WebP). Generated with the built-in Imagegen tool.

Prompt: Create a premium editorial 4:3 website redesign illustration for
Hareb Digital. On warm off-white, show the same fictional FORM studio in two
browser mockups: a smaller dated, cramped site on the left and a larger modern
site with clear hierarchy, olive imagery, generous space and matching mobile
view on the right. Connect them with one quiet arrow. Use charcoal, muted
olive and restrained pale lime, slight soft shadows, headings VORHER and
NACHHER. No real company logos, client claims, performance scores, neon or
holographic decoration.

## Verification

The production build must pass. Browser checks cover new image decoding,
three languages, mobile/desktop overflow, lazy video loading, muted inline
playback, offscreen pause, reduced motion and navigation through all five
gallery positions. Deployment and the same live checks are required before
reporting completion.
