'use client';

import { useTranslations, useMessages } from 'next-intl';

type EduBlock = { title: string; points: string[] };

const icons = ['🏛️', '🙏', '🛡️'];

export default function EducationSection() {
  const t = useTranslations('education');
  const messages = useMessages() as any;
  const blocks = (messages?.education?.blocks || []) as EduBlock[];

  return (
    <section id="education" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blocks.map((block, i) => (
            <div
              key={i}
              className="rounded-xl p-6"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <span className="text-3xl mb-3 block" aria-hidden="true">{icons[i]}</span>
              <h3 className="font-display text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                {block.title}
              </h3>
              <ul className="space-y-3">
                {block.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
