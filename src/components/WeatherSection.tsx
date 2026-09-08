'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

type AlertEvent = { event?: string; start?: string; end?: string };

type WeatherData = {
  current?: {
    temperature_2m?: number;
    apparent_temperature?: number;
    relative_humidity_2m?: number;
    weather_code?: number;
    wind_speed_10m?: number;
    is_day?: number;
  };
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    uv_index_max?: number[];
    precipitation_probability_max?: number[];
    sunrise?: string[];
    sunset?: string[];
  };
  alerts?: { events?: AlertEvent[] };
};

const intlLocale: Record<string, string> = { zh: 'zh-CN', en: 'en', es: 'es' };

// 客户端兜底查询（生产环境由 Cloudflare Worker 代理并缓存，页面不出现任何技术说明）
const DIRECT_QUERY =
  'latitude=20.6719739&longitude=-103.3472266&current=weather_code,temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max,sunrise,sunset&timezone=America%2FMexico_City&forecast_days=7&wind_speed_unit=kmh&alerts=true';

function describeWeather(code: number | undefined): { key: string; icon: string } {
  if (code === undefined) return { key: 'cloudy', icon: '☁️' };
  if (code === 0) return { key: 'sunny', icon: '☀️' };
  if (code === 1 || code === 2) return { key: 'partly', icon: '⛅' };
  if (code === 3) return { key: 'cloudy', icon: '☁️' };
  if (code === 45 || code === 48) return { key: 'fog', icon: '🌫️' };
  if (code >= 51 && code <= 57) return { key: 'drizzle', icon: '🌦️' };
  if (code >= 61 && code <= 67) return { key: 'rain', icon: '🌧️' };
  if (code >= 71 && code <= 77) return { key: 'snow', icon: '❄️' };
  if (code >= 80 && code <= 82) return { key: 'showers', icon: '🌧️' };
  if (code === 85 || code === 86) return { key: 'snowShowers', icon: '🌨️' };
  if (code >= 95 && code <= 99) return { key: 'thunder', icon: '⛈️' };
  return { key: 'cloudy', icon: '☁️' };
}

// 降雨强度分级：-1 无雨 / 毛毛雨 / 小雨 / 中雨 / 大雨 / 雷雨 / 雪
function rainLevel(code: number | undefined): string {
  if (code === undefined) return 'none';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code === 61 || code === 80) return 'light';
  if (code === 63 || code === 81) return 'moderate';
  if (code === 65 || code === 66 || code === 67 || code === 82) return 'heavy';
  if (code >= 95 && code <= 99) return 'thunder';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow';
  return 'none';
}

const ITEM_ICONS: Record<string, string> = {
  umbrella: '🌂',
  fold: '☂️',
  raincoat: '🧥',
  sunscreen: '🧴',
  sunglasses: '🕶️',
  hat: '👒',
  water: '💧',
  jacketThin: '🧥',
  jacketWarm: '🧥',
  scarf: '🧣',
};

function uvLevelIndex(uv: number | undefined): number {
  if (uv === undefined) return 0;
  if (uv <= 2) return 0;
  if (uv <= 5) return 1;
  if (uv <= 7) return 2;
  if (uv <= 10) return 3;
  return 4;
}

function windLevelIndex(kmh: number | undefined): number {
  if (kmh === undefined) return 0;
  if (kmh < 11) return 0;
  if (kmh < 29) return 1;
  if (kmh < 39) return 2;
  if (kmh < 50) return 3;
  return 4;
}

export default function WeatherSection() {
  const t = useTranslations('weather');
  const locale = useLocale();
  const [data, setData] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      let res: Response;
      try {
        res = await fetch('/api/weather', { headers: { accept: 'application/json' } });
        if (!res.ok) throw new Error('proxy');
      } catch {
        res = await fetch(`https://api.open-meteo.com/v1/forecast?${DIRECT_QUERY}`);
      }
      const json = (await res.json()) as WeatherData & { ok?: boolean };
      if (json && (json.current || json.daily)) {
        setData(json);
        setStatus('ok');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const weekdayFmt = new Intl.DateTimeFormat(intlLocale[locale] || 'es', {
    weekday: 'short',
    month: 'numeric',
    day: 'numeric',
  });
  const dayLabel = (iso: string) => {
    const d = new Date(`${iso}T12:00:00`);
    return Number.isNaN(d.getTime()) ? iso : weekdayFmt.format(d);
  };

  const current = data?.current;
  const daily = data?.daily;
  const alertEvents = data?.alerts?.events || [];
  const cond = describeWeather(current?.weather_code);
  const level = rainLevel(current?.weather_code);
  const raining = level !== 'none' && level !== 'snow';

  const max = daily?.temperature_2m_max?.[0];
  const min = daily?.temperature_2m_min?.[0];
  const uv = daily?.uv_index_max?.[0];
  const probToday = daily?.precipitation_probability_max?.[0] ?? 0;
  const wind = current?.wind_speed_10m ?? 0;
  const code = current?.weather_code;
  const dayTime = (current?.is_day ?? 1) === 1;

  const T = (path: string) => t(path as any) as string;
  const S = (k: string) => T(`suggest.${k}`);
  const I = (k: string) => T(`items.${k}`);
  const R = (k: string) => T(`risk.${k}`);
  const uvWords = (t.raw('uvLevels') as string[]) || [];

  // ---- 建议引擎：只收录被触发的条目 ----
  const outfit: string[] = [];
  const plans: string[] = [];
  const risks: string[] = [];
  const items: string[] = [];
  const addOutfit = (s: string) => { if (s && !outfit.includes(s)) outfit.push(s); };
  const addPlan = (s: string) => { if (s && !plans.includes(s)) plans.push(s); };
  const addRisk = (s: string) => { if (s && !risks.includes(s)) risks.push(s); };
  const addItem = (k: string) => { if (k && !items.includes(k)) items.push(k); };

  // 雨 / 雷
  if (level === 'heavy') {
    addOutfit(S('outfitWet'));
    addPlan(S('actHeavyRain'));
    addRisk(R('heavyRain'));
    addItem('umbrella');
    addItem('raincoat');
  } else if (level === 'moderate') {
    addPlan(S('actModerateRain'));
    addItem('fold');
  } else if (level === 'light') {
    addPlan(S('actLightRain'));
    addItem('fold');
  } else if (level === 'drizzle') {
    addPlan(S('actDrizzle'));
    addItem('fold');
  }
  if (level === 'thunder') {
    addRisk(R('thunder'));
    addPlan(S('actThunder'));
    addItem('fold');
  }
  if (!raining && level !== 'snow' && probToday >= 60) {
    addPlan(S('actProbRain'));
    addItem('umbrella');
  }

  // 高温 / 闷热
  const currentTemp = current?.temperature_2m ?? 0;
  if (!raining && (max ?? 0) >= 32) {
    addOutfit(S('outfitHot'));
    addPlan(S('actHot'));
    addItem('sunscreen');
    addItem('hat');
    addItem('sunglasses');
    addItem('water');
  }
  const feels = current?.apparent_temperature;
  const humidity = current?.relative_humidity_2m;
  if (!raining && feels !== undefined && humidity !== undefined && feels >= 27 && humidity >= 55) {
    addOutfit(S('outfitStuffy'));
    addItem('water');
  }

  // 紫外线
  if (!raining && (uv ?? 0) >= 5) {
    addPlan(S('actUvStrong'));
    addItem('sunscreen');
    addItem('hat');
    addItem('sunglasses');
  }

  // 低温与昼夜温差
  if ((max ?? 99) <= 10) {
    addOutfit(S('outfitColdMax'));
    addItem('jacketWarm');
    addItem('scarf');
  } else if ((min ?? 99) <= 10) {
    addOutfit(S('outfitChilly'));
    addItem('jacketThin');
  } else if (max !== undefined && min !== undefined && max - min >= 9) {
    addOutfit(S('outfitRange'));
    addItem('jacketThin');
  }

  // 大风
  if (wind >= 50) {
    addRisk(R('gale'));
  } else if (wind >= 29) {
    addOutfit(S('outfitWind'));
  }

  // 天空状况（无雨时才给晴天/阴天建议）
  if (!raining && level !== 'snow') {
    if (code !== undefined && code <= 2) {
      if (dayTime) {
        addPlan(S('actSunny'));
        addPlan(S('actClearViews'));
      }
    } else if (code === 3) {
      addPlan(S('actOvercast'));
    } else if (code === 45 || code === 48) {
      addPlan(S('actFog'));
    }
  }

  const shortDate = (iso?: string) => {
    if (!iso) return '';
    const s = /[+-]\d{2}:\d{2}$/.test(iso) || iso.endsWith('Z') ? iso : `${iso}Z`;
    const d = new Date(s);
    return Number.isNaN(d.getTime())
      ? ''
      : d.toLocaleDateString(intlLocale[locale] || 'es', { month: 'numeric', day: 'numeric' });
  };

  const hasRisk = risks.length > 0 || alertEvents.length > 0;
  const showOutfit = outfit.length > 0;
  const showPlans = plans.length > 0;
  const showItems = items.length > 0;

  return (
    <section id="weather" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-sm font-semibold mb-2 tracking-wide" style={{ color: 'var(--accent)' }}>
          {t('eyebrow')}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {status === 'loading' && (
          <div className="rounded-xl p-8 text-center" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>{t('loading')}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="rounded-xl p-8 text-center" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>{t('error')}</p>
            <button
              onClick={load}
              className="mt-4 text-sm font-semibold px-5 py-2 rounded-full transition-opacity hover:opacity-80"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              {t('retry')}
            </button>
          </div>
        )}

        {status === 'ok' && current && daily && (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
            {/* ① 基础天气卡 */}
            <div className="p-6 sm:p-8" style={{ background: 'var(--bg-tertiary)' }}>
              <p className="font-display font-semibold mb-4 flex items-baseline gap-2" style={{ color: 'var(--text-primary)' }}>
                {t('todayLabel')}
                <span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>
                  {daily.time?.[0] ? dayLabel(daily.time[0]) : ''}
                </span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* 温度与天气 */}
                <div className="flex items-center gap-5">
                  <span className="text-6xl" role="img" aria-label={T(`codes.${cond.key}`)}>
                    {cond.icon}
                  </span>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold leading-none" style={{ color: 'var(--text-primary)' }}>
                        {Math.round(current.temperature_2m ?? 0)}°
                      </span>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                        {T(`codes.${cond.key}`)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {t('feels')} {Math.round(current.apparent_temperature ?? 0)}°
                    </p>
                  </div>
                </div>

                {/* 三枚数据徽章：降水 / 风 / 紫外线 */}
                <div className="flex flex-wrap gap-3 md:justify-center">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold"
                    style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    💧 {probToday}%
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold"
                    style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    🌬️ {Math.round(wind)} km/h
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold"
                    style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    ☀️ {t('uv')} {uvWords[uvLevelIndex(uv)] ?? ''}
                  </span>
                </div>

                {/* 日出日落 */}
                <div className="text-sm space-y-1.5 md:text-right">
                  {daily.sunrise?.[0] && (
                    <p style={{ color: 'var(--text-secondary)' }}>
                      {t('sunrise')} <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{daily.sunrise[0].slice(11, 16)}</span>
                    </p>
                  )}
                  {daily.sunset?.[0] && (
                    <p style={{ color: 'var(--text-secondary)' }}>
                      {t('sunset')} <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{daily.sunset[0].slice(11, 16)}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ② 智能建议核心区 */}
            <div className="px-6 sm:px-8 py-8" style={{ background: 'var(--bg-primary)' }}>
              <h3 className="font-display text-xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>
                {t('adviceTitle')}
              </h3>

              {/* 风险优先：红色置顶 */}
              {hasRisk && (
                <div
                  className="rounded-xl p-5 mb-6"
                  style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.4)' }}
                >
                  <p className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#dc2626' }}>
                    ⚠️ {t('riskTitle')}
                  </p>
                  {alertEvents.map((ev, i) => (
                    <p key={`alert-${i}`} className="text-sm leading-relaxed mb-1.5" style={{ color: 'var(--text-primary)' }}>
                      <strong style={{ color: '#dc2626' }}>⛔ {ev.event || t('alertTitle')}</strong>
                      {shortDate(ev.start) && (
                        <span style={{ color: 'var(--text-secondary)' }}> · {shortDate(ev.start)}{shortDate(ev.end) ? ` – ${shortDate(ev.end)}` : ''}</span>
                      )}
                    </p>
                  ))}
                  {alertEvents.length > 0 && (
                    <p className="text-sm leading-relaxed mt-1" style={{ color: 'var(--text-secondary)' }}>
                      {S('alertNote')}
                    </p>
                  )}
                  {risks.map((r, i) => (
                    <p key={`risk-${i}`} className="text-sm leading-relaxed mb-1.5 last:mb-0 flex gap-2" style={{ color: 'var(--text-primary)' }}>
                      <span aria-hidden="true">⚠️</span>
                      <span>{r}</span>
                    </p>
                  ))}
                </div>
              )}

              {/* 分组建议 */}
              <div className="space-y-5">
                {showOutfit && (
                  <div className="flex gap-4 items-start">
                    <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">👕</span>
                    <div className="flex-1">
                      <p className="font-semibold mb-2 text-sm" style={{ color: 'var(--text-primary)' }}>{t('groupOutfit')}</p>
                      <ul className="space-y-2">
                        {outfit.map((text, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                            {text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {showPlans && (
                  <div className="flex gap-4 items-start">
                    <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">🗺️</span>
                    <div className="flex-1">
                      <p className="font-semibold mb-2 text-sm" style={{ color: 'var(--text-primary)' }}>{t('groupPlan')}</p>
                      <ul className="space-y-2">
                        {plans.map((text, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                            {text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {showItems && (
                  <div className="flex gap-4 items-start">
                    <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">🎒</span>
                    <div className="flex-1">
                      <p className="font-semibold mb-2 text-sm" style={{ color: 'var(--text-primary)' }}>{t('groupItems')}</p>
                      <div className="flex flex-wrap gap-2">
                        {items.map((k) => (
                          <span
                            key={k}
                            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm"
                            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                          >
                            {ITEM_ICONS[k] && <span aria-hidden="true">{ITEM_ICONS[k]}</span>}
                            {I(k)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {!hasRisk && (
                <p className="mt-6 text-sm flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold" style={{ background: 'rgba(34,197,94,0.15)', color: '#16a34a' }}>
                    ✓
                  </span>
                  {t('noRisk')}
                </p>
              )}
            </div>

            {/* ③ 未来 6 日预报 */}
            <div className="px-6 sm:px-8 pb-7" style={{ background: 'var(--bg-secondary)' }}>
              <p className="font-display font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                {t('forecastLabel')}
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3">
                {(daily.time ?? []).slice(1, 7).map((iso, i) => {
                  const idx = i + 1;
                  const c = describeWeather(daily.weather_code?.[idx]);
                  return (
                    <div
                      key={iso}
                      className="rounded-xl p-3 text-center"
                      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                    >
                      <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{dayLabel(iso)}</p>
                      <span className="block text-2xl mb-2" role="img" aria-label={T(`codes.${c.key}`)}>{c.icon}</span>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {Math.round(daily.temperature_2m_max?.[idx] ?? 0)}°{' '}
                        <span style={{ color: 'var(--text-muted)' }}>{Math.round(daily.temperature_2m_min?.[idx] ?? 0)}°</span>
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        💧 {daily.precipitation_probability_max?.[idx] ?? 0}%
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
