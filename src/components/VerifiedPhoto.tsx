'use client';

import { useState } from 'react';

export default function VerifiedPhoto({
  src,
  alt,
  source,
  locale,
}: {
  src: string;
  alt: string;
  source?: string;
  locale: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="mb-10">
      {failed ? (
        <div className="rounded-xl p-8 text-center" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
          <p className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {locale === 'zh' ? '暂时无法加载此景点实景照片' : locale === 'es' ? 'La fotografía no está disponible temporalmente' : 'This location photo is temporarily unavailable'}
          </p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {locale === 'zh' ? '可通过下方来源链接查看此景点的公开照片。' : locale === 'es' ? 'Consulta las imágenes del lugar mediante el enlace de la fuente.' : 'View location-specific photos through the source link below.'}
          </p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full max-h-96 object-cover rounded-xl"
          onError={() => setFailed(true)}
        />
      )}
      {source && (
        <figcaption className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
          <a href={source} target="_blank" rel="noopener noreferrer" className="underline">
            Wikimedia Commons · {locale === 'zh' ? '景点实景照片来源' : locale === 'es' ? 'Fotografías de este lugar' : 'Photos of this landmark'}
          </a>
        </figcaption>
      )}
    </figure>
  );
}
