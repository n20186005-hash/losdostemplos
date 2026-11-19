import type { ReactNode } from 'react';
import { nearbyTopics } from '@/data/nearbyTopics';

const labels = {
  es: {visit:'Consejos para la visita',highlights:'Qué observar',opening:'Horarios y acceso',tickets:'Entradas y precios',transport:'Cómo llegar',discovery:'Descubre su historia y arquitectura',history:'Historia',architecture:'Arquitectura y cultura',route:'Ruta a pie recomendada',guidelines:'Antes de visitar',photos:'Puntos para fotografía',lodging:'Dónde alojarse',reviews:'Reseñas de visitantes',map:'Dirección y mapa'},
  en: {visit:'Visitor advice',highlights:'What to look for',opening:'Opening and access',tickets:'Tickets and prices',transport:'Getting there',discovery:'Discover the history and architecture',history:'History',architecture:'Architecture and culture',route:'Suggested walking route',guidelines:'Before you visit',photos:'Photography spots',lodging:'Where to stay',reviews:'Visitor reviews',map:'Address and map'},
  zh: {visit:'游览建议',highlights:'景点特色与观察重点',opening:'开放时间',tickets:'门票价格',transport:'交通方式',discovery:'发现历史与建筑魅力',history:'历史背景',architecture:'建筑与文化',route:'编号步行路线',guidelines:'游览须知',photos:'拍照机位',lodging:'住宿建议',reviews:'游客评价',map:'地址与地图导航'},
};

export default function ExpandedNearbySections({locale,slug}:{locale:string;slug:string}) {
  const topic = nearbyTopics[locale]?.[slug];
  if (!topic) return null;
  const lang = locale==='zh'?'zh':locale==='en'?'en':'es';
  const t = labels[lang];
  const parts = topic.sections || [];
  const paragraph = (idx:number) => parts[idx]?.body || '';
  const sections = (title:string, children:ReactNode) => <section className="mb-10"><h2 className="font-display text-2xl font-semibold mb-4">{title}</h2>{children}</section>;
  const text = (body:string) => <p className="leading-relaxed" style={{color:'var(--text-secondary)'}}>{body}</p>;
  const route = [
    lang==='zh'?'从双教堂出发，在地图中选择步行路线':lang==='es'?'Empieza en Los Dos Templos y elige la ruta peatonal en el mapa':'Start at Los Dos Templos and select a walking route on the map',
    topic.routeAdvice || paragraph(5),
    lang==='zh'?'靠近景点后先观察正立面、入口及周围街道':lang==='es'?'Al llegar, observa la fachada, el acceso y las calles que lo rodean':'On arrival, inspect the façade, entrance and surrounding streets',
    lang==='zh'?'按现场开放安排继续参观，随后可衔接其他旧城景点':lang==='es'?'Comprueba el acceso del día y continúa con otros lugares del centro':'Check same-day access, then continue to other historic-centre landmarks',
  ];
  return <div className="mt-12" style={{color:'var(--text-primary)'}}>
    {sections(t.visit,text(topic.visitAdvice || paragraph(3)))}
    {sections(t.highlights,text(paragraph(1)))}
    {sections(t.opening,text(paragraph(3)))}
    {sections(t.tickets,text(lang==='zh'?'公共空间外部观赏不需要门票；室内场馆、展览和演出费用请以所属场馆实时公告为准。':lang==='es'?'Las vistas desde el espacio público no requieren boleto; para interiores, exposiciones o funciones, comprueba las tarifas actuales del recinto.':'Public-space views do not require a ticket. Check venue notices for any admission to interiors, exhibitions or performances.'))}
    {sections(t.transport,text(paragraph(4)))}
    {sections(t.discovery,<div className="grid sm:grid-cols-2 gap-4">{[[t.history,paragraph(0)],[t.architecture,paragraph(1)]].map(([title,body],i)=><article key={title} className="rounded-xl p-5" style={{background:'var(--card-bg)',border:'1px solid var(--border-color)'}}><span style={{color:'var(--accent)'}}>{i+1}</span><h3 className="font-display text-lg font-semibold my-2">{title}</h3>{text(body)}</article>)}</div>)}
    {sections(t.route,<ol className="space-y-3">{route.map((step,i)=><li key={i} className="flex gap-4"><span className="shrink-0 rounded-full w-8 h-8 flex items-center justify-center font-semibold" style={{border:'1px solid var(--border-color)',background:'var(--card-bg)'}}>{i+1}</span>{text(step)}</li>)}</ol>)}
    {sections(t.guidelines,text(paragraph(5)))}
    {sections(t.photos,<><ol className="space-y-3"><li className="flex gap-3"><span style={{color:'var(--accent)'}}>1.</span>{text(topic.photoAdvice || paragraph(6))}</li><li className="flex gap-3"><span style={{color:'var(--accent)'}}>2.</span>{text(paragraph(6))}</li></ol></>)}
    {sections(t.lodging,text(paragraph(7)))}
    {sections(t.reviews,<>{text(lang==='zh'?'可在该景点专属 Google 地图页面查看最新游客评分及评价数量。':lang==='es'?'Consulta la puntuación y las opiniones actuales de este lugar en su propia ficha de Google Maps.':'See current visitor ratings and review counts on this place’s own Google Maps listing.')}<a href={topic.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 underline" style={{color:'var(--accent)'}}>Google Maps · {topic.localName}</a></>)}
    {sections(t.map,<>{text(topic.address)}<a href={topic.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 underline" style={{color:'var(--accent)'}}>{lang==='zh'?'打开专属地图':lang==='es'?'Abrir mapa de este lugar':'Open this place on Maps'} · {topic.localName}</a></>)}
  </div>;
}
