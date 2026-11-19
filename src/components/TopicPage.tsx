import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';
import { allTopicSlugs, seoTopics, topicKeys } from '@/data/seoTopics';
import { nearbySlugs, nearbyTopics } from '@/data/nearbyTopics';
import VerifiedPhoto from './VerifiedPhoto';
import NearbyDetailSections from './NearbyDetailSections';

interface TopicContent {
  title: string;
  description: string;
  intro?: string;
  galleryIntro?: string;
  captions?: string[];
  sections?: { heading: string; body: string }[];
  faq?: { q: string; a: string }[];
  image?: string;
  imageSource?: string;
  mapsUrl?: string;
  sourceUrl?: string;
  localName?: string;
  address?: string;
  management?: string;
  category?: string;
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
  const ui = useTranslations('ui');
  const tRoot = useTranslations();
  const topicNote = tRoot('topicNote');

  if (!topic) return null;

  const isGallery = slug === 'fotos';
  const galleryCount = 17;
  const isNearby = nearbySlugs.includes(slug);
  const isExpanded = isNearby && slug !== 'templo-san-francisco-asis' && slug !== 'capilla-aranzazu';
  const management = isNearby ? topic.sections?.find((section) => /^(Gestión y conservación|Management and conservation|管理与保护|管理与文物保护|管理与维护|Management and care)$/.test(section.heading)) : undefined;
  const nearbySections = isNearby ? topic.sections?.filter((section) => section !== management) : topic.sections;

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

          {isNearby && (
            <div className="flex flex-wrap gap-3 mb-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span className="rounded-full px-3 py-1" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>Guadalajara · Jalisco</span>
              <span className="rounded-full px-3 py-1" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                {isExpanded ? topic.category : locale === 'zh' ? '历史宗教建筑' : locale === 'es' ? 'Monumento religioso histórico' : 'Historic religious landmark'}
              </span>
              <a className="rounded-full px-3 py-1 underline underline-offset-4" style={{ background: 'var(--card-bg)', color: 'var(--accent)', border: '1px solid var(--border-color)' }} href={topic.mapsUrl} target="_blank" rel="noopener noreferrer">
                Google Maps
              </a>
            </div>
          )}

          {topic.intro && (
            <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
              {topic.intro}
            </p>
          )}

          {topic.image && (
            <VerifiedPhoto src={topic.image} alt={topic.title} source={topic.imageSource} locale={locale} />
          )}

          {isNearby && (
            <section className="rounded-xl p-6 mb-10" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <h2 className="font-display text-2xl font-semibold mb-3">{locale === 'zh' ? `关于${topic.localName}` : locale === 'es' ? `Sobre ${topic.localName}` : `About ${topic.localName}`}</h2>
              <p className="leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {topic.management || (locale === 'zh'
                  ? `${topic.localName}是瓜达拉哈拉旧城区的重要宗教历史建筑，也是原方济各会修院建筑群历史的一部分。墨西哥联邦文化部门负责历史古迹的法定保护与相关文物资料记录；宗教管理方负责日常礼拜及内部开放安排。`
                  : locale === 'es'
                    ? `${topic.localName} forma parte del patrimonio religioso del Centro Histórico de Guadalajara y de la memoria del antiguo conjunto franciscano. La autoridad cultural federal documenta y protege su carácter de monumento histórico; la administración religiosa organiza el culto y el acceso cotidiano al interior.`
                    : `${topic.localName} is part of Guadalajara’s historic religious heritage and the former Franciscan complex. The federal cultural authority documents and protects its historic-monument status, while religious administrators oversee worship and everyday interior access.`)}
              </p>
              {management && <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{management.body}</p>}
              {topic.sourceUrl && <a className="block mt-4 text-sm underline underline-offset-4" style={{ color: 'var(--accent)' }} href={topic.sourceUrl} target="_blank" rel="noopener noreferrer">{isExpanded ? locale === 'zh' ? '官方景点资料' : locale === 'es' ? 'Información turística municipal' : 'Municipal visitor information' : locale === 'zh' ? '历史建筑资料来源' : locale === 'es' ? 'Ficha patrimonial de referencia' : 'Heritage documentation'}</a>}
            </section>
          )}

          {isNearby && (
            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold mb-4">{locale === 'zh' ? '基本信息' : locale === 'es' ? 'Datos básicos' : 'Basic information'}</h2>
              <dl className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
                {[
                  [locale === 'zh' ? '景点名称' : locale === 'es' ? 'Nombre' : 'Name', topic.localName],
                  [locale === 'zh' ? '所在地' : locale === 'es' ? 'Ubicación' : 'Location', 'Guadalajara, Jalisco, México'],
                  [locale === 'zh' ? '地址' : locale === 'es' ? 'Dirección' : 'Address', topic.address],
                  [locale === 'zh' ? '开放与门票' : locale === 'es' ? 'Horarios y entrada' : 'Hours and admission', locale === 'zh' ? '外观可从公共空间观赏；内部以现场安排为准' : locale === 'es' ? 'Exterior visible desde el espacio público; interior según apertura local' : 'Exterior viewable from public space; interior access varies'],
                ].map(([name, value]) => <div key={name} className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-4" style={{ borderBottom: '1px solid var(--border-color)' }}><dt className="font-semibold text-sm">{name}</dt><dd className="sm:col-span-2 text-sm" style={{ color: 'var(--text-secondary)' }}>{value}</dd></div>)}
              </dl>
            </section>
          )}

          {topic.mapsUrl && (
            <section className="rounded-xl p-5 mb-10" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <h2 className="font-display text-xl font-semibold mb-3">{locale === 'zh' ? '地点、评价与交通' : locale === 'es' ? 'Ubicación, reseñas y transporte' : 'Location, reviews and transport'}</h2>
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                {locale === 'zh' ? '评分和评价数量会随时间变化，请在该地点专属 Google 地图页面查看最新数据。' : locale === 'es' ? 'La puntuación y el número de reseñas varían; consulta los datos actuales de este lugar en Google Maps.' : 'Ratings and review counts change; see the latest figures for this specific place on Google Maps.'}
              </p>
              <a className="underline text-sm" style={{ color: 'var(--accent)' }} href={topic.mapsUrl} target="_blank" rel="noopener noreferrer">Google Maps · {topic.title}</a>
              {topic.sourceUrl && <p className="mt-3 text-sm"><a className="underline" style={{ color: 'var(--accent)' }} href={topic.sourceUrl} target="_blank" rel="noopener noreferrer">{isExpanded ? locale === 'zh' ? '参考资料：瓜达拉哈拉市旅游部门' : locale === 'es' ? 'Fuente: Turismo de Guadalajara' : 'Source: Guadalajara Tourism' : locale === 'zh' ? '历史与管理资料来源：墨西哥文化部门' : locale === 'es' ? 'Fuente patrimonial: Secretaría de Cultura' : 'Heritage source: Mexican Ministry of Culture'}</a></p>}
            </section>
          )}

          {isNearby && !isExpanded && <NearbyDetailSections locale={locale} slug={slug} />}

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
              {isNearby && <h2 className="font-display text-2xl font-semibold">{locale === 'zh' ? '更多历史与实用资料' : locale === 'es' ? 'Más historia e información práctica' : 'Further history and practical information'}</h2>}
              {nearbySections?.map((section, idx) => (
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
                {ui('faq')}
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

          {isNearby && (
            <section className="mt-12 pt-8" style={{borderTop:'1px solid var(--border-color)'}}>
              <h2 className="font-display text-2xl font-semibold mb-5">{locale === 'zh' ? '继续探索周边景点' : locale === 'es' ? 'Sigue explorando lugares cercanos' : 'Explore more nearby places'}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {nearbySlugs.filter((other) => other !== slug).map((other) => (
                  <a key={other} href={`/${locale}/${other}`} className="rounded-lg px-4 py-3 text-sm font-medium hover:underline" style={{background:'var(--card-bg)',border:'1px solid var(--border-color)',color:'var(--text-primary)'}}>
                    {nearbyTopics[locale]?.[other]?.localName} →
                  </a>
                ))}
              </div>
            </section>
          )}

          <section className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border-color)' }}>
            <h2 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              {locale === 'es' ? 'Más guías del lugar' : locale === 'zh' ? '继续探索双教堂' : 'More local guides'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {[...allTopicSlugs, ...nearbySlugs].filter((s) => s !== slug).map((s) => {
                const key = topicKeys[s];
                const extra = seoTopics[locale as keyof typeof seoTopics] || seoTopics.es;
                const label = key ? tRoot(`topics.${key}.title`) : nearbyTopics[locale]?.[s]?.title || (extra as Record<string, { title: string }>)[s]?.title;
                return <a key={s} className="text-sm underline underline-offset-4" style={{ color: 'var(--accent)' }} href={`/${locale}/${s}`}>{label}</a>;
              })}
            </div>
            <a className="inline-block text-sm mt-6 underline underline-offset-4" style={{ color: 'var(--accent)' }} href={siteConfig.mapsShareUrl} target="_blank" rel="noopener noreferrer">{ui('mapsName')}</a>
          </section>

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
