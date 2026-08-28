/** @type {import('next').NextConfig} */
const nextConfig = {
  // Statische Ausgabe: die Seite ist reiner Inhalt, es gibt nichts zu
  // rendern, was ein Server wissen müsste. Damit läuft sie auf jedem Hoster,
  // liefert fertiges HTML aus und ist so schnell, wie sie sein muss.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
