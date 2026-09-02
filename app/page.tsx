import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { Services } from '@/components/Services';
import { WorkTeaser } from '@/components/WorkTeaser';
import { Stack } from '@/components/Stack';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <WorkTeaser />
        <Stack />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
