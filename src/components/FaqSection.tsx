import { useTranslations } from 'next-intl';

/**
 * FAQ 板块：正文可见的常见问题（与页面 FAQPage JSON-LD 内容一一对应）。
 */
export default function FaqSection() {
  const t = useTranslations('faq');
  const items = t.raw('items') as Array<{ q: string; a: string }>;

  return (
    <section id="faq" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-4">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl overflow-hidden"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer p-5 sm:p-6 list-none select-none">
                <h3
                  className="font-display text-base sm:text-lg font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.q}
                </h3>
                <span
                  className="flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                  style={{ color: 'var(--accent)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </summary>
              <p
                className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
