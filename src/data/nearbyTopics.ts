import { expandedNearbySlugs, expandedNearbyTopics } from './nearbyExpansion';

const landmarks = {
  'templo-san-francisco-asis': {
    localName: 'Templo de San Francisco de Asís',
    address: 'Av. 16 de Septiembre y Av. Revolución, Zona Centro, Guadalajara, Jalisco, México',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/San_Francisco_de_As%C3%ADs_-_Fachada.jpg',
    imageSource: 'https://commons.wikimedia.org/wiki/Category:Templo_de_San_Francisco_(Guadalajara)',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Templo+de+San+Francisco+de+Asis+Guadalajara+Jalisco',
    sourceUrl: 'https://sitiosymonumentos.cultura.gob.mx/iii-estudios-monograficos/san-francisco-13/',
  },
  'capilla-aranzazu': {
    localName: 'Capilla de Nuestra Señora de Aránzazu',
    address: 'Av. 16 de Septiembre 260, Zona Centro, 44100 Guadalajara, Jalisco, México',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Aranzaz%C3%BA_-_Fachada.jpg',
    imageSource: 'https://commons.wikimedia.org/wiki/Category:Templo_de_Nuestra_Se%C3%B1ora_de_Aranzaz%C3%BA,_Guadalajara',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Capilla+de+Nuestra+Senora+de+Aranzazu+Guadalajara+Jalisco',
    sourceUrl: 'https://sitiosymonumentos.cultura.gob.mx/monumentos-inmuebles-de-propiedad-federal/virgen-de-aranzazu/',
  },
};

const descriptions = {
  es: {
    'templo-san-francisco-asis': {
      title: 'Templo de San Francisco de Asís: historia, visita y arquitectura',
      description: 'Visita el Templo de San Francisco de Asís en Guadalajara: historia del convento, detalles de la fachada, ubicación, paseo y recomendaciones.',
      intro: 'Uno de los dos edificios que dan nombre a Los Dos Templos, este templo conserva la memoria del gran complejo franciscano del centro histórico de Guadalajara.',
      sections: [
        { heading: 'Información esencial', body: 'Nombre: Templo de San Francisco de Asís. Ubicación: acera oriente de avenida 16 de Septiembre, cerca de avenida Revolución, Zona Centro, Guadalajara, Jalisco, México. Tipo: templo católico y monumento histórico. Referencia para el mapa: busca este templo por su nombre completo, no la ubicación genérica de Los Dos Templos.' },
        { heading: 'Historia', body: 'La presencia franciscana se remonta a la fundación de Guadalajara; el convento ocupó este entorno desde el siglo XVI. El templo actual fue reconstruido entre 1668 y 1692 y el antiguo conjunto perdió gran parte de sus dependencias durante el siglo XIX. La iglesia quedó como testimonio material de aquella escala conventual.' },
        { heading: 'Arquitectura y qué observar', body: 'Mira la portada principal desde el Jardín de San Francisco, la torre y las fachadas laterales. La piedra y la composición barroca novohispana contrastan con el espacio urbano abierto que hoy rodea el inmueble.' },
        { heading: 'Gestión y conservación', body: 'Es un inmueble religioso histórico sujeto al marco de protección de monumentos en México. La Secretaría de Cultura federal documenta su evolución y características arquitectónicas; las actividades de culto y el acceso interior se rigen por la administración religiosa del templo.' },
        { heading: 'Horarios, entrada y servicios', body: 'La contemplación exterior desde el espacio público es libre. Los horarios de misa, apertura interior, accesibilidad y posibles restricciones deben consultarse en el lugar; no se publica un horario o precio fijo sin confirmación actualizada.' },
        { heading: 'Cómo llegar', body: 'Desde el Centro Histórico se puede llegar caminando hacia avenida 16 de Septiembre y Revolución. Para transporte público introduce el nombre exacto del templo en tu aplicación de mapas; verifica la parada y dirección vigentes.' },
        { heading: 'Ruta y fotografía', body: '1. Empieza en el Jardín de San Francisco. 2. Fotografía la portada y la torre sin bloquear el paso. 3. Rodea el edificio para comparar fachadas. 4. Continúa a la cercana Capilla de Aránzazu, que perteneció al antiguo conjunto.' },
        { heading: 'Alojamiento y visita responsable', body: 'El Centro Histórico ofrece distintas zonas para alojarse, según la movilidad que necesites. Mantén silencio durante celebraciones y evita fotografías del interior cuando exista señalización restrictiva.' },
      ],
      faq: [{ q: '¿Es el mismo edificio que Aránzazu?', a: 'No. San Francisco es el templo principal del antiguo conjunto franciscano; Aránzazu es una capilla histórica cercana.' }, { q: '¿Se puede visitar gratis?', a: 'El exterior se observa desde el espacio público. El acceso y las condiciones dentro del templo dependen de su apertura y actividades religiosas.' }],
    },
    'capilla-aranzazu': {
      title: 'Capilla de Nuestra Señora de Aránzazu: retablos y visita',
      description: 'Historia y arquitectura de la Capilla de Aránzazu en Guadalajara: retablos dorados, dirección, acceso, fotografías y ruta a pie.',
      intro: 'La Capilla de Aránzazu es una de las piezas más valiosas del antiguo conjunto franciscano, especialmente por sus retablos barrocos de madera dorada.',
      sections: [
        { heading: 'Información esencial y dirección', body: 'Nombre: Capilla de Nuestra Señora de Aránzazu. Dirección de referencia: Av. 16 de Septiembre 260, Zona Centro, 44100 Guadalajara, Jalisco, México. Tipo: capilla histórica católica. Navega a su nombre específico para no confundirla con San Francisco.' },
        { heading: 'Historia', body: 'La capilla se construyó en el siglo XVIII sobre terrenos del convento franciscano. Las fuentes patrimoniales identifican el inicio de la obra en 1749 y la vinculan con el patrocinio de la familia Basáuri. Sobrevivió a la transformación y demolición de buena parte del conjunto conventual.' },
        { heading: 'Arquitectura y experiencia', body: 'Observa la portada de barroco sobrio, la hornacina de la Virgen y la espadaña. Si el interior está abierto, los retablos originales de madera tallada y dorada son el principal atractivo artístico; dedica tiempo a mirar sus columnas y detalles sin alterar el recogimiento del espacio.' },
        { heading: 'Gestión y conservación', body: 'Es un inmueble religioso histórico registrado por la Secretaría de Cultura federal. La conservación patrimonial tiene supervisión institucional y el funcionamiento cotidiano del espacio de culto corresponde a su administración religiosa.' },
        { heading: 'Horarios, entrada y accesibilidad', body: 'La fachada puede contemplarse desde el espacio público. Las condiciones para entrar, participar en oficios y tomar fotografías interiores pueden variar: consulta la información disponible en la entrada el día de la visita.' },
        { heading: 'Cómo llegar y paseo cercano', body: 'Camina desde Paseo Alcalde hacia avenida 16 de Septiembre. La capilla se encuentra en el entorno de Los Dos Templos; combínala con el Templo de San Francisco y la plaza. Para llegar en autobús verifica las paradas y sentidos actuales.' },
        { heading: 'Ruta para fotografías', body: '1. Captura la fachada desde un punto abierto. 2. Enfoca el nicho superior y la espadaña. 3. Si hay permiso, observa los retablos interiores sin flash. 4. Sal a comparar las proporciones con el vecino San Francisco.' },
        { heading: 'Alojamiento y normas de visita', body: 'Para recorrer otros monumentos a pie, el Centro Histórico es una base práctica; elige alojamiento según tus preferencias. Respeta los horarios de culto, las restricciones de imagen y las indicaciones del personal.' },
      ],
      faq: [{ q: '¿Qué distingue a la Capilla de Aránzazu?', a: 'Conserva retablos originales de madera dorada y es un ejemplo importante del barroco virreinal de Guadalajara.' }, { q: '¿Dónde está la capilla?', a: 'La referencia publicada es avenida 16 de Septiembre 260, Zona Centro, Guadalajara.' }],
    },
  },
  en: {
    'templo-san-francisco-asis': {
      title: 'San Francisco de Asís Church: history and visitor guide', description: 'Explore San Francisco de Asís Church in Guadalajara: Franciscan history, architecture, access, photography and directions.',
      intro: 'This historic church is one of the two landmarks behind the name Los Dos Templos, and a surviving reminder of a larger Franciscan convent.',
      sections: [
        { heading: 'Essential facts', body: 'Name: Templo de San Francisco de Asís. Location: eastern side of Avenida 16 de Septiembre near Avenida Revolución, historic central Guadalajara, Jalisco, Mexico. Type: Catholic church and historic monument. Navigate to the individual church name rather than the general square.' },
        { heading: 'History', body: 'Franciscan activity in Guadalajara dates to the 16th century. The present church took shape during rebuilding between 1668 and 1692. Much of the convent complex was later dismantled, leaving the church as an important landmark.' },
        { heading: 'Architecture and highlights', body: 'Study the main entrance from Jardín de San Francisco, then look at the bell tower and side façades. The New Spanish Baroque stonework is especially striking beside the open urban garden.' },
        { heading: 'Management and conservation', body: 'The federal cultural heritage authority documents the building as a historic religious monument. Religious administrators manage worship and day-to-day interior access; heritage protections also apply.' },
        { heading: 'Hours, admission and facilities', body: 'The exterior can be viewed from the public space. Mass times, interior access, accessibility and temporary closures need checking locally; no unverified fixed hours or ticket prices are provided.' },
        { heading: 'Transport and walking route', body: 'Walk towards Avenida 16 de Septiembre and Revolución from the historic centre. For public transport, check current stops and directions using the exact church name. Visit Jardín de San Francisco, examine the façade, walk around the building, then continue to Aránzazu.' },
        { heading: 'Photography, lodging and etiquette', body: 'A wide photo from the garden shows the church’s scale; closer views capture stonework and the tower. Central Guadalajara has accommodation suited to walking tours. Respect ceremonies and posted interior photography rules.' },
      ],
      faq: [{ q: 'Is this Aránzazu Church?', a: 'No. San Francisco is the principal church of the former convent, while Aránzazu is a distinct nearby chapel.' }, { q: 'Is entry free?', a: 'Outdoor viewing is available from public space. Interior conditions depend on religious activities and local opening arrangements.' }],
    },
    'capilla-aranzazu': {
      title: 'Our Lady of Aránzazu Chapel: altarpieces and visiting guide', description: 'Visit Aránzazu Chapel in Guadalajara: gilded Baroque altarpieces, history, address, architecture, access and photo tips.',
      intro: 'A surviving chapel of the old Franciscan complex, Aránzazu is celebrated for its remarkable gilded wooden altarpieces.',
      sections: [
        { heading: 'Essential facts and address', body: 'Name: Capilla de Nuestra Señora de Aránzazu. Address reference: Av. 16 de Septiembre 260, Zona Centro, 44100 Guadalajara, Jalisco, Mexico. Type: historic Catholic chapel. Use the individual chapel name for navigation.' },
        { heading: 'History', body: 'The chapel was founded on the former Franciscan convent grounds in the 18th century, with construction beginning in 1749 and support from the Basáuri family. It survived major changes to the larger convent complex.' },
        { heading: 'Architecture and highlights', body: 'Look at the restrained Baroque entrance, the Marian niche and the bell gable. When open, the interior holds original carved and gilded altarpieces that are exceptional examples of local colonial art.' },
        { heading: 'Management and conservation', body: 'The federal cultural authority lists this protected religious monument. Day-to-day worship and visitor access are handled by the chapel’s religious administration under applicable heritage oversight.' },
        { heading: 'Hours, prices and accessibility', body: 'The exterior can be seen from the public street. Interior access, photography, religious services and any restrictions should be checked at the entrance on the day; fixed opening hours are not assumed.' },
        { heading: 'Transport and suggested visit', body: 'Walk from Paseo Alcalde towards Avenida 16 de Septiembre, then combine this chapel with San Francisco and the open plaza. Confirm current transit stops and directions before travelling.' },
        { heading: 'Photos, lodging and etiquette', body: 'Photograph the façade, niche and gable from outside; interior images should be taken only when permitted, without flash. Central accommodation may suit a walking itinerary. Avoid disturbing services.' },
      ],
      faq: [{ q: 'What makes Aránzazu special?', a: 'Its surviving original gilded wooden Baroque altarpieces are among Guadalajara’s important historic interiors.' }, { q: 'Where is it?', a: 'The published address reference is Av. 16 de Septiembre 260, central Guadalajara.' }],
    },
  },
  zh: {
    'templo-san-francisco-asis': {
      title: '圣方济各·阿西斯教堂：历史建筑与参观指南', description: '介绍瓜达拉哈拉圣方济各教堂的修院历史、建筑特点、交通、拍照与参观须知。',
      intro: '圣方济各教堂是“双教堂”其中一座，也是昔日方济各会大型修院建筑群的重要遗存。',
      sections: [
        { heading: '基本资料与位置', body: '名称：Templo de San Francisco de Asís。位置：墨西哥哈利斯科州瓜达拉哈拉市中心，16 de Septiembre 大道东侧、Revolución 大道附近。类型：天主教历史教堂。请使用教堂专属名称导航，避免与双教堂广场混淆。' },
        { heading: '历史', body: '方济各会自16世纪就在瓜达拉哈拉活动。现存教堂主要建造阶段为1668—1692年，19世纪修院建筑群大部拆除后，教堂成为重要历史遗存。' },
        { heading: '建筑与观察重点', body: '可从圣方济各花园观察正立面，再欣赏钟楼与侧面石雕。新西班牙巴洛克式建筑与周边开放广场形成鲜明对照。' },
        { heading: '管理与保护', body: '墨西哥联邦文化部门收录并研究这座历史宗教建筑。文物保护受相关制度约束，日常礼拜与内部开放则由宗教管理方安排。' },
        { heading: '开放、门票与设施', body: '可在公共空间免费欣赏外观。内部开放、弥撒、无障碍条件和临时封闭请以现场为准；不提供未经证实的固定门票或时间。' },
        { heading: '交通与步行路线', body: '从旧城区步行前往16 de Septiembre 大道与 Revolución 大道附近。乘公交应核对实时线路和方向。建议从花园观景、细看立面、绕行外墙，再步行至阿兰萨苏小堂。' },
        { heading: '拍照、住宿与礼仪', body: '花园适合拍摄教堂整体，近景可记录门廊和钟楼。旧城区有适合步行游览的住宿区域。宗教仪式期间请保持安静，并遵守室内摄影限制。' },
      ],
      faq: [{ q: '这座教堂就是阿兰萨苏吗？', a: '不是，两者是不同建筑，圣方济各教堂属于旧修院主体，阿兰萨苏是邻近的小堂。' }, { q: '参观需要买票吗？', a: '公共空间观赏外观无需门票；内部条件取决于现场开放及宗教活动。' }],
    },
    'capilla-aranzazu': {
      title: '阿兰萨苏圣母小堂：镀金祭坛与参观攻略', description: '阿兰萨苏圣母小堂的历史、巴洛克镀金木祭坛、具体地址、交通和摄影建议。',
      intro: '阿兰萨苏圣母小堂是昔日方济各会修院留存下来的历史建筑，以精致的巴洛克镀金木祭坛著称。',
      sections: [
        { heading: '基本资料与具体地址', body: '名称：Capilla de Nuestra Señora de Aránzazu。参考地址：Av. 16 de Septiembre 260, Zona Centro, 44100 Guadalajara, Jalisco, México。类型：历史天主教小堂。地图应搜索小堂自身名称。' },
        { heading: '历史', body: '小堂位于旧方济各会修院土地上，始建于1749年，由Basáuri家族资助，是18世纪瓜达拉哈拉宗教建筑的重要作品，后来在修院建筑拆除中幸存。' },
        { heading: '建筑与核心看点', body: '外立面体现相对克制的巴洛克装饰，值得观察圣母壁龛及顶部钟墙。若允许进入内部，最值得看的是原有的雕花镀金木祭坛及其细密装饰。' },
        { heading: '管理与文物保护', body: '墨西哥联邦文化部门有此历史宗教建筑的档案。日常礼拜和参观开放由宗教管理方负责，同时遵守历史建筑保护规定。' },
        { heading: '开放、门票与无障碍', body: '公共街道可欣赏外观；内部开放时段、摄影许可及无障碍条件应以当天入口公告为准，不应将固定时刻或收费当作已核实信息。' },
        { heading: '交通与游览路线', body: '可由 Paseo Alcalde 步行前往16 de Septiembre大道，顺路参观双教堂广场与圣方济各教堂。公交线路应以当日实时路线和停靠方向为准。' },
        { heading: '摄影、住宿与参观礼仪', body: '建议从广场拍摄立面、圣母壁龛及钟墙；未经许可不要在内部使用闪光灯。旧城住宿便于步行串联其他景点，参观时请尊重宗教仪式。' },
      ],
      faq: [{ q: '阿兰萨苏小堂为什么有名？', a: '它保存原有巴洛克镀金木祭坛，是瓜达拉哈拉宗教建筑的重要遗存。' }, { q: '小堂在哪里？', a: '参考地址为瓜达拉哈拉市中心16 de Septiembre大道260号。' }],
    },
  },
} as const;

const originalNearbyTopics = Object.fromEntries(
  Object.entries(descriptions).map(([locale, pages]) => [locale,
    Object.fromEntries(Object.entries(pages).map(([slug, content]) => [slug, { ...content, ...landmarks[slug as keyof typeof landmarks] }]))
  ])
) as Record<string, Record<string, { title: string; description: string; intro: string; sections: readonly {heading: string; body: string}[]; faq: readonly {q: string; a: string}[]; image: string; imageSource: string; mapsUrl: string; sourceUrl: string; localName: string; address: string; category?: string; management?: string }>>;

export const nearbyTopics = Object.fromEntries(['es', 'en', 'zh'].map((locale) => [locale, {
  ...originalNearbyTopics[locale],
  ...(expandedNearbyTopics as Record<string, Record<string, any>>)[locale],
}])) as typeof originalNearbyTopics;

export const nearbySlugs = [...Object.keys(landmarks), ...expandedNearbySlugs];
