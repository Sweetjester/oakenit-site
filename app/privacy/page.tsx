import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { SectionLabel } from '@/components/SectionLabel';
import { COMPANY } from '@/lib/company';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'What OakenIT does with the personal data you submit through this website, who processes it, and how to have it deleted.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

const UPDATED = '2 September 2026';

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-forest-800/80 dark:text-cream-100/70 leading-relaxed mb-4">{children}</p>;
}
function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display font-bold text-xl tracking-[-0.02em] text-forest-800 dark:text-cream-100 mt-10 mb-3">
      {children}
    </h2>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative canopy pt-36 pb-14 lg:pt-44 lg:pb-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <div className="mb-6">
              <SectionLabel as="h2">Privacy</SectionLabel>
            </div>
            <h1 className="font-display font-extrabold text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.035em] text-forest-800 dark:text-cream-100">
              What we do with your <span className="text-leaf">data.</span>
            </h1>
            <p className="mt-6 text-forest-800/70 dark:text-cream-100/60">Last updated {UPDATED}</p>
          </div>
        </section>

        <section className="pb-20 border-t border-forest-900/10 dark:border-cream-100/10 pt-12">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <P>
              {COMPANY.legalName} (&ldquo;we&rdquo;) is the data controller for personal data
              submitted through this website. This notice explains what we collect, why, who
              else sees it, and how to have it removed. It is written to be read, not to be
              impenetrable.
            </P>

            <H>What we collect</H>
            <P>
              Only what you type into the contact form: your <strong>name</strong>, your{' '}
              <strong>email address</strong>, your <strong>company name</strong> (optional) and
              the <strong>message</strong> you write. Nothing else, and we do not buy or enrich
              contact data from third parties.
            </P>
            <P>
              We do not use advertising or tracking cookies, and there is no cookie banner
              because there is nothing to consent to. Our analytics (Cloudflare Web Analytics)
              is cookieless and reports aggregate page views only — it cannot identify you.
            </P>

            <H>Why we hold it, and on what basis</H>
            <P>
              To reply to your enquiry and, if it goes further, to scope and deliver work. Our
              lawful basis is <strong>legitimate interests</strong> — you contacted us about
              our services and expect a reply. If we go on to work together, the basis becomes
              performance of a contract.
            </P>

            <H>Who else processes it</H>
            <P>
              Your enquiry is stored in our own internal system, and a notification is emailed
              to us. In doing that, these processors handle the data on our behalf:
            </P>
            <ul className="mb-4 space-y-2 text-forest-800/80 dark:text-cream-100/70">
              <li>
                <strong>Railway</strong> — hosts this website and our internal system.
              </li>
              <li>
                <strong>Cloudflare</strong> — serves the site, filters malicious traffic, routes
                our email, and provides cookieless analytics.
              </li>
              <li>
                <strong>Resend</strong> — sends the notification email. Processed in the EU
                (eu-west-1).
              </li>
              <li>
                <strong>Google</strong> — our mailbox provider, where the notification lands.
              </li>
            </ul>
            <P>
              Some of these operate outside the UK. Where that happens, transfers rely on the
              UK International Data Transfer Addendum or equivalent safeguards in each
              provider&rsquo;s terms.
            </P>

            <H>How long we keep it</H>
            <P>
              Enquiries that do not become work are deleted within{' '}
              <strong>24 months</strong>. Where we do work together, we keep records for{' '}
              <strong>6 years</strong> after the engagement ends, which is the period HMRC
              requires for business records.
            </P>

            <H>Your rights</H>
            <P>
              You can ask us for a copy of what we hold about you, ask us to correct it, ask us
              to delete it, or object to us holding it at all. Email{' '}
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-forest-600 dark:text-leaf-200 hover:text-leaf-600 dark:hover:text-leaf-100 transition-colors"
              >
                {COMPANY.email}
              </a>{' '}
              and we will action it within one month. There is no charge.
            </P>
            <P>
              If you think we have handled your data badly, please tell us first — but you can
              complain to the Information Commissioner&rsquo;s Office at{' '}
              <a
                href="https://ico.org.uk/make-a-complaint/"
                target="_blank"
                rel="noreferrer"
                className="text-forest-600 dark:text-leaf-200 hover:text-leaf-600 dark:hover:text-leaf-100 transition-colors"
              >
                ico.org.uk
              </a>
              .
            </P>

            <H>Who we are</H>
            <P>
              {COMPANY.legalName}, a company registered in {COMPANY.placeOfRegistration},
              company number {COMPANY.number}. Registered office:{' '}
              {COMPANY.registeredOffice}. Contact:{' '}
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-forest-600 dark:text-leaf-200 hover:text-leaf-600 dark:hover:text-leaf-100 transition-colors"
              >
                {COMPANY.email}
              </a>
              .
            </P>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
