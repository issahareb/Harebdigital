/*
 * Die Projektbilder aus dem Portfolio in ein Format bringen, das auf einer
 * Seite tragbar ist, die gefunden werden soll.
 *
 * Ausgangslage: sieben PNGs mit zusammen fast 10 MB, einzelne davon 2,1 MB.
 * Auf einem Portfolio faellt das weniger auf — dort kommt man wegen der
 * Bilder. Hier ist Ladezeit ein Verkaufsargument gegen Agenturen, die
 * WordPress mit zwanzig Plugins ausliefern; ein 2-MB-Screenshot im Hero
 * waere die peinlichste Art, dieses Argument zu verlieren.
 *
 * AVIF zuerst, WebP als Rueckfall — beides deckt jeden Browser ab, den es
 * praktisch noch gibt. Breite 1600px: mehr sieht auf keinem Bildschirm
 * jemand, auf dem diese Bilder in einer Karte stehen.
 */
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";

const QUELLE = "/home/user/portfolio_v2/public/projects";
const ZIEL = "public/projekte";
const BREITE = 1600;

await mkdir(ZIEL, { recursive: true });
const dateien = (await readdir(QUELLE)).filter((n) => /\.(png|jpe?g)$/i.test(n));

let vorher = 0;
let nachher = 0;

for (const datei of dateien) {
  const { name } = parse(datei);
  const pfad = join(QUELLE, datei);
  vorher += (await stat(pfad)).size;

  const bild = sharp(pfad).resize({ width: BREITE, withoutEnlargement: true });
  await bild.clone().avif({ quality: 55 }).toFile(join(ZIEL, `${name}.avif`));
  await bild.clone().webp({ quality: 72 }).toFile(join(ZIEL, `${name}.webp`));

  for (const endung of ["avif", "webp"]) {
    nachher += (await stat(join(ZIEL, `${name}.${endung}`))).size;
  }
  console.log(`  ${datei} → ${name}.avif + ${name}.webp`);
}

const mb = (b) => (b / 1024 / 1024).toFixed(2);
console.log(`\n${dateien.length} Bilder: ${mb(vorher)} MB → ${mb(nachher)} MB (beide Formate zusammen)`);
