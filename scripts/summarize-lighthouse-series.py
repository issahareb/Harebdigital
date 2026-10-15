"""Create a reproducible summary and downloadable, unmodified Lighthouse reports."""
import hashlib
import json
import os
import statistics
import sys
import zipfile
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

source = Path(sys.argv[1])
root = Path(__file__).resolve().parents[1]
revisions = {
    "taxi": {"before": "9af327085e8c6a4f365741f764bdb504377ce5ff", "after": "2e41cf46df187c47b35a2a99ae95d1750cff1dfd"},
    "hareb": {"before": "a30a085b4aef2f60542b2790c4960fba490d82c5", "after": "bdc8054e846d10b2f2c2bd6eb9a4fc5c6e87819b"},
}
metrics = {"fcp": "first-contentful-paint", "lcp": "largest-contentful-paint", "tbt": "total-blocking-time", "cls": "cumulative-layout-shift", "speedIndex": "speed-index", "bytes": "total-byte-weight"}
result = {"revisions": revisions, "sites": {}, "profiles": {}, "reports": []}
files = []
timestamps = []
versions = set()
agents = set()
for site in ["taxi", "hareb"]:
    result["sites"][site] = {}
    for mode in ["mobile", "desktop"]:
        result["sites"][site][mode] = {}
        for stage in ["before", "after"]:
            rows = []
            for n in range(1, 4):
                path = source / f"{site}-{stage}-{mode}-{n}.json"
                raw = path.read_bytes()
                # Public navigation reports must not contain local proxy configuration.
                for key in ["HTTPS_PROXY", "HTTP_PROXY", "ALL_PROXY"]:
                    secret = os.environ.get(key, "")
                    assert not secret or secret.encode() not in raw, "Private proxy value in report"
                report = json.loads(raw)
                assert not report.get("runtimeError"), path.name
                assert not report["configSettings"].get("extraHeaders"), "Unexpected custom headers"
                versions.add(report["lighthouseVersion"])
                agents.add(report["environment"]["hostUserAgent"])
                timestamps.append(report["fetchTime"])
                profile = {k: report["configSettings"][k] for k in ["formFactor", "throttlingMethod", "throttling", "screenEmulation"]}
                assert mode not in result["profiles"] or result["profiles"][mode] == profile
                result["profiles"][mode] = profile
                values = {k: round(v["score"] * 100) for k, v in report["categories"].items()}
                values.update({key: report["audits"][audit]["numericValue"] for key, audit in metrics.items()})
                rows.append(values)
                result["reports"].append({"file": path.name, "url": report["finalDisplayedUrl"], "fetchTime": report["fetchTime"], "sha256": hashlib.sha256(raw).hexdigest(), "warnings": report["runWarnings"], **values})
                files.append(path)
            result["sites"][site][mode][stage] = {key: {"median": statistics.median(row[key] for row in rows), "min": min(row[key] for row in rows), "max": max(row[key] for row in rows)} for key in rows[0]}
result.update({"lighthouseVersions": sorted(versions), "hostUserAgents": sorted(agents), "start": min(timestamps), "end": max(timestamps), "runs": len(files)})
result["localDate"] = datetime.fromisoformat(result["end"].replace("Z", "+00:00")).astimezone(ZoneInfo("Europe/Berlin")).strftime("%d.%m.%Y")
content = root / "data/performance-20261016.json"
content.parent.mkdir(exist_ok=True)
content.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
notes = """# Lighthouse-Messreihe · 16. Oktober 2026

24 erfolgreiche Läufe: zwei Websites, zwei Geräteprofile, jeweils drei Läufe vor und nach der Optimierung. Die JSON-Dateien sind unveränderte Lighthouse-Berichte. SHA-256-Prüfsummen, Zeitstempel, Einzelwerte, Median und Spannweite stehen in summary.json.

Methode: Lighthouse 13.5.0, Chromium Headless 134.0.6998.35, Standardprofile Mobile und Desktop, simulierte Drosselung, je Lauf ein frisches Browserprofil. Alle Läufe nacheinander, ohne parallele Builds oder Browserprüfungen. Beide Messreihen laufen aus derselben Cloud-Arbeitsumgebung über deren Netzwerkproxy. Zertifikatsprüfung des Audit-Browsers für diesen Proxy deaktiviert. Keine benutzerdefinierten Header, keine angemeldete Sitzung. Die exakten Drosselungs- und Bildschirmparameter sind in summary.json und jedem Bericht enthalten.

Labormessungen hängen von Gerät, Netzwerk, Testversion und Serverantwort ab. Der Proxy beeinflusst die Netzwerkbeobachtung. Die Ergebnisse sind deshalb innerhalb dieser Serie vergleichbar, aber nicht ohne Weiteres mit PageSpeed Insights oder früheren, anders durchgeführten Tests. Sie sind keine repräsentativen Besucherdaten. TBT ist kein gemessener INP. Es werden keine Buchungs- oder Umsatzsteigerungen und keine Überlegenheit gegenüber anderen Websites abgeleitet.

Vorher/Nachher bezeichnet nur diese Optimierungsrunde, nicht den ursprünglichen Website-Relaunch. Die zuvor genannten Werte 63, 72 oder 94 stammen aus anderen Messungen und gehen nicht in diese Serie ein. Der zugeschickte Konkurrenzvergleich wird mangels prüfbarer Rohdaten nicht veröffentlicht.

Wiederholung: Lighthouse CLI in Version 13.5.0 installieren, CHROME_PATH auf dieselbe Chromium-Version setzen. Je Website drei Aufrufe mit --only-categories=performance,accessibility,best-practices,seo --output=json; für Desktop zusätzlich --preset=desktop. Für identische Netzwerkbedingungen ist dieselbe Proxy-Umgebung erforderlich. Rohberichte als taxi-before-mobile-1.json usw. speichern. Auswertung: python scripts/summarize-lighthouse-series.py <Berichtsordner>.

Quellrevisionen und alle Messzeitpunkte stehen in summary.json. Die Änderung des Fallstudientextes nach der Messung verändert die untersuchten Startseiten nicht.
"""
archive = root / "public/studio/evidence/lighthouse-20261016.zip"
with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as z:
    z.writestr("README.md", notes)
    z.writestr("summary.json", content.read_bytes())
    for path in files:
        z.write(path, path.name)
print(json.dumps({"runs": len(files), "archiveBytes": archive.stat().st_size, "sites": result["sites"]}, indent=2))
