'use client';

import { use } from 'react';
import Link from 'next/link';

interface ShopPageProps {
  params: Promise<{
    shopSlug: string;
  }>;
}

export default function ShopReservationPage({ params }: ShopPageProps) {
  const { shopSlug } = use(params);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F7F5', color: '#111111', padding: '2rem' }}>
      <div style={{ maxWidth: '600px', margin: '4rem auto', backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '8px', border: '1px solid rgba(17,17,17,0.08)' }}>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#7C7C7C', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          고객 예약 전용 화면
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0.75rem 0 1.5rem', letterSpacing: '-0.02em' }}>
          {shopSlug} 예약 안내
        </h1>
        <p style={{ fontSize: '0.9375rem', color: '#3F3F3F', lineHeight: '1.6', marginBottom: '2rem' }}>
          매장 맞춤형 예약 조율 및 스마트 핸드오프 플로우가 진행되는 고객 전용 인터페이스입니다.
        </p>

        <div style={{ borderTop: '1px solid rgba(17,17,17,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8125rem', color: '#7C7C7C' }}>CALL2ME RESERVATION</span>
          <Link href="/" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111111' }}>
            ← 공식 홈페이지로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}
