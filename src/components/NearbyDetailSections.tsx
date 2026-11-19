import { nearbyTopics } from '@/data/nearbyTopics';

const detailText = {
  es: {
    visit: 'Consejos para la visita', highlights: 'Por qué merece la visita', opening: 'Horarios de apertura', tickets: 'Precios y entrada', transport: 'Cómo llegar', discovery: 'Descubre su valor', route: 'Recorrido recomendado', guidelines: 'Antes de entrar', photos: 'Puntos para fotografías', lodging: 'Dónde alojarse', reviews: 'Opiniones de visitantes', map: 'Guía de ubicación', original: 'Más información histórica y práctica',
    visitBody: 'Reserva aproximadamente 30–60 minutos para contemplar el exterior, comparar las fachadas de ambos templos y detenerte en el jardín. Para observar interiores, deja margen adicional y comprueba primero si hay ceremonias religiosas.',
    highlightsBody: 'Fíjate en la relación entre los edificios religiosos y los espacios públicos abiertos tras la transformación del antiguo convento. Compara las proporciones, el tratamiento de la piedra y las formas barrocas de cada templo.',
    openingBody: 'La fachada se puede observar desde el espacio público. La apertura interior y los horarios de culto dependen de la administración religiosa y pueden variar por celebraciones, mantenimiento y días festivos.',
    ticketsBody: 'La observación exterior desde la calle o el jardín no requiere entrada. No se indica una tarifa interior fija porque no se dispone de una confirmación actualizada del templo.',
    transportBody: 'Desde el Centro Histórico, camina hacia el entorno de avenida 16 de Septiembre y Miguel Blanco / Revolución. Si usas autobús, revisa el sentido y la parada actual: T15 y T15/C05 (231-A) aparecen en listados de la zona, pero las rutas pueden cambiar.',
    guidelinesBody: 'Respeta misas y actividades religiosas, no bloquees puertas ni zonas de paso, evita el flash en interiores y sigue cualquier indicación sobre fotografía o acceso. Lleva agua y calzado cómodo para caminar por el centro.',
    lodgingBody: 'Para visitar varios monumentos a pie, busca alojamiento en el Centro Histórico o cerca de sus corredores de transporte. Antes de reservar, compara distancia real caminando, accesibilidad, ruido nocturno y horarios de llegada.',
    reviewsBody: 'Consulta valoraciones y reseñas recientes en el enlace de Google Maps de este templo específico. La puntuación y el total de opiniones cambian; no deben confundirse con la valoración conjunta de “Los Dos Templos”.',
    mapBody: 'Usa el nombre propio y la dirección de este templo para iniciar la navegación. Verifica la entrada peatonal y posibles cierres alrededor de la plaza antes de salir.',
  },
  en: {
    visit: 'Visitor tips', highlights: 'What makes it special', opening: 'Opening hours', tickets: 'Admission and tickets', transport: 'Getting here', discovery: 'Explore its significance', route: 'Suggested walking route', guidelines: 'Visitor guidelines', photos: 'Photo viewpoints', lodging: 'Where to stay', reviews: 'Visitor reviews', map: 'Location and directions', original: 'More history and practical details',
    visitBody: 'Set aside roughly 30–60 minutes to view the exterior, compare both churches and pause in the public garden. Allow extra time for interiors and check for religious services before entering.',
    highlightsBody: 'Notice how the historic religious buildings relate to the public spaces created after the former convent was transformed. Compare proportions, stonework and the distinct Baroque elements of each building.',
    openingBody: 'The exterior is visible from public space. Interior opening and service times are set by the religious administration and may vary for celebrations, maintenance or holidays.',
    ticketsBody: 'There is no charge to view the exterior from the street or garden. An interior admission amount is not stated without a current confirmation from the site.',
    transportBody: 'Walk from Guadalajara’s historic centre towards Avenida 16 de Septiembre near Miguel Blanco / Revolución. For buses, check current stops and travel direction; T15 and T15/C05 (231-A) appear in area transit listings, but services can change.',
    guidelinesBody: 'Respect worship and ceremonies, keep entrances clear, avoid flash photography indoors and follow posted access or photography restrictions. Carry water and wear comfortable shoes for the historic centre.',
    lodgingBody: 'Accommodation in the historic centre or close to public transport corridors can work well for a multi-site walking visit. Compare actual walking distances, accessibility, evening noise and arrival arrangements before booking.',
    reviewsBody: 'Use the link to this exact church on Google Maps for current ratings and comments. Review counts change, and should not be confused with the combined Los Dos Templos place listing.',
    mapBody: 'Navigate using the individual building name and address. Check the pedestrian entrance and any temporary street closures before departing.',
  },
  zh: {
    visit: '游览建议', highlights: '景区特色', opening: '开放时间', tickets: '门票与费用', transport: '交通方式', discovery: '发现景点魅力', route: '推荐步行路线', guidelines: '游览须知', photos: '拍照机位', lodging: '住宿建议', reviews: '游客评价', map: '交通指南与位置', original: '历史与实用资料补充',
    visitBody: '建议预留约30—60分钟欣赏外观、比较两座教堂并在广场停留。如计划入内，应额外预留时间，并事先留意是否举行弥撒或其他宗教活动。',
    highlightsBody: '这里最值得观察的是旧修院建筑与现代公共空间的关系。比较两座教堂的体量、石材雕刻及不同的巴洛克细节，更容易理解这片街区的历史变化。',
    openingBody: '从公共空间可以观赏外立面。教堂内部开放及礼拜时间由宗教管理方安排，节庆、维修或特别仪式期间可能调整。',
    ticketsBody: '在街道和花园观赏外部无需门票。由于尚无经过现场核实的室内收费信息，不列出固定票价。',
    transportBody: '可从瓜达拉哈拉旧城区步行前往16 de Septiembre大道与Miguel Blanco／Revolución一带。公交资料曾出现T15和T15/C05（231-A）等名称，但应以实时站点与方向为准。',
    guidelinesBody: '请尊重宗教礼拜，不堵塞出入口；室内拍照应服从标识，避免闪光灯。旧城区步行建议携带饮水并穿舒适鞋履。',
    lodgingBody: '如果准备步行串联多座历史建筑，可考虑旧城区或公交便利区域。预订前比较实际步行距离、无障碍条件、夜间噪音及入住时间。',
    reviewsBody: '可通过这座教堂自身的Google地图地点页查看最新评分和游客评价。评论总数会变化，不能把“双教堂”整体地点的评分直接用于单座教堂。',
    mapBody: '导航时应使用此教堂专属名称与地址，出发前核对行人入口和广场周边临时封路情况。',
  },
} as const;

export default function NearbyDetailSections({ locale, slug }: { locale: string; slug: string }) {
  const t = detailText[locale as keyof typeof detailText] || detailText.es;
  const topic = nearbyTopics[locale]?.[slug];
  if (!topic) return null;
  const isAranzazu = slug === 'capilla-aranzazu';
  const discovery = isAranzazu ? {
    es: [
      ['Historia', 'La capilla se construyó a mediados del siglo XVIII en terrenos del convento franciscano, gracias al patrocinio de la familia Basáuri. Su supervivencia permite comprender cómo era el conjunto anterior a las demoliciones posteriores.'],
      ['Arquitectura', 'La fachada de barroco sobrio contiene una hornacina mariana y una espadaña. En el interior destacan retablos originales de madera dorada, con variantes del barroco novohispano.'],
      ['Cultura', 'La dedicación a Nuestra Señora de Aránzazu testimonia conexiones religiosas y culturales entre Nueva España y la tradición vasca.'],
      ['Experiencia', 'La visita combina la observación de un exterior relativamente discreto con un interior de gran riqueza decorativa cuando el acceso está permitido.'],
    ], en: [
      ['History', 'The chapel was built in the mid-18th century on Franciscan convent land with support from the Basáuri family. Its survival reveals the scale and history of the former complex.'],
      ['Architecture', 'A restrained Baroque façade frames a Marian niche and bell gable. Inside are original gilded wooden altarpieces representing New Spanish Baroque traditions.'],
      ['Culture', 'Its dedication to Our Lady of Aránzazu reflects connections between New Spain and Basque religious traditions.'],
      ['Experience', 'The modest exterior contrasts with the ornate interior, which visitors can appreciate when the chapel is open.'],
    ], zh: [
      ['历史', '小堂于18世纪中叶在方济各会修院旧址上兴建，得到Basáuri家族资助；它的保存有助于理解原修院建筑群的规模。'],
      ['建筑', '相对简洁的巴洛克立面包含圣母壁龛和钟墙，室内原有镀金木祭坛则体现新西班牙巴洛克装饰艺术。'],
      ['文化', '阿兰萨苏圣母信仰反映新西班牙与巴斯克宗教传统之间的联系。'],
      ['核心体验', '外表相对朴素的小堂与内部精美祭坛形成对比；只有在开放时才能进入观赏。'],
    ],
  } : {
    es: [
      ['Historia', 'La iglesia actual tomó forma durante las obras de 1668 a 1692, sobre una larga presencia franciscana en Guadalajara. Las transformaciones urbanas del siglo XIX alteraron el gran convento.'],
      ['Arquitectura', 'Su portada y volúmenes de piedra muestran el barroco novohispano; la torre y las fachadas laterales permiten observar el edificio desde distintas perspectivas.'],
      ['Cultura', 'El templo es un testimonio material del papel de la orden franciscana en la historia religiosa y urbana de Guadalajara.'],
      ['Experiencia', 'Contempla la portada desde el Jardín de San Francisco y recorre el exterior para entender cómo el templo se relaciona con el espacio urbano actual.'],
    ], en: [
      ['History', 'The present church took shape during work from 1668 to 1692, following a long Franciscan presence in Guadalajara. Urban changes in the 19th century transformed the extensive convent.'],
      ['Architecture', 'The entrance and stone volumes display New Spanish Baroque features; the tower and side façades offer varied perspectives.'],
      ['Culture', 'The building preserves the memory of the Franciscan order’s role in Guadalajara’s religious and urban history.'],
      ['Experience', 'View the principal entrance from Jardín de San Francisco, then walk around the church to understand its relationship with the modern square.'],
    ], zh: [
      ['历史', '在瓜达拉哈拉悠久的方济各会活动基础上，现存教堂主要形成于1668—1692年的工程；19世纪城市变迁改变了大型修院的原貌。'],
      ['建筑', '门廊与石造体量呈现新西班牙巴洛克特点，钟楼和侧立面适合从不同角度观察。'],
      ['文化', '教堂见证方济各会在瓜达拉哈拉宗教生活及城市发展史上的影响。'],
      ['核心体验', '先从圣方济各花园看正门，再沿外墙步行，更容易理解建筑与今日广场的关系。'],
    ],
  };
  const points = isAranzazu ? {
    es: ['Fachada y espadaña desde la plaza', 'Hornacina de la Virgen y molduras', 'Retablos dorados, solo si se permiten fotos interiores'],
    en: ['Façade and bell gable from the square', 'Marian niche and mouldings', 'Gilded altarpieces, only if interior photography is allowed'],
    zh: ['广场视角下的正立面与钟墙', '圣母壁龛及石雕线脚', '经允许后拍摄室内镀金祭坛'],
  } : {
    es: ['Portada desde el Jardín de San Francisco', 'Torre y fachada lateral', 'Perspectiva hacia la vecina Aránzazu'],
    en: ['Main façade from Jardín de San Francisco', 'Bell tower and side façade', 'View towards neighbouring Aránzazu'],
    zh: ['圣方济各花园望向正立面', '钟楼与侧立面', '朝向邻近阿兰萨苏小堂的街景'],
  };
  const route = isAranzazu ? {
    es: ['Llega al espacio público de Los Dos Templos', 'Observa la fachada y la hornacina', 'Visita el interior y los retablos si está abierto', 'Camina hasta San Francisco para comparar ambos templos'],
    en: ['Arrive at Los Dos Templos public space', 'Observe the façade and Marian niche', 'View the interior altarpieces if open', 'Walk to San Francisco and compare the two churches'],
    zh: ['到达双教堂广场公共空间', '观察正立面和圣母壁龛', '开放时入内欣赏祭坛', '步行至圣方济各教堂比较两座建筑'],
  } : {
    es: ['Entra al Jardín de San Francisco', 'Contempla la portada principal', 'Observa la torre y los laterales', 'Continúa a la Capilla de Aránzazu'],
    en: ['Enter Jardín de San Francisco', 'Study the main entrance', 'View the tower and side façades', 'Continue to Aránzazu Chapel'],
    zh: ['进入圣方济各花园', '观赏教堂正门', '绕看钟楼及侧立面', '继续前往阿兰萨苏小堂'],
  };
  const lang = locale === 'zh' ? 'zh' : locale === 'en' ? 'en' : 'es';
  const Section = ({ title, children }: {title: string; children: React.ReactNode}) => <section className="mb-10"><h2 className="font-display text-2xl font-semibold mb-4">{title}</h2>{children}</section>;
  const Paragraph = ({ children }: {children: React.ReactNode}) => <p className="leading-relaxed" style={{color: 'var(--text-secondary)'}}>{children}</p>;
  return <div className="mt-12" style={{color: 'var(--text-primary)'}}>
    <Section title={t.visit}><Paragraph>{t.visitBody}</Paragraph></Section>
    <Section title={t.highlights}><Paragraph>{t.highlightsBody}</Paragraph></Section>
    <Section title={t.opening}><Paragraph>{t.openingBody}</Paragraph></Section>
    <Section title={t.tickets}><Paragraph>{t.ticketsBody}</Paragraph></Section>
    <Section title={t.transport}><Paragraph>{t.transportBody}</Paragraph></Section>
    <Section title={t.discovery}><div className="grid sm:grid-cols-2 gap-4">{discovery[lang].map(([heading, body], i) => <article key={heading} className="rounded-xl p-5" style={{background:'var(--card-bg)',border:'1px solid var(--border-color)'}}><span className="text-sm" style={{color:'var(--accent)'}}>{i+1}</span><h3 className="font-display text-lg font-semibold my-2">{heading}</h3><Paragraph>{body}</Paragraph></article>)}</div></Section>
    <Section title={t.route}><ol className="space-y-3">{route[lang].map((step, i) => <li key={step} className="flex gap-4 items-start"><span className="shrink-0 rounded-full w-8 h-8 flex items-center justify-center font-semibold" style={{background:'var(--card-bg)',border:'1px solid var(--border-color)'}}>{i+1}</span><Paragraph>{step}</Paragraph></li>)}</ol></Section>
    <Section title={t.guidelines}><Paragraph>{t.guidelinesBody}</Paragraph></Section>
    <Section title={t.photos}><ol className="space-y-3">{points[lang].map((point, i) => <li key={point} className="flex gap-3"><span style={{color:'var(--accent)'}}>{i+1}.</span><Paragraph>{point}</Paragraph></li>)}</ol></Section>
    <Section title={t.lodging}><Paragraph>{t.lodgingBody}</Paragraph></Section>
    <Section title={t.reviews}><Paragraph>{t.reviewsBody}</Paragraph><a className="inline-block mt-3 underline underline-offset-4 text-sm" style={{color:'var(--accent)'}} href={topic.mapsUrl} target="_blank" rel="noopener noreferrer">Google Maps · {topic.localName}</a></Section>
    <Section title={t.map}><Paragraph>{topic.address}</Paragraph><p className="mt-3"><Paragraph>{t.mapBody}</Paragraph></p><a className="inline-block mt-3 underline underline-offset-4 text-sm" style={{color:'var(--accent)'}} href={topic.mapsUrl} target="_blank" rel="noopener noreferrer">Google Maps · {topic.localName}</a></Section>
  </div>;
}
