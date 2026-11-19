// Place-specific visitor operations, verified against the cited venue or authority.
type LangText = { es: string; en: string; zh: string };
type Profile = { management: LangText; visit: LangText; official: string; extraPhoto?: string; extraPhoto2?: string; directPhoto?: string; photoSource?: string };
export const nearbyProfiles: Record<string, Profile> = {
  'jardin-san-francisco': {
    management: {
      es: 'El Jardín de San Francisco es un espacio público del Centro Histórico de Guadalajara. Su mantenimiento urbano corresponde al ámbito municipal, mientras los templos contiguos tienen su propia administración religiosa. El jardín permite apreciar desde el exterior dos monumentos de épocas distintas.',
      en: 'Jardín de San Francisco is public open space in Guadalajara’s historic centre. Municipal services are responsible for its urban upkeep, while the adjacent churches have separate religious administrators. The garden offers a clear view of the two surviving historic landmarks.',
      zh: '圣方济各花园是瓜达拉哈拉历史城区的公共绿地，日常公共空间维护属于市政管理范畴；旁边两座教堂则由各自宗教管理方安排礼拜与内部开放。花园将两座不同年代的历史建筑联系在同一条步行视线上。',
    },
    visit: { es: 'Un paseo por el exterior puede realizarse desde el espacio público. Recorre primero la vista general y luego cada portada; las celebraciones religiosas pueden condicionar el acceso a los templos.', en: 'The outdoor walk is available from public space. Start with the overall view, then study each church entrance; religious services may limit interior access.', zh: '可从公共空间进行外部步行游览。建议先看双教堂整体，再分别观察门廊；教堂礼拜时段可能限制内部参观。' },
    official: 'https://tequiero.guadalajara.gob.mx/rutas/ruta-de-centro-historico',
    extraPhoto: 'Jardines del Templo de San Francisco de Asís, Guadalara, Mexico, Arco y torre.jpg',
  },
  'puente-de-las-damas': {
    management: {
      es: 'El Puente de las Damas es patrimonio histórico recuperado en el entorno de Mexicaltzingo. El Gobierno de Guadalajara lo presenta como espacio visitable; las obras de rescate del puente fueron impulsadas por la Secretaría de Infraestructura y Obra Pública de Jalisco. El recorrido subterráneo conserva la huella del antiguo cruce del arroyo El Arenal.',
      en: 'Puente de las Damas is a recovered historic bridge in Mexicaltzingo. Guadalajara’s municipal tourism service presents it as a visitor site, while Jalisco’s public infrastructure authority took part in its recovery. Its subterranean route reveals the old crossing of the El Arenal stream.',
      zh: '女士桥位于梅希卡尔钦戈，是经抢救修复的历史桥梁。瓜达拉哈拉市政府旅游部门提供参观介绍，哈利斯科州公共基础设施部门参与了桥体修复工程。如今的地下参观空间展示了昔日跨越埃尔阿雷纳尔溪的交通遗迹。',
    },
    visit: {es:'La información municipal indica visitas de martes a domingo de 10:00 a 18:00; lunes cerrado. El ingreso es por calle Colón y la plazoleta permite mirar cinco ventanas arqueológicas. Confirma cambios antes de ir.',en:'Municipal information lists Tuesday–Sunday, 10:00–18:00, with Monday closed. Entry is from Calle Colón; the small square has five archaeological viewing windows. Check for changes before travelling.',zh:'市政府资料列出的参观时间为周二至周日10:00—18:00，周一关闭。入口在Colón街，地面小广场设有五处考古观察窗；出发前请核对临时调整。'},
    official: 'https://guadalajara.gob.mx/turismo/puenteDeLasDamas',
    directPhoto: 'https://i.blogs.es/92d814/20220623_131545/1200_900.jpeg', photoSource: 'https://www.trendencias.com/mexico/calles-populares-guadalajara-puedes-visitar-restos-puente-historico-que-cambio-planeacion-urbana-ciudad',
  },
  'ex-convento-del-carmen': {
    management: {
      es: 'El Ex Convento del Carmen es un recinto cultural vinculado a la Secretaría de Cultura de Jalisco y a la red pública de museos y galerías del estado. Su antigua arquitectura conventual acoge exposiciones, presentaciones y actividades artísticas en el número 638 de avenida Juárez.',
      en: 'Ex Convento del Carmen is a cultural venue associated with Jalisco’s Ministry of Culture and the state network of museums and galleries. Its former convent spaces host exhibitions and artistic programmes at Avenida Juárez 638.',
      zh: '卡门旧修道院是哈利斯科州文化厅及州立博物馆、展览与画廊体系使用的文化空间，位于华雷斯大道638号。昔日修院建筑如今承办艺术展览、讲座和文化活动。',
    },
    visit: {es:'La cartelera cultural estatal publica exposiciones y horarios por temporada. Revisa qué salas están abiertas y dedica tiempo a los patios antes de continuar hacia los museos del centro.',en:'The state cultural programme publishes exhibitions and seasonal hours. Check which galleries are open and spend time in the courtyards before continuing to nearby museums.',zh:'州文化活动日历会发布展览及不同时期的开放安排。建议先查正在开放的展厅，再观察庭院和回廊，并串联附近博物馆。'},
    official: 'https://sc.jalisco.gob.mx/agenda/carteleras/museos-y-galerias-en-vacaciones-navidenas',
    extraPhoto: 'Ex Convento del Carmen 2.jpg',
  },
  'teatro-diana': {
    management: {
      es: 'El Teatro Diana pertenece a la Universidad de Guadalajara y forma parte de la Coordinación de Cultura UDG. Reabrió en 2005 tras la adaptación del antiguo recinto de espectáculos; hoy recibe conciertos, danza, teatro y otras producciones conforme a su cartelera.',
      en: 'Teatro Diana belongs to the University of Guadalajara and is part of its Cultura UDG programme. Reopened in 2005 after the transformation of an earlier entertainment venue, it hosts concerts, dance, theatre and other productions according to its programme.',
      zh: '戴安娜剧院属于瓜达拉哈拉大学，由该校文化事业体系（Cultura UDG）运营。场馆由旧娱乐场所改造后于2005年重新开放，承办音乐会、戏剧、舞蹈等演出。',
    },
    visit: {es:'El acceso interior está sujeto a funciones y entradas. Consulta la cartelera, la apertura de puertas y las condiciones de fotografía en la web del teatro; el exterior se puede ver desde la avenida.',en:'Interior admission depends on performances and tickets. Check the theatre’s official programme, door times and photography rules; its exterior can be seen from the avenue.',zh:'室内开放与演出及门票安排有关。请从剧院官网查看节目表、入场时间和摄影规定；建筑外立面可在大道公共空间欣赏。'},
    official: 'https://www.teatrodiana.com/', extraPhoto: 'Teatro diana 0.jpg',
  },
  'catedral-guadalajara': {
    management: {
      es: 'La Catedral Metropolitana de Guadalajara es la sede litúrgica de la Arquidiócesis de Guadalajara. La comunidad eclesiástica organiza el culto y el acceso a su interior, mientras su condición de inmueble histórico implica las protecciones patrimoniales mexicanas. El edificio preside la Cruz de Plazas.',
      en: 'Guadalajara Metropolitan Cathedral is the liturgical seat of the Archdiocese of Guadalajara. Church administrators organise worship and interior access, while Mexican heritage protections apply to the historic building. It anchors the city’s Cross of Plazas.',
      zh: '瓜达拉哈拉都会主教座堂是瓜达拉哈拉总教区的礼仪中心，日常宗教活动与内部开放由教会管理方安排；作为历史建筑亦受墨西哥文物保护制度约束。它处于旧城十字形广场群的核心。',
    },
    visit: {es:'La entrada durante misas y confesiones exige silencio y respeto. Revisa horarios actuales con la catedral; su fachada y torres pueden verse desde Plaza Guadalajara y las plazas contiguas.',en:'Be respectful during Mass and confession. Check current hours with the cathedral; the façade and towers can be viewed from Plaza Guadalajara and surrounding squares.',zh:'参加或遇到弥撒、告解时请保持安静。开放时段以座堂发布信息为准；外观和双塔可从瓜达拉哈拉广场等公共空间观看。'},
    official: 'https://sic.gob.mx/ficha.php?table=catedral&table_id=40', extraPhoto: 'Catedral metropolitana de Guadalajara 10.jpg',
  },
  'palacio-de-gobierno-jalisco': {
    management: {
      es: 'El Palacio de Gobierno de Jalisco es un edificio público vinculado al Gobierno del Estado. Su función institucional convive con el patrimonio artístico de los murales de José Clemente Orozco. El acceso a patios y áreas históricas depende de la actividad oficial y de las medidas de seguridad vigentes.',
      en: 'The Jalisco Government Palace is a public building used by the state government. Its official role coexists with the artistic heritage of José Clemente Orozco’s murals. Access to historic halls and courtyards depends on official business and current security rules.',
      zh: '哈利斯科州政府宫是由州政府使用的公共建筑，既承载行政职能，也保存何塞·克莱门特·奥罗斯科壁画等艺术遗产。内庭及历史空间开放会受政府公务和现场安保安排影响。',
    },
    visit: {es:'Contempla el palacio desde Plaza de Armas antes de verificar si se puede acceder al patio y a los murales. Evita bloquear accesos oficiales.',en:'View the palace from Plaza de Armas before checking whether its courtyard and murals are open. Do not obstruct official entrances.',zh:'先在武器广场欣赏州政府宫外观，再询问内庭和壁画是否开放；请勿阻挡行政机关出入口。'},
    official: 'https://tequiero.guadalajara.gob.mx/planea-tu-viaje/explora/centro-historico', extraPhoto: 'Palacio de Gobierno de Jalisco 1.jpg',
  },
  'teatro-degollado': {
    management: {
      es: 'El Teatro Degollado es propiedad del Gobierno del Estado de Jalisco y lo administra la Secretaría de Cultura estatal. Inaugurado en 1866, es un monumento histórico y uno de los principales escenarios públicos de la ciudad. Las visitas, funciones y labores de conservación se coordinan desde la administración cultural.',
      en: 'Teatro Degollado is owned by the Government of Jalisco and administered by the state Ministry of Culture. Opened in 1866, it is a protected historic monument and a major public performance venue. Tours, performances and conservation are coordinated by cultural administrators.',
      zh: '德戈亚多剧院属于哈利斯科州政府，由州文化厅管理。剧院于1866年启用，是受保护的历史建筑和城市主要演出场馆，其参观、演出与维护由文化管理体系统筹。',
    },
    visit: {es:'El exterior neoclásico se contempla desde la plaza. Para entrar consulta la cartelera o las visitas disponibles con la Secretaría de Cultura de Jalisco.',en:'The neoclassical façade is visible from the plaza. For interior access check performances and available tours with Jalisco’s Ministry of Culture.',zh:'可从广场免费观赏新古典主义外立面；室内参观和演出请查询哈利斯科州文化厅公布的安排。'},
    official: 'https://sic.cultura.gob.mx/ficha.php?disciplina=&table=teatro&table_id=381', extraPhoto: 'Teatro Degollado Guadalajara 04.jpg',
  },
  'rotonda-jaliscienses-ilustres': {
    management: {
      es: 'La Rotonda de los Jaliscienses Ilustres es un monumento cívico en el espacio público central de Guadalajara. La conservación del entorno urbano corresponde a las autoridades públicas competentes. La columnata y los homenajes escultóricos recuerdan a personas destacadas de la historia del estado.',
      en: 'Rotonda de los Jaliscienses Ilustres is a civic monument in central Guadalajara’s public space. The surrounding urban area is maintained by the responsible public authorities. Its colonnade and sculptures commemorate prominent people from Jalisco.',
      zh: '哈利斯科名人圆亭位于瓜达拉哈拉市中心公共空间，是纪念州内杰出人物的市政文化地标。周边城市空间由相关公共主管机构维护，环形柱廊和人物雕像共同构成纪念景观。',
    },
    visit: {es:'La columnata y las esculturas se observan desde el espacio público. Combina la visita con Catedral, Plaza Guadalajara y Plaza de Armas.',en:'The colonnade and sculptures can be viewed from public space. Combine this stop with the cathedral, Plaza Guadalajara and Plaza de Armas.',zh:'可从公共空间欣赏柱廊与雕像。建议与主教座堂、瓜达拉哈拉广场和武器广场组成短途步行路线。'},
    official: 'https://tequiero.guadalajara.gob.mx/lugares/rotonda-de-los-jaliscienses-ilustres', extraPhoto: 'Rotonda de los Jaliscienses Ilustres, GDL, JAL 02.jpg',
  },
  'plaza-de-armas-guadalajara': {
    management: {
      es: 'La Plaza de Armas de Guadalajara es una plaza pública del núcleo cívico de la ciudad. El Gobierno municipal atiende los servicios urbanos del espacio, situado frente al Palacio de Gobierno del Estado. Su kiosco, jardines y circulación peatonal mantienen el carácter de punto de encuentro del Centro Histórico.',
      en: 'Plaza de Armas is a public square in Guadalajara’s civic centre. Municipal services maintain the urban space facing the Jalisco Government Palace. Its bandstand, landscaping and pedestrian paths preserve its role as a historic gathering place.',
      zh: '瓜达拉哈拉武器广场是城市行政核心的公共广场，市政部门负责广场公共空间的日常维护；它正对哈利斯科州政府宫。广场亭、花园与步道延续了旧城公共集会场所的功能。',
    },
    visit: {es:'La plaza se recorre sin boleto. Los eventos y la circulación pueden variar; contempla el kiosco antes de visitar la fachada del palacio y la catedral.',en:'The public square requires no ticket. Events and access arrangements can change; study the bandstand before continuing to the palace and cathedral.',zh:'公共广场无需门票。活动及通行安排可能变化；建议先观察广场亭，再欣赏政府宫和主教座堂。'},
    official: 'https://tequiero.guadalajara.gob.mx/rutas/ruta-de-centro-historico', extraPhoto: 'Plaza de Armas Guadalajara 2024.jpg',
  },
};
