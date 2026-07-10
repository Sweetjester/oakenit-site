import { Logo } from './Logo';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-900/10 dark:border-parchment/10 bg-parchment-50 dark:bg-ink-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Logo size={32} />
            <p className="mt-6 text-ink-800/65 dark:text-parchment/55 max-w-sm leading-relaxed">
              Senior engineers and architects, on call. We build software, run
              infrastructure, and answer the hard questions.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-ink-800/50 dark:text-parchment/40 mb-5">
              What we do
            </h4>
            <ul className="space-y-3 text-ink-800/80 dark:text-parchment/70">
              <li><a href="#services" className="hover:text-oak-600 dark:hover:text-oak-300 transition-colors">Development</a></li>
              <li><a href="#services" className="hover:text-oak-600 dark:hover:text-oak-300 transition-colors">Systems &amp; infrastructure</a></li>
              <li><a href="#services" className="hover:text-oak-600 dark:hover:text-oak-300 transition-colors">Consulting</a></li>
              <li><a href="#process" className="hover:text-oak-600 dark:hover:text-oak-300 transition-colors">How we work</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-ink-800/50 dark:text-parchment/40 mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-ink-800/80 dark:text-parchment/70">
              <li>
                <a
                  href="mailto:hello@oakenit.com"
                  className="hover:text-oak-600 dark:hover:text-oak-300 transition-colors"
                >
                  hello@oakenit.com
                </a>
              </li>
              <li>
                <a href="https://oakenit.com" className="hover:text-oak-600 dark:hover:text-oak-300 transition-colors">
                  oakenit.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline my-12" />

        <div className="flex flex-col md:flex-row justify-between gap-4 text-sm text-ink-800/50 dark:text-parchment/40">
          <p>© {year} OakenIT. All rights reserved.</p>
          <p className="font-mono text-xs">
            <span className="text-oak-500 dark:text-oak-400">●</span> All systems sweet
          </p>
        </div>
      </div>
    </footer>
  );
}
