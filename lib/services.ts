import type { Service } from '@/components/ServicePage';

/**
 * The three services, as pages.
 *
 * Slugs are the words people search, not our internal names: someone types
 * "IT setup" or "IT support", never "Kickstart". The card labels keep the
 * brand wording; the URLs and titles carry the search terms.
 *
 * `signs` is deliberately written as symptoms in the visitor's own words —
 * that is what earns search traffic, because people describe their problem
 * rather than the service that fixes it.
 */
export const SERVICES: Service[] = [
  {
    slug: 'it-setup',
    name: 'Kickstart',
    h1: 'IT set up properly,',
    h1Accent: 'first time.',
    intro:
      'For businesses setting up, or starting again after outgrowing whatever they started with. We put in the foundations — accounts, devices, security, backups — so nothing important is running on somebody’s personal login.',
    covers: [
      'Cloud and Microsoft 365 setup',
      'Networks, devices and access',
      'Security and backups from day one',
      'Getting off spreadsheets and paper',
      'Migrating from a system you have outgrown',
    ],
    signs: [
      'You are setting up a business and are not sure what you actually need, as opposed to what you are being sold.',
      'Everything important runs through one person’s personal email or Google account.',
      'Company files live on somebody’s laptop, in a WhatsApp group, or in three places at once.',
      'A spreadsheet is doing a job it stopped being suitable for a while ago.',
      'Nobody can say for certain whether there is a working backup.',
    ],
    steps: [
      { n: '01', title: 'Understand', body: 'A short conversation about the business, how it works now, and what is getting in the way.' },
      { n: '02', title: 'Scope', body: 'We recommend an approach, explain the trade-offs, and give you a clear proposal with a price.' },
      { n: '03', title: 'Set up', body: 'We build it, move you across with as little disruption as we can manage, and show you how it works.' },
    ],
  },
  {
    slug: 'software-development',
    name: 'Bespoke development',
    h1: 'Software shaped around your business,',
    h1Accent: 'not the reverse.',
    intro:
      'Off-the-shelf software is cheaper right up to the point where it nearly fits. When the gap between what a product does and what your business does starts costing real time, a bespoke build is usually the cheaper answer.',
    covers: [
      'Internal business applications',
      'Customer and staff portals',
      'API integrations',
      'Workflow automation',
      'Data and reporting systems',
    ],
    signs: [
      'A core process runs on a spreadsheet that several people edit at the same time.',
      'Somebody spends a day a week copying data between two systems that ought to talk to each other.',
      'You are paying per seat for a platform you use a tenth of.',
      'The off-the-shelf option nearly fits, and the part that does not fit is the part that matters.',
      'You have been quoted for a system that does far more than you asked for.',
    ],
    steps: [
      { n: '01', title: 'Understand', body: 'What the process actually is today, including the bits people work around rather than follow.' },
      { n: '02', title: 'Scope', body: 'The smallest thing that solves it, priced, with the trade-offs spelled out before anyone commits.' },
      { n: '03', title: 'Build', body: 'Small releases you can see and use, with regular communication rather than a reveal at the end.' },
    ],
  },
  {
    slug: 'it-support',
    name: 'Short & long-term support',
    h1: 'A pair of hands for a fortnight, or a team',
    h1Accent: 'on call for years.',
    intro:
      'Some businesses need something fixed this week. Others need someone technical they can reach when a decision comes up. Same people either way, and no notice period dressed up as a contract.',
    covers: [
      'Fixing what is broken now',
      'Monitoring and maintenance',
      'Infrastructure and cloud management',
      'Security and compliance',
      'Technical advice when decisions come up',
    ],
    signs: [
      'Something is broken now and nobody in the business owns it.',
      'Your IT is a freelancer who has gone quiet, or a former employee who still holds the passwords.',
      'You need cover for a few months, not a full-time hire.',
      'A supplier or an insurer has started asking security questions you cannot answer.',
      'A technical decision is coming up and you would like someone in the room who has no product to sell you.',
    ],
    steps: [
      { n: '01', title: 'Triage', body: 'What is broken, what is urgent, and what only looks urgent. Usually a call and some access.' },
      { n: '02', title: 'Stabilise', body: 'Fix the immediate problem, then write down what caused it so it is not a mystery next time.' },
      { n: '03', title: 'Stay or go', body: 'Hand it over, keep us on call, or keep improving it. Whichever suits — cancel whenever.' },
    ],
  },
];

export const bySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const others = (slug: string) => SERVICES.filter((s) => s.slug !== slug);
