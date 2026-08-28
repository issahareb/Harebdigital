import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { marke, navigation, start } from "@/content/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

/*
 * metadataBase ist kein Beiwerk.
 *
 * Ohne diese Zeile erzeugt Next relative og:image- und canonical-Adressen, und
 * relative Adressen sind fuer Google und jedes soziale Netzwerk wertlos. Das
 * ist einer der haeufigsten Fehler auf sonst sauber gebauten Next-Seiten.
 */
export const metadata: Metadata = {
  metadataBase: new URL(marke.domain),
  title: {
    default: `${start.titel} — ${marke.name}`,
    template: `%s — ${marke.name}`,
  },
  description: start.beschreibung,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: marke.name,
    title: `${start.titel} — ${marke.name}`,
    description: start.beschreibung,
    url: marke.domain,
  },
  robots: { index: true, follow: true },
};

/*
 * Strukturierte Daten fuer ein LOKALES Dienstleistungsunternehmen.
 *
 * Das ist der Teil, den Google fuer die Kartenbox und das Wissenspanel liest.
 * "areaServed" ist hier wichtiger als die Adresse: gearbeitet wird im ganzen
 * Ruhrgebiet, der Sitz ist nur der Ausgangspunkt.
 */
function strukturierteDaten() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: marke.name,
    description: start.beschreibung,
    url: marke.domain,
    email: marke.email,
    telephone: marke.telefon,
    founder: { "@type": "Person", name: marke.inhaber, url: marke.portfolio },
    address: {
      "@type": "PostalAddress",
      streetAddress: marke.strasse,
      postalCode: marke.plz,
      addressLocality: marke.ort,
      addressCountry: marke.land,
    },
    areaServed: marke.gebiet.map((ort) => ({ "@type": "City", name: ort })),
    knowsAbout: ["Webdesign", "Webentwicklung", "Landingpages", "SEO", "Barrierefreiheit", "KI-Agenten"],
    sameAs: [marke.portfolio],
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body>
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-signal focus:px-4 focus:py-2"
        >
          Zum Inhalt springen
        </a>

        <header className="sticky top-0 z-40 border-b border-white/10 bg-tinte/80 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4" aria-label="Hauptnavigation">
            <Link href="/" className="text-base font-semibold tracking-tight">
              {marke.name}
            </Link>
            <ul className="hidden gap-7 text-sm text-nebel md:flex">
              {navigation.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-kreide">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/kontakt"
              className="rounded-lg bg-signal px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Anfragen
            </Link>
          </nav>
        </header>

        <main id="inhalt">{children}</main>

        <footer className="mt-24 border-t border-white/10 px-5 py-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-nebel md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-semibold text-kreide">{marke.name}</p>
              <p className="mt-1">
                {marke.claim} · Inhaber {marke.inhaber}
              </p>
              <p className="mt-1">Tätig in {marke.gebiet.join(", ")}</p>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li><Link href="/referenzen" className="hover:text-kreide">Referenzen</Link></li>
              <li><Link href="/kontakt" className="hover:text-kreide">Kontakt</Link></li>
              <li><Link href="/impressum" className="hover:text-kreide">Impressum</Link></li>
              <li><Link href="/datenschutz" className="hover:text-kreide">Datenschutz</Link></li>
              <li>
                <a href={marke.portfolio} className="hover:text-kreide" rel="me">
                  Portfolio
                </a>
              </li>
            </ul>
          </div>
        </footer>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturierteDaten()) }}
        />
      </body>
    </html>
  );
}
