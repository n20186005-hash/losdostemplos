'use client';

import { useTranslations, useMessages } from 'next-intl';

type Row = { season: string; months: string; weather: string; crowds: string; tip: string };

export default function SeasonsSection() {
  const t = useTranslations('seasons');
  const messages = useMessages() as any;
  const rows = (messages?.seasons?.rows || []) as Row[];
  const cols = messages?.seasons?.cols as Row;

  return (
    <section id="seasons" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="rounded-xl p-4 mb-6 text-sm leading-relaxed" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
          {t('note')}
        </div>

        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-sm min-w-[720px]" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr>
                {(['season', 'months', 'weather', 'crowds', 'tip'] as const).map((key) => (
                  <th
                    key={key}
                    className="text-left font-semibold px-4 py-3 first:rounded-l-xl last:rounded-r-xl"
                    style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                  >
                    {cols?.[key] || ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td className="px-4 py-4 font-semibold align-top" style={{ color: 'var(--accent)', borderBottom: '1px solid var(--border-color)' }}>
                    {row.season}
                  </td>
                  <td className="px-4 py-4 align-top whitespace-nowrap" style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)' }}>
                    {row.months}
                  </td>
                  <td className="px-4 py-4 align-top" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                    {row.weather}
                  </td>
                  <td className="px-4 py-4 align-top" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                    {row.crowds}
                  </td>
                  <td className="px-4 py-4 align-top" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                    {row.tip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
