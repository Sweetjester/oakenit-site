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
    faqs: [
      {
        q: "How long does it take to set up IT for a new business?",
        a: "For a small team starting from scratch, usually days rather than weeks — accounts, devices, email, file storage, backups. Moving an existing business off something it has outgrown takes longer, because the work is in migrating what you already have without losing anything or stopping trading. We tell you which one you are before you commit.",
      },
      {
        q: "Should we use Microsoft 365 or Google Workspace?",
        a: "Most UK small businesses end up on Microsoft 365, largely because their accountants, clients and industry software assume it. Google Workspace is genuinely good and often simpler if you have no such constraints. It is worth ten minutes of conversation rather than a default — switching later is possible but tedious.",
      },
      {
        q: "What happens to our existing email and files?",
        a: "They come with you. Email, calendars, contacts and files are migrated across, and we keep the old system available until you are satisfied nothing is missing. Nobody should be asked to trust a migration on the day it happens.",
      },
      {
        q: "Do we need to buy new hardware?",
        a: "Often not. Plenty of setups work fine on the machines you already have, and we would rather spend your money on the things that actually fix the problem. Where hardware genuinely needs replacing we will say so and explain why.",
      },
      {
        q: "Can you set things up so we are not dependent on one person’s account?",
        a: "That is usually the main reason people call. Company data should live in company accounts, with more than one person able to reach it, and a backup somebody has actually tested. It is one of the first things we put right.",
      },
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
    faqs: [
      {
        q: "Is bespoke software cheaper than off-the-shelf?",
        a: "Not up front — it is almost always more expensive to build than to subscribe. It becomes cheaper when an off-the-shelf product nearly fits and the gap costs real time every week, or when you are paying per seat for a platform you use a fraction of. If a product genuinely fits, we will tell you to buy the product.",
      },
      {
        q: "How long does a bespoke build take?",
        a: "It depends entirely on scope, which is why we scope before quoting. What we will commit to is that you see working software early and often, in small releases, rather than waiting months for a reveal at the end.",
      },
      {
        q: "Who owns the software when it is finished?",
        a: "Ownership is agreed in writing before any work starts and set out in the proposal. We think you should own what you paid for, and we are happy to say so in the contract.",
      },
      {
        q: "What if we need changes after it is built?",
        a: "Most systems need them — the business changes and the software should follow. You can come back to us as things come up, or not. There is no retainer you have to keep paying to stay eligible.",
      },
      {
        q: "Can it work with the systems we already use?",
        a: "Usually. Most modern platforms have an API, and joining things up is often the highest-value part of the job — a lot of manual copying between systems exists only because nobody has connected them.",
      },
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
    faqs: [
      {
        q: "Do we have to sign a long contract?",
        a: "No. Some clients want one problem fixed and never need us again; others keep us available for years. Both are fine, and neither requires a notice period dressed up as a partnership.",
      },
      {
        q: "Can you help with a single problem rather than ongoing support?",
        a: "Yes. A good deal of our work is exactly that — something is broken or badly set up, we fix it, and you get on with running the business.",
      },
      {
        q: "We already have an IT provider. Is that a problem?",
        a: "No. We are often brought in alongside an existing provider for something specific, or for a second opinion before a decision. We will tell you honestly if we think your current arrangement is fine as it is.",
      },
      {
        q: "Do you support Macs as well as Windows?",
        a: "Yes, and mixed environments — which is what most small businesses actually have, whatever the policy says.",
      },
      {
        q: "What sort of things do you take on?",
        a: "Infrastructure and cloud that needs managing, Microsoft 365 and account problems, networks, security and compliance work, and the awkward technical decisions where a business wants an experienced opinion before spending money.",
      },
    ],
  },
];

export const bySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const others = (slug: string) => SERVICES.filter((s) => s.slug !== slug);
