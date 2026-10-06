import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Call2Me - 시술에 집중하는 동안 완성되는 예약 인프라',
  description: '손님의 문의 속에서 시술 조건을 계산하고, 매장의 빈 일정에 오차 없이 정리합니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('call2me-theme');
                  var pref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var theme = saved || pref;
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
