import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HistoryTimeline from '@/components/HistoryTimeline';
import WeatherSection from '@/components/WeatherSection';
import SeasonsSection from '@/components/SeasonsSection';
import RouteSection from '@/components/RouteSection';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import TopicLinks from '@/components/TopicLinks';
import VisitPlanSection from '@/components/VisitPlanSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import EducationSection from '@/components/EducationSection';
import FaqSection from '@/components/FaqSection';
import MapEmbed from '@/components/MapEmbed';
import SourcesSection from '@/components/SourcesSection';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/site';

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type FaqItem = { q: string; a: string };

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await import(`@/messages/${locale}.json`)).default;
  const faqItems = (messages?.faq?.items || []) as FaqItem[];
  const crumbs = (messages?.intro?.breadcrumb?.items || []) as string[];
  const url = siteConfig.url;
  const homeUrl = `${url}/${locale}`;

  /* 1. TouristAttraction 结构化数据（带 @id / image / isAccessibleForFree） */
  const attractionSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${url}/#attraction`,
    name: siteConfig.fullName,
    alternateName: [
      siteConfig.shortName,
      `${siteConfig.city} ${siteConfig.fullName}`,
      'Templo de San Francisco de Asís',
      'Templo de Nuestra Señora de Aránzazu',
    ],
    additionalType: [
      'https://schema.org/Church',
      'https://schema.org/LandmarksOrHistoricalBuildings',
    ],
    description: (messages?.meta?.description as string) || siteConfig.fullName,
    url,
    image: [`${url}/images/hero.jpg`],
    isAccessibleForFree: true,
    // 引用 Google 地图上的真实用户评分（正文 Hero / 评价板块同步展示，并链接 Google Maps 作为出处）
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteConfig.rating,
      bestRating: 5,
      worstRating: 1,
      reviewCount: Number(siteConfig.reviewCount.replace(/[^\d]/g, '')),
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.fullName,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.stateProvince,
      postalCode: siteConfig.postalCode,
      addressCountry: siteConfig.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.latitude,
      longitude: siteConfig.longitude,
    },
    hasMap: siteConfig.mapsShareUrl,
    sameAs: [siteConfig.mapsShareUrl, siteConfig.govtTourismUrl],
  };

  /* 4.2 地理面包屑结构化数据 */
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((name, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      ...(index === 0 ? { item: homeUrl } : {}),
    })),
  };

  /* FAQ 结构化数据（与正文 FAQ 板块一一对应，用于抢 Featured Snippet） */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <JsonLd data={attractionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <Header />
      <main>
        <Hero />
        <Intro />
        <TopicLinks />
        <BasicInfo />
        <HistoryTimeline />
        <WeatherSection />
        <SeasonsSection />
        <RouteSection />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <VisitPlanSection />
        <FacilitiesSection />
        <Gallery />
        <Reviews />
        <EducationSection />
        <FaqSection />
        <MapEmbed />
        <SourcesSection />
      </main>
      <Footer />
    </>
  );
}
