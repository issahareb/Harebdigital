import { ADDITIONAL_SERVICES } from '@/lib/additional-services'
import { AdditionalServicePage, additionalServiceMetadata } from '@/components/additional-service-page'
const service = ADDITIONAL_SERVICES[2]
export const metadata = additionalServiceMetadata(service)
export default function Page() { return <AdditionalServicePage service={service} /> }
