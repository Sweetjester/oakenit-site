import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'OakenIT — Technology that makes your business easier to run.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  // Inline the mark — next/og can't fetch relative URLs at build time.
  const mark = await readFile(join(process.cwd(), 'public', 'mark.png'));
  const markSrc = `data:image/png;base64,${mark.toString('base64')}`;

  // next/og has no serif of its own — the display face is bundled in the repo
  // (app/fonts) so the card matches the site without a build-time network fetch.
  const [display, sans] = await Promise.all([
    readFile(join(process.cwd(), 'app', 'fonts', 'Prata-Regular.ttf')),
    readFile(join(process.cwd(), 'app', 'fonts', 'Inter-Regular.ttf')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#031507',
          color: '#f3ece3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '76px',
          fontFamily: 'Prata',
          position: 'relative',
        }}
      >
        {/* Lantern glow */}
        <div
          style={{
            position: 'absolute',
            top: '-220px',
            left: '46%',
            transform: 'translateX(-50%)',
            width: '1000px',
            height: '560px',
            background: 'radial-gradient(ellipse, rgba(237,162,27,0.30), transparent 70%)',
            display: 'flex',
          }}
        />

        {/* The mark, ghosted at the right edge */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={markSrc}
          alt=""
          width={560}
          height={560}
          style={{ position: 'absolute', right: '-90px', bottom: '-70px', opacity: 0.22 }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            fontSize: '20px',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            color: '#f7c04a',
            fontFamily: 'Inter',
            fontWeight: 500,
          }}
        >
          <div style={{ width: '50px', height: '2px', background: '#f7c04a', display: 'flex' }} />
          <span>Software · Infrastructure · Automation</span>
        </div>

        {/* Headline — satori lays flex children in a row, so each line is its
            own flex container rather than relying on text wrapping. */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: '70px',
            lineHeight: 1.14,
            letterSpacing: '-1.5px',
            color: '#f3ece3',
          }}
        >
          <span>Technology that makes</span>
          <div style={{ display: 'flex' }}>
            <span>your business&nbsp;</span>
            <span style={{ color: '#f7c04a' }}>easier to run.</span>
          </div>
        </div>

        {/* Lockup + URL */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={markSrc} alt="" width={64} height={64} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '38px', color: '#f3ece3' }}>OakenIT</span>
              <span
                style={{
                  fontSize: '20px',
                  color: '#bcc9bd',
                  fontFamily: 'Inter',
                  fontWeight: 400,
                }}
              >
                Senior expertise without the consultancy overhead.
              </span>
            </div>
          </div>
          <div
            style={{
              fontSize: '22px',
              color: '#f7c04a',
              fontFamily: 'Inter',
              fontWeight: 500,
              letterSpacing: '1px',
            }}
          >
            oakenit.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Prata', data: display, weight: 400, style: 'normal' },
        { name: 'Inter', data: sans, weight: 400, style: 'normal' },
      ],
    }
  );
}
