import { CollaborationDetails } from '@/components/collaboration-details'
import { pageMetadata } from '@/lib/seo'
import { notFound } from 'next/navigation'
type Props = { params: Promise<{ lang: string }> }
export async function generateMetadata({ params }: Props) { const {lang} = await params; if(lang !== 'en' && lang !== 'es') notFound(); return pageMetadata(lang, '/zusammenarbeit/', lang === 'en' ? 'Working together | Hareb Digital' : 'Colaboración | Hareb Digital', lang === 'en' ? 'Explore AI phone assistance, website pricing, project planning, hosting and ongoing support from Hareb Digital.' : 'Descubre asistencia telefónica con IA, precios web, planificación de proyectos, alojamiento y soporte de Hareb Digital.') }
export default async function Page({ params }: Props) { const {lang} = await params; if(lang !== 'en' && lang !== 'es') notFound(); return <CollaborationDetails lang={lang} /> }
