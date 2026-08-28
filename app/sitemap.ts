import type { MetadataRoute } from "next";
import { leistungen, marke } from "@/content/site";

/*
 * Bei output: "export" muss ausdruecklich dastehen, dass diese Datei beim
 * Build entsteht und nicht pro Anfrage.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const jetzt = new Date();
  const seiten = ["", ...leistungen.map((l) => l.slug), "referenzen", "kontakt"];

  return seiten.map((pfad) => ({
    url: pfad ? `${marke.domain}/${pfad}/` : `${marke.domain}/`,
    lastModified: jetzt,
    changeFrequency: pfad === "" ? "weekly" : "monthly",
    // Die Startseite und der lokale Hauptbegriff zuerst.
    priority: pfad === "" ? 1 : pfad === "webdesign-essen" ? 0.9 : 0.7,
  }));
}
