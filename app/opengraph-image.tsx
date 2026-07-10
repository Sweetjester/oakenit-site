import { ImageResponse } from 'next/og';

export const alt = 'OakenIT — Tell us what you need.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#12100c',
          color: '#f2eadb',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Honey glow */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '500px',
            background:
              'radial-gradient(ellipse, rgba(212,164,55,0.35), transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Top row — eyebrow + dot */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            fontSize: '20px',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            color: '#a68158',
            fontFamily: 'sans-serif',
            fontWeight: 500,
          }}
        >
          <div
            style={{
              width: '50px',
              height: '2px',
              background: '#a68158',
              display: 'flex',
            }}
          />
          <span>Development · Systems · Consulting</span>
        </div>

        {/* Main headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 0.98,
            fontSize: '160px',
            letterSpacing: '-3px',
            fontWeight: 500,
          }}
        >
          <span style={{ color: '#f2eadb' }}>Tell us</span>
          <span
            style={{
              color: '#a68158',
              fontStyle: 'italic',
              marginTop: '4px',
            }}
          >
            what you need.
          </span>
        </div>

        {/* Bottom row — wordmark + URL */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span
              style={{
                fontSize: '40px',
                fontWeight: 600,
              }}
            >
              <span style={{ color: '#a68158' }}>Oaken</span>
              <span style={{ color: '#f2eadb' }}>IT</span>
            </span>
            <span
              style={{
                fontSize: '20px',
                color: '#c5b898',
                fontFamily: 'sans-serif',
                fontWeight: 400,
              }}
            >
              AI-augmented technical team for UK businesses.
            </span>
          </div>
          <div
            style={{
              fontSize: '22px',
              color: '#a68158',
              fontFamily: 'sans-serif',
              fontWeight: 500,
              letterSpacing: '1px',
            }}
          >
            oakenit.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
