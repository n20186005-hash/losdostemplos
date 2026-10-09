import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';

interface TopicContent {
  title: string;
  description: string;
  intro?: string;
  galleryIntro?: string;
  captions?: string[];
  sections?: { heading: string; body: string }[];
  faq?: { q: string; a: string }[];
}

function TopicJsonLd({ topic, locale, slug }: { topic: TopicContent; locale: string; slug: string }) {
  const pageUrl = `${siteConfig.url}/${locale}/${slug}`;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: topic.title,
      description: topic.description,
      inLanguage: locale,
      isPartOf: { '@type': 'WebSite', '@id': `${siteConfig.url}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/${locale}` },
          { '@type': 'ListItem', position: 2, name: topic.title, item: pageUrl },
        ],
      },
    },
  ];

  if (topic.faq && topic.faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: topic.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  const schema = { '@context': 'https://schema.org', '@graph': graph };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function TopicPage({
  locale,
  slug,
  topic,
}: {
  locale: string;
  slug: string;
  topic: TopicContent;
}) {
  const tHeader = useTranslations('header');
  const tRoot = useTranslations();
  const topicNote = tRoot('topicNote');

  if (!topic) return null;

  const isGallery = slug === 'fotos';
  const galleryCount = 17;

  return (
    <>
      <TopicJsonLd topic={topic} locale={locale} slug={slug} />
      <main className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
        <div className="max-w-3xl mx-auto px-5 py-12 sm:py-16">
          <a
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 text-sm mb-8 transition-opacity hover:opacity-70"
            style={{ color: 'var(--text-muted)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            {tHeader('backToHome')}
          </a>

          <h1
            className="font-display text-3xl sm:text-4xl font-semibold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {topic.title}
          </h1>

          {topic.intro && (
            <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
              {topic.intro}
            </p>
          )}

          {isGallery ? (
            <>
              {topic.galleryIntro && (
                <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
                  {topic.galleryIntro}
                </h2>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Array.from({ length: galleryCount }).map((_, i) => (
                  <figure key={i} className="overflow-hidden rounded-lg" style={{ border: '1px solid var(--border-color)' }}>
                    <img
                      src={`/gallery/los-dos-templos-guadalajara-${i + 1}.jpg`}
                      alt={topic.captions?.[i] || `${topic.title} ${i + 1}`}
                      loading="lazy"
                      className="w-full h-32 sm:h-40 object-cover"
                    />
                    {topic.captions?.[i] && (
                      <figcaption className="text-xs p-2" style={{ color: 'var(--text-muted)' }}>
                        {topic.captions[i]}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-8 mb-12">
              {topic.sections?.map((section, idx) => (
                <section key={idx}>
                  <h2 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {section.heading}
                  </h2>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          )}

          {topic.faq && topic.faq.length > 0 && (
            <section className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border-color)' }}>
              <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
                FAQ
              </h2>
              <div className="space-y-6">
                {topic.faq.map((f, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                      {f.q}
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {f.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {topicNote && (
            <p className="text-xs mt-12" style={{ color: 'var(--text-muted)' }}>
              {topicNote}
            </p>
          )}
        </div>
      </main>
    </>
  );
}
