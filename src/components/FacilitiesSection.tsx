'use client';

import { useTranslations, useMessages } from 'next-intl';

type FacilityItem = { title: string; text: string };

const icons = ['🚻', '🅿️', '🍽️', '🏨', '🛒', '⛽'];

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const items = (messages?.facilities?.items || []) as FacilityItem[];
  const tips = (messages?.facilities?.tips || []) as string[];

  return (
    <section id="facilities" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-6 flex items-start gap-4"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <span className="text-3xl flex-shrink-0" aria-hidden="true">{icons[i % icons.length]}</span>
              <div>
                <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl p-6 sm:p-8" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}>
          <h3 className="font-display text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            {t('tipsTitle')}
          </h3>
          <ul className="space-y-2.5">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
