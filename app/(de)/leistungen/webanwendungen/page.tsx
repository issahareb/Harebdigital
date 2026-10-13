import { ADDITIONAL_SERVICES } from '@/lib/additional-services'
import { AdditionalServicePage, additionalServiceMetadata } from '@/components/additional-service-page'
export const metadata = additionalServiceMetadata(ADDITIONAL_SERVICES[1])
export default function Page(){return <AdditionalServicePage service={ADDITIONAL_SERVICES[1]}/>}
