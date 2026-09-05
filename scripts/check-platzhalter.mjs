/*
 * Verhindert genau den Fehler, an dem die Vorgängerseite hing.
 *
 * Dort standen vier erfundene Kundenstimmen im Code, darüber ein Kommentar
 * "PLATZHALTER — vor dem Livegang ersetzen". Der Kommentar hat niemanden
 * aufgehalten, weil ein Kommentar nichts aufhält. Eine Prüfung schon.
 *
 * Sie läuft vor jedem Build. Solange irgendwo noch PLATZHALTER steht — die
 * Anschrift, die Telefonnummer, die Umsatzsteuer-ID, die ungeprüfte
 * Datenschutzerklärung — bricht der Build ab und sagt, was fehlt.
 *
 * Absichtlich unbequem: Platzhalter, die live gehen, sind entweder peinlich
 * (000 000 000 als Telefonnummer) oder abmahnfähig (ein Impressum ohne
 * ladungsfähige Anschrift).
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const ORDNER = ["app", "components", "lib"];
const MUSTER = /PLATZHALTER[A-Z_]*/g;

async function dateien(pfad) {
  const gefunden = [];
  for (const eintrag of await readdir(pfad, { withFileTypes: true })) {
    const voll = join(pfad, eintrag.name);
    if (eintrag.isDirectory()) gefunden.push(...(await dateien(voll)));
    else if (/\.(ts|tsx)$/.test(eintrag.name)) gefunden.push(voll);
  }
  return gefunden;
}

const treffer = [];
for (const ordner of ORDNER) {
  for (const datei of await dateien(ordner)) {
    const inhalt = await readFile(datei, "utf8");
    inhalt.split("\n").forEach((zeile, i) => {
      // Die Definition der Konstante selbst und Kommentare darüber zählen nicht.
      if (/^\s*(\*|\/\/)/.test(zeile)) return;
      if (zeile.includes("export const PLATZHALTER")) return;
      const gefunden = zeile.match(MUSTER);
      if (gefunden) treffer.push({ datei, zeile: i + 1, text: zeile.trim().slice(0, 100) });
    });
  }
}

if (treffer.length > 0) {
  console.error(`\n${treffer.length} Platzhalter — die Seite ist noch nicht startbereit:\n`);
  for (const t of treffer) console.error(`  ${t.datei}:${t.zeile}  ${t.text}`);
  console.error(
    "\nBitte in lib/marke.ts eintragen: Anschrift, Telefon, USt-ID." +
      "\nDie Datenschutzerklärung gehört vorher geprüft — sie ist ein Gerüst, kein fertiger Text.\n",
  );
  process.exit(1);
}

console.log("OK — keine Platzhalter mehr, die Seite ist startbereit.");
