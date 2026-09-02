import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'OakenIT — We help businesses kickstart their IT.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  // Inline the mark — next/og can't fetch relative URLs at build time.
  const mark = await readFile(join(process.cwd(), 'public', 'mark.png'));
  const markSrc = `data:image/png;base64,${mark.toString('base64')}`;

  // next/og has no serif of its own — the display face is bundled in the repo
  // (app/fonts) so the card matches the site without a build-time network fetch.
  const [display, wordmark, sans] = await Promise.all([
    readFile(join(process.cwd(), 'app', 'fonts', 'Manrope-ExtraBold.ttf')),
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
          fontFamily: 'Manrope',
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
            background: 'radial-gradient(ellipse, rgba(127,187,53,0.26), transparent 70%)',
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
            color: '#a0d850',
            fontFamily: 'Inter',
            fontWeight: 500,
          }}
        >
          <div style={{ width: '50px', height: '2px', background: '#a0d850', display: 'flex' }} />
          <span>Software · Infrastructure · Automation</span>
        </div>

        {/* Headline — satori lays flex children in a row, so each line is its
            own flex container rather than relying on text wrapping. */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: '66px',
            lineHeight: 1.12,
            letterSpacing: '-3px',
            color: '#f3ece3',
          }}
        >
          <span>We help businesses</span>
          <span style={{ color: '#a0d850' }}>kickstart their IT.</span>
        </div>

        {/* Lockup + URL */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={markSrc} alt="" width={64} height={64} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontFamily: 'Prata', fontSize: '38px', color: '#f3ece3' }}>OakenIT</span>
              <span
                style={{
                  fontSize: '20px',
                  color: '#bcc9bd',
                  fontFamily: 'Inter',
                  fontWeight: 400,
                }}
              >
                Software and infrastructure for common and niche business problems.
              </span>
            </div>
          </div>
          <div
            style={{
              fontSize: '22px',
              color: '#a0d850',
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
        { name: 'Manrope', data: display, weight: 800, style: 'normal' },
        { name: 'Prata', data: wordmark, weight: 400, style: 'normal' },
        { name: 'Inter', data: sans, weight: 400, style: 'normal' },
      ],
    }
  );
}
