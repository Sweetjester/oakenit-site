import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Process } from '@/components/Process';
import { WhyUs } from '@/components/WhyUs';
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
        <CTA />
        <WhyUs />
        <Process />
      </main>
      <Footer />
    </>
  );
}
