// Cloudflare Worker：静态资源 + 天气数据代理（带边缘缓存）
// 页面仍为纯静态导出，动态天气通过本 Worker 提供的 /api/weather 获取。

const WEATHER_API =
  'https://api.open-meteo.com/v1/forecast?latitude=20.6719739&longitude=-103.3472266&current=weather_code,temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max,sunrise,sunset&timezone=America%2FMexico_City&forecast_days=7&wind_speed_unit=kmh&alerts=true';

async function handleWeather(ctx) {
  const cached = await caches.default.match(WEATHER_API);
  if (cached) return cached;

  try {
    const upstream = await fetch(WEATHER_API, {
      headers: { accept: 'application/json' },
      cf: { cacheTtl: 600 },
    });
    if (!upstream.ok) throw new Error(`upstream ${upstream.status}`);

    const data = await upstream.json();
    const payload = JSON.stringify({
      ok: true,
      fetchedAt: new Date().toISOString(),
      current: data.current,
      daily: data.daily,
      alerts: data.alerts,
    });

    const response = new Response(payload, {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=600',
      },
    });
    ctx.waitUntil(caches.default.put(WEATHER_API, response.clone()));
    return response;
  } catch (err) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 502,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store',
      },
    });
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 0) Canonical host: redirect www -> apex and http -> https (P0 from SEO audit).
    //    The site canonicalizes to https://losdostemplos.com everywhere; unify the host here.
    const host = url.hostname;
    const proto = (request.headers.get('x-forwarded-proto') || url.protocol).replace(':', '');
    if (host.startsWith('www.') || proto === 'http') {
      const target = new URL(request.url);
      if (host.startsWith('www.')) target.hostname = host.replace(/^www\./, '');
      target.protocol = 'https:';
      return Response.redirect(target.toString(), 301);
    }

    // 1) 天气数据代理
    if (url.pathname === '/api/weather') {
      return handleWeather(ctx);
    }

    // 2) 站点根路径默认跳转到西班牙语首页
    if (url.pathname === '/') {
      return Response.redirect(new URL('/es', request.url), 302);
    }

    // 3) 静态资源（含扩展名直接命中）
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    // 4) 无扩展名的“漂亮 URL”回退：/es -> /es.html、/zh/privacy-policy -> /zh/privacy-policy.html
    if (!/\.[a-zA-Z0-9]+$/.test(url.pathname)) {
      const altUrl = new URL(request.url);
      altUrl.pathname = `${url.pathname.replace(/\/+$/, '')}.html`;
      const alt = await env.ASSETS.fetch(new Request(altUrl, request));
      if (alt.status !== 404) return alt;
    }

    // 5) 兜底 404 页
    return env.ASSETS.fetch(new URL('/404.html', request.url));
  },
};
