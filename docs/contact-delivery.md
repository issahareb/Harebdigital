# Contact delivery

The form discovers availability from `GET /api/contact/`. With no mail credentials it explicitly prepares an email in the visitor's mail app. It never reports a delivered message in that mode.

To activate direct delivery, configure server-only Railway variables from `.env.example` using one verified provider:

- SMTP: `CONTACT_FROM`, `CONTACT_TO`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`.
- Resend: `CONTACT_FROM`, `CONTACT_TO`, `RESEND_API_KEY`. The sender domain must be verified.

Use the secure provider/platform configuration for secrets, never source control or a `NEXT_PUBLIC_` variable. The default destination remains the published business email `info@hareb.org`.

Before activation, update the contact-processing section of the privacy notice with the actual provider and processing details. Its current mail-app description reflects the currently active fallback. The original legal placeholders remain outstanding and `npm run pruefen` still guards them.

`POST /api/contact/` validates bounded input and a fixed service allowlist. It accepts same-origin requests, applies a hidden spam field and five requests per 15 minutes per salted address hash. This is an in-memory limiter for the existing single replica; use a shared limiter before scaling replicas. Messages and addresses are not logged. SMTP requires TLS. Visitors are used only as Reply-To, never as the sender or destination.

The interface retains the message on failure and offers a prefilled email fallback. Success requires the provider's positive acceptance response. Verify a real delivery and reply path after provider configuration; browser tests mock provider outcomes and send no email.
