import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/config/site';
import TopicPage from '@/components/TopicPage';

export const dynamicParams = false;

const TOPICS = ['como-llegar', 'fotos', 'historia', 'san-francisco-y-aranzazu'];

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
  const t = messages?.topics?.[topic];
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
      siteName: siteConfig.name,
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
  const topicData = messages?.topics?.[topic];

  return <TopicPage locale={locale} slug={topic} topic={topicData} />;
}
