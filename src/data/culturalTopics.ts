import stops from './culturalStops.json';

const labels = {
  es: { museum: 'Museo', stage: 'Teatro', route: 'Recorrido a pie', access: '¿Cuándo puedo entrar y cuánto cuesta?', manager: '¿Qué institución se encarga del recinto?' },
  en: { museum: 'Museum', stage: 'Theatre', route: 'Walking route', access: 'When can I enter and what does admission cost?', manager: 'Who manages the venue?' },
  zh: { museum: '博物馆', stage: '剧院', route: '步行游线', access: '什么时候可以入内，参观如何收费？', manager: '哪家机构负责管理场馆？' },
};

export const culturalSlugs = stops.map((stop) => stop.slug);

export function culturalTopics(locale: keyof typeof labels) {
  const label = labels[locale];
  return Object.fromEntries(stops.map((stop) => {
    const copy = stop.locales[locale];
    return [stop.slug, {
      title: copy.title,
      description: copy.intro.split(/(?<=[.!?。])\s*/u)[0],
      intro: copy.intro,
      localName: stop.localName,
      address: stop.address,
      image: stop.image,
      imageSource: stop.sourceUrl,
      sourceUrl: stop.sourceUrl,
      mapsUrl: stop.mapsUrl,
      category: stop.isStage ? label.stage : label.museum,
      management: copy.management,
      visitAdvice: copy.access,
      sections: [{ heading: label.route, body: copy.route }],
      faq: [
        { q: copy.question, a: copy.answer },
        { q: label.access, a: copy.access },
        { q: label.manager, a: copy.management },
      ],
    }];
  }));
}
