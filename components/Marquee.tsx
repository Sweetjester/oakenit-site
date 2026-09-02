'use client';

const items = [
  'OpenAI',
  'Anthropic',
  'AWS',
  'Azure',
  'GCP',
  'Cloudflare',
  'Kubernetes',
  'Terraform',
  'PostgreSQL',
  'Snowflake',
  'Databricks',
  'LangChain',
  'Next.js',
  'Stripe',
  'Vercel',
  'Datadog',
];

export function Marquee() {
  return (
    <section className="relative py-14 border-y border-forest-900/10 dark:border-cream-100/10 bg-cream-100 dark:bg-forest-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-forest-800/45 dark:text-cream-100/40">
          Where we work
        </p>
      </div>

      <div
        className="relative"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="marquee-track">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="mx-8 font-display font-bold text-3xl md:text-5xl tracking-[-0.03em] text-forest-900/30 dark:text-cream-100/30 hover:text-leaf-600 dark:hover:text-leaf-300 transition-colors whitespace-nowrap"
            >
              {item}
              <span className="ml-8 text-leaf-500/60 dark:text-leaf-300/50">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
