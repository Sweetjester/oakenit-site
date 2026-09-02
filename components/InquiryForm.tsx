'use client';

import { useActionState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, ArrowRight, Mail } from 'lucide-react';
import { submitInquiry, type InquiryState } from '@/app/actions/inquiry';
import { Turnstile } from './Turnstile';

const initial: InquiryState = { status: 'idle' };

export function InquiryForm() {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  if (state.status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl border border-leaf-500/30 dark:border-leaf-300/25 bg-leaf-400/10 dark:bg-leaf-300/[0.06] p-10 md:p-14 text-center"
      >
        <div className="mx-auto h-14 w-14 rounded-full bg-forest-700 dark:bg-leaf-300 text-cream-50 dark:text-forest-950 flex items-center justify-center mb-6">
          <Check size={26} strokeWidth={2.5} />
        </div>
        <h3 className="font-display font-bold text-2xl md:text-3xl tracking-[-0.03em] text-forest-800 dark:text-cream-100 mb-3">
          Message received.
        </h3>
        <p className="text-forest-800/75 dark:text-cream-100/70 max-w-md mx-auto leading-relaxed">
          We&rsquo;ll reply within one business day with three questions and a calendar
          link. Check your spam folder if it&rsquo;s quiet for too long.
        </p>
      </motion.div>
    );
  }

  const fieldErrors = state.status === 'error' ? state.fieldErrors ?? {} : {};

  return (
    <form
      ref={formRef}
      action={action}
      className="rounded-2xl border border-forest-900/12 dark:border-cream-100/10 bg-cream-100/80 dark:bg-forest-900/60 p-6 md:p-10 backdrop-blur-sm"
    >
      {/* Honeypot — hidden from humans */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <input type="hidden" name="startedAt" value={startedAt.current} />

      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Your name" name="name" placeholder="Jane Doe" error={fieldErrors.name} />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="jane@company.com"
          error={fieldErrors.email}
        />
      </div>

      <div className="mt-5">
        <Field label="Company (optional)" name="company" placeholder="Acme Ltd." />
      </div>

      <div className="mt-5">
        <Field
          label="What can we help with?"
          name="project"
          as="textarea"
          rows={5}
          placeholder="A sentence or two is plenty. What’s not working, or what are you trying to build?"
          error={fieldErrors.project}
        />
      </div>

      {process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY && (
        <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY} />
      )}

      <AnimatePresence>
        {state.status === 'error' && state.message && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-sm text-red-700 dark:text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3"
          >
            {state.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-forest-900/10 dark:border-cream-100/10">
        <p className="text-xs text-forest-800/55 dark:text-cream-100/45 max-w-xs">
Free initial conversation. We reply within one business day — no newsletter,
          no autoresponder spam.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center gap-3 rounded-full bg-forest-700 dark:bg-leaf-300 hover:bg-forest-600 dark:hover:bg-leaf-200 disabled:opacity-60 disabled:cursor-not-allowed text-cream-50 dark:text-forest-950 px-7 py-4 text-base font-medium transition-colors"
        >
          {pending ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Talk to OakenIT
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-forest-800/55 dark:text-cream-100/40">
        <span>or email us directly:</span>
        <a
          href="mailto:hello@oakenit.com"
          className="inline-flex items-center gap-1 text-forest-600 dark:text-leaf-200 hover:text-leaf-600 dark:hover:text-leaf-100 transition-colors"
        >
          <Mail size={12} />
          hello@oakenit.com
        </a>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  as?: 'input' | 'textarea';
  rows?: number;
  error?: string;
};

function Field({ label, name, type = 'text', placeholder, as = 'input', rows = 4, error }: FieldProps) {
  const baseClasses =
    'w-full bg-cream-50 dark:bg-forest-950/60 border border-forest-900/15 dark:border-cream-100/15 rounded-lg px-4 py-3 text-forest-900 dark:text-cream-100 placeholder:text-forest-800/35 dark:placeholder:text-cream-100/30 focus:outline-none focus:border-leaf-500 dark:focus:border-leaf-300 focus:ring-1 focus:ring-leaf-500/40 dark:focus:ring-leaf-300/40 transition-all';

  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.18em] text-forest-800/65 dark:text-cream-100/55 mb-2">
        {label}
      </span>
      {as === 'textarea' ? (
        <textarea
          name={name}
          rows={rows}
          placeholder={placeholder}
          className={`${baseClasses} resize-none ${error ? 'border-red-400/70' : ''}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={`${baseClasses} ${error ? 'border-red-400/70' : ''}`}
        />
      )}
      {error && <span className="block mt-1.5 text-xs text-red-600 dark:text-red-300">{error}</span>}
    </label>
  );
}
