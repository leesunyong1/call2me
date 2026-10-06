'use client';

import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F7F5', color: '#111111', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '3rem auto', backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '8px', border: '1px solid rgba(17,17,17,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(17,17,17,0.08)', paddingBottom: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#7C7C7C', letterSpacing: '0.04em' }}>
              ADMIN CONSOLE
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.25rem 0 0', letterSpacing: '-0.02em' }}>
              사업자 관리자 센터
            </h1>
          </div>
          <Link href="/" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111111' }}>
            ← 공식 홈페이지로
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: '#F7F7F5', borderRadius: '6px', border: '1px solid rgba(17,17,17,0.06)' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>스마트 캘린더 연동</div>
            <p style={{ fontSize: '0.8125rem', color: '#555555', marginTop: '0.5rem', lineHeight: '1.5' }}>
              네이버 예약, 구글 캘린더 등 매장 외부 캘린더와의 실시간 동기화 상태를 관리합니다.
            </p>
          </div>
          <div style={{ padding: '1.5rem', backgroundColor: '#F7F7F5', borderRadius: '6px', border: '1px solid rgba(17,17,17,0.06)' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>시술 및 슬롯 정책 설정</div>
            <p style={{ fontSize: '0.8125rem', color: '#555555', marginTop: '0.5rem', lineHeight: '1.5' }}>
              메뉴별 기본 소요 시간, 타샵 제거 추가 시간, 정리 버퍼 시간 등을 매장 규정에 맞게 지정합니다.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '0.8125rem', color: '#7C7C7C', borderTop: '1px solid rgba(17,17,17,0.08)', paddingTop: '1.25rem' }}>
          ※ Step 2 정보구조 분리 완료 (추후 Admin 기능 및 DB 연동 단계에서 확장 구현)
        </div>
      </div>
    </div>
  );
}
