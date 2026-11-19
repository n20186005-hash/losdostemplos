import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/config/site';
import TopicPage from '@/components/TopicPage';
import { allTopicSlugs, seoTopics, topicKeys } from '@/data/seoTopics';
import { nearbySlugs, nearbyTopics } from '@/data/nearbyTopics';

export const dynamicParams = false;

const TOPICS = [...allTopicSlugs, ...nearbySlugs];

function getTopic(messages: any, locale: string, slug: string) {
  const extra = seoTopics[locale as keyof typeof seoTopics];
  return nearbyTopics[locale]?.[slug] || (extra as Record<string, unknown> | undefined)?.[slug] || messages?.topics?.[topicKeys[slug]];
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    TOPICS.map((topic) => ({ locale, topic }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}): Promise<Metadata> {
  const { locale, topic } = await params;
  if (!TOPICS.includes(topic)) return {};

  const messages = (await import(`@/messages/${locale}.json`)).default as any;
  const t = getTopic(messages, locale, topic) as { title: string; description: string } | undefined;
  if (!t) return {};

  const url = `${siteConfig.url}/${locale}/${topic}`;
  const languages: Record<string, string> = {
    es: `${siteConfig.url}/es/${topic}`,
    zh: `${siteConfig.url}/zh/${topic}`,
    en: `${siteConfig.url}/en/${topic}`,
    'x-default': `${siteConfig.url}/es/${topic}`,
  };

  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: url, languages },
    openGraph: {
      title: t.title,
      description: t.description,
      url,
      siteName: siteConfig.fullName,
      locale,
      type: 'article',
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}) {
  const { locale, topic } = await params;
  if (!TOPICS.includes(topic)) notFound();
  setRequestLocale(locale);

  const messages = (await import(`@/messages/${locale}.json`)).default as any;
  const topicData = getTopic(messages, locale, topic) as any;

  return <TopicPage locale={locale} slug={topic} topic={topicData} />;
}
