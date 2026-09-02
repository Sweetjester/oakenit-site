import type { Metadata } from 'next';
import { ServicePage } from '@/components/ServicePage';
import { bySlug, others } from '@/lib/services';

const SLUG = 'it-setup';
const service = bySlug(SLUG)!;

export const metadata: Metadata = {
  title: "IT setup and migration for UK businesses",
  description: "Cloud and Microsoft 365 setup, networks, devices, security and backups \u2014 put in properly the first time. For UK businesses starting up or replacing what they outgrew.",
  alternates: { canonical: `/services/${SLUG}` },
};

export default function Page() {
  return <ServicePage service={service} others={others(SLUG)} />;
}
