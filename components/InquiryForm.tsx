'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, ArrowRight, Mail } from 'lucide-react';
import { submitInquiry, type InquiryState } from '@/app/actions/inquiry';

const businessSizes = ['Just me', '2–10', '11–50', '51–200', '200+'];
const timelines = ['ASAP', 'Next 1–3 months', '3–6 months', 'Just exploring'];

const initial: InquiryState = { status: 'idle' };

export function InquiryForm() {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const [businessSize, setBusinessSize] = useState(businessSizes[1]);
  const [timeline, setTimeline] = useState(timelines[0]);
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
        className="rounded-2xl border border-oak-500/30 dark:border-oak-400/30 bg-oak-400/10 dark:bg-oak-400/[0.04] p-10 md:p-14 text-center"
      >
        <div className="mx-auto h-14 w-14 rounded-full bg-oak-500 dark:bg-oak-400 text-ink-950 flex items-center justify-center mb-6">
          <Check size={26} strokeWidth={2.5} />
        </div>
        <h3 className="font-display text-3xl md:text-4xl text-ink-900 dark:text-parchment mb-3">
          Message received.
        </h3>
        <p className="text-ink-800/75 dark:text-parchment/70 max-w-md mx-auto leading-relaxed">
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
      className="rounded-2xl border border-ink-900/10 dark:border-parchment/10 bg-parchment dark:bg-ink-900/60 p-6 md:p-10 backdrop-blur-sm"
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
        <Field label="Company (optional)" name="company" placeholder="Acme Inc." />
      </div>

      <div className="mt-5">
        <Field
          label="What do you want to build, fix, or figure out?"
          name="project"
          as="textarea"
          rows={5}
          placeholder="A sentence or three is enough. The more specific, the sharper our reply."
          error={fieldErrors.project}
        />
      </div>

      <div className="mt-7 grid md:grid-cols-2 gap-7">
        <PillGroup
          label="Business size"
          name="businessSize"
          options={businessSizes}
          value={businessSize}
          onChange={setBusinessSize}
        />
        <PillGroup
          label="Timeline"
          name="timeline"
          options={timelines}
          value={timeline}
          onChange={setTimeline}
        />
      </div>

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

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-ink-900/10 dark:border-parchment/10">
        <p className="text-xs text-ink-800/55 dark:text-parchment/45 max-w-xs">
          We reply within one business day. No newsletter, no autoresponder spam.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center gap-3 rounded-full bg-oak-500 dark:bg-oak-400 hover:bg-oak-400 dark:hover:bg-oak-300 disabled:bg-oak-500/60 dark:disabled:bg-oak-400/60 disabled:cursor-not-allowed text-ink-950 px-7 py-4 text-base font-medium transition-colors"
        >
          {pending ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send inquiry
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-800/55 dark:text-parchment/40">
        <span>or email us directly:</span>
        <a
          href="mailto:hello@oakenit.com"
          className="inline-flex items-center gap-1 text-oak-600 dark:text-oak-300 hover:text-oak-500 dark:hover:text-oak-200 transition-colors"
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
    'w-full bg-parchment-50 dark:bg-ink-950/60 border border-ink-900/15 dark:border-parchment/15 rounded-lg px-4 py-3 text-ink-900 dark:text-parchment placeholder:text-ink-800/35 dark:placeholder:text-parchment/30 focus:outline-none focus:border-oak-500 dark:focus:border-oak-400 focus:ring-1 focus:ring-oak-500/40 dark:focus:ring-oak-400/40 transition-all';

  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.18em] text-ink-800/65 dark:text-parchment/55 mb-2">
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

function PillGroup({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <span className="block text-xs uppercase tracking-[0.18em] text-ink-800/65 dark:text-parchment/55 mb-3">
        {label}
      </span>
      <input type="hidden" name={name} value={value} />
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`rounded-full text-sm px-4 py-2 border transition-colors ${
                active
                  ? 'bg-oak-500 dark:bg-oak-400 text-ink-950 border-oak-500 dark:border-oak-400'
                  : 'bg-transparent text-ink-800/75 dark:text-parchment/70 border-ink-900/15 dark:border-parchment/15 hover:border-oak-500/60 dark:hover:border-oak-400/60 hover:text-ink-900 dark:hover:text-parchment'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
