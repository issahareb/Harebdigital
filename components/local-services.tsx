import Link from 'next/link'

const services = [
  { href: '/leistungen/neue-website/', label: 'Webdesign und Webentwicklung in Essen' },
  { href: '/leistungen/website-ueberarbeiten/', label: 'Bestehende Website überarbeiten lassen' },
  { href: '/leistungen/gefunden-werden/', label: 'SEO und Sichtbarkeit bei Google' },
  { href: '/leistungen/webanwendungen/', label: 'Individuelle Webanwendungen' },
  { href: '/leistungen/automatisierung/', label: 'Abläufe und Schnittstellen automatisieren' },
  { href: '/leistungen/social-media-marketing/', label: 'Social Media Marketing und Content' },
]

export function LocalServices({ currentPath }: { currentPath?: string }) {
  return (
    <section className="mt-12" data-track-section="local-services">
      <h2>Digitale Projekte für Essen und das Ruhrgebiet</h2>
      <p>Ich bin Issa Hareb und arbeite von Essen aus an Websites, Anwendungen und digitalen Inhalten. Bei Hareb Digital lassen sich Gestaltung, Entwicklung und Social Media aufeinander abstimmen: vom ersten Video über die passende Website bis zur Bearbeitung einer Anfrage. Der Geschäftssitz liegt in Sankt Augustin.</p>
      <nav aria-label="Passende Leistungen für dein Projekt" className="mt-6 flex flex-wrap gap-6">
        {services.filter(service => service.href !== currentPath).map(service => (
          <Link key={service.href} href={service.href} className="text-link" data-track-id={`local-service-${service.href.split('/')[2]}`}>
            {service.label} ↗
          </Link>
        ))}
      </nav>
    </section>
  )
}
