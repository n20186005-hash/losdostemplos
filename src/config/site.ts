/**
 * 单景点 SEO 实体绑定配置变量表
 * ---------------------------------------------------------------
 * 所有站点级 SEO 变量集中在此维护，模板中的占位符与本文件一一对应。
 * 使用前只需将本文件的变量替换为具体景点的数据即可。
 */
export const siteConfig = {
  // {{DOMAIN_NAME}}
  domain: 'losdostemplos.com',
  // 规范化主站 URL
  url: 'https://losdostemplos.com',

  // {{ATTRACTION_FULL_NAME}} 景点官方全称
  fullName: 'Los Dos Templos',
  // {{ATTRACTION_SHORT_NAME}} 景点常用俗称 / 域名对应含义（西班牙语意为 "The Two Temples"）
  shortName: 'Los Dos Templos',
  // {{CITY_NAME}}
  city: 'Guadalajara',
  // {{STATE_PROVINCE}}
  stateProvince: 'Jalisco',
  // {{COUNTRY_NAME}}
  country: 'Mexico',
  // {{COUNTRY_CODE_2LETTER}}
  countryCode: 'MX',
  // {{POSTAL_CODE}}
  postalCode: '44100',
  // {{LATITUDE}} / {{LONGITUDE}}
  latitude: 20.6719739,
  longitude: -103.3472266,
  // Google 评分（最新景点信息）
  rating: '4.6',
  reviewCount: '8,418',

  // {{MAPS_SHARE_URL}}
  mapsShareUrl: 'https://maps.app.goo.gl/boU6JfgsHb83L63i7',
  // {{MAPS_EMBED_SRC}}（Google Maps 嵌入代码中的 src 链接）
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6639.5801879572855!2d-103.34722660000001!3d20.671973899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b1fa0a761a9d%3A0x7287cd710cfff12!2sLos%20Dos%20Templos!5e1!3m2!1szh-CN!2s!4v1788839689075!5m2!1szh-CN!2s',

  // {{NEARBY_LANDMARK_1}} / {{NEARBY_LANDMARK_2}}（周边核心地标）
  nearbyLandmarks: {
    1: 'Catedral de Guadalajara',
    2: 'Teatro Degollado',
  },

  // {{GOVT_TOURISM_URL}}（当地政府/官方旅游局）
  govtTourismUrl: 'https://secturjal.jalisco.gob.mx/',

  // GA4（Google Analytics 4）
  gaId: 'G-HXM22WWPKP',
};
