import { useLocale, useTranslations } from 'next-intl';

export default function TopicLinks() {
  const locale = useLocale();
  const t = useTranslations('topics');

  const items = [
    { slug: 'como-llegar', title: t('comoLlegar.title'), desc: t('comoLlegar.description') },
    { slug: 'fotos', title: t('fotos.title'), desc: t('fotos.description') },
    { slug: 'historia', title: t('historia.title'), desc: t('historia.description') },
    {
      slug: 'san-francisco-y-aranzazu',
      title: t('sanFranciscoYaranzazu.title'),
      desc: t('sanFranciscoYaranzazu.description'),
    },
  ];

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-2xl sm:text-3xl font-semibold mb-8"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('moreGuides')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <a
              key={item.slug}
              href={`/${locale}/${item.slug}`}
              className="group block rounded-xl p-5 transition-all hover:-translate-y-0.5"
              style={{
                background: 'var(--card-bg)',
                boxShadow: 'var(--card-shadow)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <h3
                  className="font-display text-lg font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h3>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color: 'var(--accent)' }}
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {item.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
