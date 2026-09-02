import type { Metadata } from 'next';
import { ServicePage } from '@/components/ServicePage';
import { bySlug, others } from '@/lib/services';

const SLUG = 'software-development';
const service = bySlug(SLUG)!;

export const metadata: Metadata = {
  title: "Bespoke software development for UK businesses",
  description: "Internal applications, portals, API integrations and workflow automation, built around how your business actually works rather than the other way round.",
  alternates: { canonical: `/services/${SLUG}` },
};

export default function Page() {
  return <ServicePage service={service} others={others(SLUG)} />;
}
