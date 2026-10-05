import { notFound } from 'next/navigation'
import { ContactPage, contactMetadata } from '@/components/contact-page'
type Props = { params: Promise<{ lang: string }> }
export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (lang !== 'en' && lang !== 'es') notFound()
  return contactMetadata(lang)
}
export default async function Page({ params }: Props) {
  const { lang } = await params
  if (lang !== 'en' && lang !== 'es') notFound()
  return <ContactPage lang={lang} />
}
