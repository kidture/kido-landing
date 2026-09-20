import type { Metadata } from 'next'
import BetaAccess from '@/components/beta-access'

export const metadata: Metadata = {
  title: 'Join the Kidture beta',
  description: 'Install the Kidture beta on iPhone, iPad, or Android.',
}

export default function BetaTestingPage() {
  return <BetaAccess testFlightUrl={process.env.PUBLIC_TESTFLIGHT_BETA_URL?.trim() ?? ''} />
}
