import type { Metadata } from 'next';
import { ServicePage } from '@/components/ServicePage';
import { bySlug, others } from '@/lib/services';

const SLUG = 'it-support';
const service = bySlug(SLUG)!;

export const metadata: Metadata = {
  title: "IT support for UK businesses \u2014 short and long term",
  description: "Something fixed this week, or a technical team on call for years. Monitoring, cloud and infrastructure management, security and compliance. No lock-in.",
  alternates: { canonical: `/services/${SLUG}` },
};

export default function Page() {
  return <ServicePage service={service} others={others(SLUG)} />;
}
