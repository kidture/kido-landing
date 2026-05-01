import Nav from '@/components/nav'
import Hero from '@/components/hero'
import Burden from '@/components/burden'
import Answer from '@/components/answer'
import HowItWorks from '@/components/how-it-works'
import Families from '@/components/families'
import Clinical from '@/components/clinical'
import WaitlistForm from '@/components/waitlist-form'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Burden />
      <Answer />
      <HowItWorks />
      <Families />
      <Clinical />
      <WaitlistForm />
    </main>
  )
}
