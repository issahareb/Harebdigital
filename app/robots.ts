import type { MetadataRoute } from "next";
import { marke } from "@/content/site";

/*
 * Bei output: "export" muss ausdruecklich dastehen, dass diese beiden Dateien
 * beim Build entstehen und nicht pro Anfrage. Ohne die Zeile bricht der Build
 * ab — Next kann nicht wissen, ob hier etwas Dynamisches gemeint war.
 */
export const dynamic = "force-static";

/*
 * Ohne robots.txt und sitemap.xml findet ein Crawler zwar auch etwas — aber
 * er muss raten, was zusammengehoert und was aktuell ist. Beides fehlte auf
 * beiden bisherigen Seiten.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/impressum/", "/datenschutz/"] }],
    sitemap: `${marke.domain}/sitemap.xml`,
    host: marke.domain,
  };
}
