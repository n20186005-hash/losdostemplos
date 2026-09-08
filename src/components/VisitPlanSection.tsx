'use client';

import { useTranslations, useMessages } from 'next-intl';

type CrowdItem = { title: string; duration: string; points: string[] };

const crowdIcons = ['👨‍👩‍👧', '📷', '♿'];

export default function VisitPlanSection() {
  const t = useTranslations('itineraries');
  const messages = useMessages() as any;
  const halfDaySteps = (messages?.itineraries?.halfDay?.steps || []) as string[];
  const fullDaySteps = (messages?.itineraries?.fullDay?.steps || []) as string[];
  const crowdItems = (messages?.itineraries?.crowdItems || []) as CrowdItem[];

  return (
    <section id="itineraries" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('intro')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {/* 半日 / 全日 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <RouteCard steps={halfDaySteps} title={messages?.itineraries?.halfDay?.title || ''} />
          <RouteCard steps={fullDaySteps} title={messages?.itineraries?.fullDay?.title || ''} />
        </div>

        {/* 按人群定制 */}
        <h3 className="font-display text-2xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
          {t('crowdTitle')}
        </h3>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('crowdNote')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {crowdItems.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-6 flex flex-col"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <span className="text-3xl mb-3" aria-hidden="true">{crowdIcons[i]}</span>
              <h4 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h4>
              <p className="text-xs font-medium mb-4 py-1 px-3 inline-block self-start rounded-full" style={{ background: 'var(--tag-bg)', color: 'var(--accent)' }}>
                {item.duration}
              </p>
              <ul className="space-y-2.5 text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                {item.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 中立声明 */}
        <div className="rounded-xl p-6" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t('neutralNote')}</p>
        </div>
      </div>
    </section>
  );
}

function RouteCard({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="rounded-xl p-6 sm:p-7" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
      <h4 className="font-display text-xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h4>
      <ol className="space-y-4">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
              style={{ background: 'var(--accent)', color: 'white' }}
            >
              {i + 1}
            </span>
            <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
