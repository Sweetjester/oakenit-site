import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { Services } from '@/components/Services';
import { Proof } from '@/components/Proof';
import { Ethos } from '@/components/Ethos';
import { WhyUs } from '@/components/WhyUs';
import { Process } from '@/components/Process';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { Cursor } from '@/components/Cursor';

export default function Page() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Proof />
        <Ethos />
        <WhyUs />
        <Process />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
