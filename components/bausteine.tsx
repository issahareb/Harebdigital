import Link from "next/link";

export function Abschnitt({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 py-16 sm:py-20 ${className}`}>
      {children}
    </section>
  );
}

export function Ueberschrift({ eyebrow, children }: { eyebrow?: string; children: React.ReactNode }) {
  return (
    <>
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-leuchten">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{children}</h2>
    </>
  );
}

export function Knopf({
  href,
  children,
  variante = "voll",
}: {
  href: string;
  children: React.ReactNode;
  variante?: "voll" | "leer";
}) {
  const stil =
    variante === "voll"
      ? "bg-signal text-white hover:opacity-90"
      : "border border-white/20 text-kreide hover:border-white/40";
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-lg px-5 py-3 text-sm font-medium transition ${stil}`}
    >
      {children}
    </Link>
  );
}

export function Karte({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-kohle/60 p-6 transition-colors hover:border-white/20">
      {children}
    </div>
  );
}

/*
 * Bilder mit AVIF zuerst, WebP als Rückfall.
 *
 * next/image ist hier abgeschaltet (output: "export" ohne Optimierer), also
 * wird das von Hand gemacht — und zwar richtig: mit width/height, damit beim
 * Laden nichts springt. Layout-Sprünge sind eine der drei Kennzahlen, an denen
 * Google die Seitenqualität misst.
 */
export function Projektbild({ name, alt }: { name: string; alt: string }) {
  return (
    <picture>
      <source srcSet={`/projekte/${name}.avif`} type="image/avif" />
      <img
        src={`/projekte/${name}.webp`}
        alt={alt}
        width={1600}
        height={1000}
        loading="lazy"
        decoding="async"
        className="aspect-[16/10] w-full rounded-xl border border-white/10 object-cover object-top"
      />
    </picture>
  );
}
