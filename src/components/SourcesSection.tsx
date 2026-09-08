import { useTranslations } from 'next-intl';

/**
 * SourcesSection：E-E-A-T 资料来源板块，罗列官方权威（.gob / 官方机构）外链。
 */
export default function SourcesSection() {
  const t = useTranslations('sources');
  const items = t.raw('items') as Array<{ name: string; url: string }>;

  return (
    <section id="sources" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p
          className="leading-relaxed mb-8 max-w-3xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('intro')}
        </p>

        <ul className="space-y-3 max-w-3xl">
          {items.map((item, i) => (
            <li key={i}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium rounded-lg px-4 py-3 transition-colors hover:opacity-80"
                style={{
                  color: 'var(--accent)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
