import type { HdLang } from './hd-texte'

export const SERVICE_ART = ['design', 'relaunch', 'automation', 'visibility'] as const
export const ART_COPY: Record<HdLang, { services: string[]; contact: string; social: string; study: string }> = {
  de: {
    services: ['Glas- und Papierebenen bilden eine klare Seitenstruktur.', 'Ein gefaltetes Metallblatt entfaltet sich zu einer präzisen Form.', 'Ein durchgehender Metallparcours verbindet limettengrüne Kugeln.', 'Ein Glasprisma macht einen schmalen Lichtimpuls sichtbar.'],
    contact: 'Ein grüner Faden verbindet zwei gegenüberliegende Metallformen.',
    social: 'Von einem grünen Impuls breiten sich feine Wellen aus.',
    study: 'MATERIALSTUDIE / IDEE → SYSTEM',
  },
  en: {
    services: ['Glass and paper layers form a clear page structure.', 'A folded metal sheet unfolds into a precise form.', 'A continuous metal track connects chartreuse spheres.', 'A glass prism makes a narrow beam of light visible.'],
    contact: 'A green thread connects two facing metal forms.',
    social: 'Fine ripples spread from a green impulse.',
    study: 'MATERIAL STUDY / IDEA → SYSTEM',
  },
  es: {
    services: ['Capas de vidrio y papel forman una estructura clara.', 'Una lámina de metal se despliega en una forma precisa.', 'Un recorrido metálico conecta esferas verde lima.', 'Un prisma de vidrio hace visible un fino haz de luz.'],
    contact: 'Un hilo verde conecta dos formas metálicas enfrentadas.',
    social: 'Ondas finas se expanden desde un impulso verde.',
    study: 'ESTUDIO DE MATERIALES / IDEA → SISTEMA',
  },
}
