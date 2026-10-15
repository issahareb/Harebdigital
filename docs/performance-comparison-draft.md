# Performance comparison — review draft, 2026-10-15

This branch is a design draft, not approved measurement evidence. Do not merge
into `visual-hero-proof` or deploy it until the source reports are checked.

The German landing page contains the proposed section after WebsiteShowcase.
It uses existing typography and reveal behavior; numbers do not animate or
cause layout shifts. The visible draft label and source-status disclosure are
intentional. English and Spanish pages remain unchanged pending verification.

## Supplied claim

The user forwarded a Grokbot message reporting mobile Lighthouse 12 tests on
15 October 2026, 22:48–22:59 (timezone unspecified), five runs per website:

| Subject | Performance | LCP |
| --- | ---: | ---: |
| taxibbessen.de | 94 | 2.7 s |
| 23 other taxi sites | 70 | 5.7 s |
| adeladesign.de (separate agency comparison) | 62 | 19.5 s |

Claimed total: 120 successful runs. Claimed raw-data path:
`/workspace/hareb/lh_fair_5x/summary.md`.
That directory is absent in this workspace. Searches for the named summary and
folder in connected files did not locate them. The older Lighthouse report is
not a substitute for this comparison.

## Evidence required before publication

- Original JSON reports, summary, script/configuration and full tested URL list.
- Confirm 120 = (1 + 23) × 5; establish whether the agency measurements were
  separate (another 5) or included in the reported sample.
- Recompute per-site medians from the raw performance scores and LCP values.
  Establish whether the group result is a median of site medians or pooled runs.
- Compare Lighthouse and browser versions, device emulation, throttling, run
  mode, cache conditions and test machine; inspect runtime and audit errors.
- Verify the time window and timezone; document variance, not only medians.
- Link a readable methodology with the tested URLs and downloadable redacted
  source reports. Retest when publishing materially different site versions.
- Scope the conclusion to the tested sample and laboratory conditions. Do not
  infer a universal ranking, real-user field performance or agency quality.
- Do not publish the alleged agency price of EUR 399 without primary evidence.

After verification, replace the draft/source-status copy with the verified
methodology and evidence links and add matching EN/ES translations. Preserve
the distinction between measured LCP and a fully loaded page.
