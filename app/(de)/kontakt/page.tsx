import { ContactPage, contactMetadata } from '@/components/contact-page'
export const metadata = contactMetadata('de')
export default function Page() {
  return <ContactPage lang="de" />
}
