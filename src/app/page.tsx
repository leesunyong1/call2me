'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

// ---------------------------------------------------------------------------
// 1. Navigation Component (공식 홈페이지 네비게이션: CALL2ME | 서비스 | 이용방법 | 사업자 로그인)
// ---------------------------------------------------------------------------
const Navbar = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const currentTheme = (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'light';
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('call2me-theme', nextTheme);
    } catch (e) {}
  };

  return (
    <header className="nav-header">
      <div className="container nav-container">
        <a href="/" className="nav-brand">
          CALL2ME
        </a>
        <nav className="nav-menu">
          <a href="#services" className="nav-link">서비스</a>
          <a href="#workflow" className="nav-link">이용방법</a>
        </nav>
        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="화면 모드 전환"
            title={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <a href="/admin" className="nav-btn-primary">사업자 로그인</a>
        </div>
      </div>
    </header>
  );
};

// ---------------------------------------------------------------------------
// 2. Timeline Ratio Calculator (실제 예약 시간 비율 기반 계산 헬퍼)
// ---------------------------------------------------------------------------
const START_HOUR = 14; // 14:00 기준
const PIXELS_PER_HOUR = 68;
const PIXELS_PER_MINUTE = PIXELS_PER_HOUR / 60; // 1분당 ~1.133px

// 120분은 60분의 정확히 2배 높이로 계산
const calculateSlotGeometry = (startHour: number, startMinute: number, durationMinutes: number) => {
  const elapsedMinutes = (startHour - START_HOUR) * 60 + startMinute;
  return {
    top: `${elapsedMinutes * PIXELS_PER_MINUTE}px`,
    height: `${durationMinutes * PIXELS_PER_MINUTE}px`,
  };
};

// ---------------------------------------------------------------------------
// 3. Hero Section : Frameless Integrated Space
// ---------------------------------------------------------------------------
const HeroSection = () => {
  // Stage: 0: 대기, 1: 문의 수신, 2: 조건 검토 & 16:00 불가 감지, 3: 17:30 슬롯 안착 완료
  const [stage, setStage] = useState<number>(3);
  const [isCompletedOnce, setIsCompletedOnce] = useState<boolean>(true);

  // 1회 자연스러운 순차 재생 후 멈춤 (무한 반복 X)
  const runDemoOnce = () => {
    setIsCompletedOnce(false);
    setStage(0);

    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 2000);
    const t3 = setTimeout(() => {
      setStage(3);
      setIsCompletedOnce(true);
    }, 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  const handleStepClick = (stepIndex: number) => {
    setIsCompletedOnce(true);
    setStage(stepIndex);
  };

  // 실제 시간 비율 기하구조 계산 (120분 = 60분의 2배)
  const existingSlotStyle = calculateSlotGeometry(14, 0, 90);  // 14:00 - 15:30 (90분)
  const conflictSlotStyle = calculateSlotGeometry(16, 0, 60);  // 16:00 (잔여 60분 슬롯)
  const dockedSlotStyle = calculateSlotGeometry(17, 30, 120);  // 17:30 - 19:30 (120분 = 60분의 정확히 2배 높이)

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        {/* Hero Left : Typography & Real Query */}
        <div className="hero-left">
          <h1 className="hero-headline">
            시술에 집중하는 동안,<br />
            예약은 정확한 시간에<br />
            안착됩니다.
          </h1>

          <p className="hero-description">
            손님의 모호한 문의 속에서 필요한 시술 조건을 계산하고,
            매장의 비어있는 일정에 오차 없이 정리합니다.
          </p>

          {/* 단정한 제품 데이터 스트립 (AI 표현 없음) */}
          <div className="hero-query-box">
            <span className="hero-query-label">고객 문의 수신</span>
            <div className="hero-query-quote">
              “토요일 4시에 젤 제거하고 시술 가능할까요?”
            </div>

            <AnimatePresence mode="wait">
              {stage >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="hero-constraint-strip"
                >
                  <div className="hero-constraint-row">
                    <span className="hero-constraint-item">시술 조건 검토</span>
                    <span className="hero-constraint-val">타샵 제거 30분 + 젤 시술 90분 = 총 120분 소요</span>
                  </div>
                  <div className="hero-constraint-row">
                    <span className="hero-constraint-item">매장 스케줄 대조</span>
                    <span className="hero-constraint-val">
                      {stage >= 2 ? '16:00 잔여 60분 불가 → 17:30 슬롯(120분 확보) 대안 제안' : '빈 시간 확인 중'}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hero-cta-group">
            <a href="/admin" className="btn-primary-lead">
              1:1 매장 도입 상담
            </a>
            <a href="#workflow" className="link-secondary-lead">
              예약 흐름 직접 보기 ↗
            </a>
          </div>
        </div>

        {/* Hero Right : Frameless Timeline Canvas */}
        <div className="hero-timeline-canvas">
          <div className="timeline-canvas-header">
            <span className="timeline-canvas-title">토요일 일정 타임라인</span>
            <div className="timeline-canvas-state">
              <span className="timeline-pulse-indicator" />
              <span>{stage === 3 ? '예약 안착 완료' : '실시간 슬롯 계산 중'}</span>
            </div>
          </div>

          <div className="timeline-grid">
            {/* Hours: 14:00 - 20:00 (각 1시간 = 68px 높이) */}
            <div className="timeline-hour-row" style={{ height: `${PIXELS_PER_HOUR}px` }}>
              <span className="timeline-hour-label">14:00</span>
            </div>
            <div className="timeline-hour-row" style={{ height: `${PIXELS_PER_HOUR}px` }}>
              <span className="timeline-hour-label">15:00</span>
            </div>
            <div className="timeline-hour-row" style={{ height: `${PIXELS_PER_HOUR}px` }}>
              <span className="timeline-hour-label">16:00</span>
            </div>
            <div className="timeline-hour-row" style={{ height: `${PIXELS_PER_HOUR}px` }}>
              <span className="timeline-hour-label">17:00</span>
            </div>
            <div className="timeline-hour-row" style={{ height: `${PIXELS_PER_HOUR}px` }}>
              <span className="timeline-hour-label">18:00</span>
            </div>
            <div className="timeline-hour-row" style={{ height: `${PIXELS_PER_HOUR}px` }}>
              <span className="timeline-hour-label">19:00</span>
            </div>
            <div className="timeline-hour-row" style={{ height: `${PIXELS_PER_HOUR}px` }}>
              <span className="timeline-hour-label">20:00</span>
            </div>

            {/* 기존 예약 (14:00 - 15:30, 90분 비율) */}
            <div
              className="slot-block-existing"
              style={{
                top: existingSlotStyle.top,
                height: existingSlotStyle.height,
              }}
            >
              <div>
                <div className="slot-block-title">박서연 님</div>
                <div className="slot-block-meta">이달의 아트 (90분)</div>
              </div>
              <div className="slot-block-meta">14:00 - 15:30</div>
            </div>

            {/* 16:00 충돌 표시 (요청 시간은 120분이나 잔여는 60분) */}
            <AnimatePresence>
              {stage >= 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="slot-conflict-indicator"
                  style={{
                    top: conflictSlotStyle.top,
                    height: conflictSlotStyle.height,
                  }}
                >
                  <span className="conflict-tag">16:00 요청 시간대</span>
                  <span className="conflict-reason">잔여 60분 (필요한 120분 충족 불가)</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* The Signature Docked Block (17:30 - 19:30, 120분 = 60분의 정확히 2배 높이) */}
            <AnimatePresence>
              {stage >= 3 && (
                <motion.div
                  initial={{ opacity: 0, width: '40%' }}
                  animate={{ opacity: 1, width: 'calc(100% - 72px)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="slot-block-docked"
                  style={{
                    top: dockedSlotStyle.top,
                    height: dockedSlotStyle.height,
                  }}
                >
                  <div className="docked-header">
                    <div>
                      <div className="docked-name">이수진 님</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.85, marginTop: '2px' }}>
                        젤 시술 + 타샵 제거 (120분)
                      </div>
                    </div>
                    <span className="docked-status-tag">예약 확정</span>
                  </div>
                  <div className="docked-details">
                    <span>17:30 - 19:30</span>
                    <span>조건 조율 후 자동 등록</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stepper & Replay Control */}
          <div className="timeline-stepper">
            <button
              onClick={runDemoOnce}
              className="stepper-btn"
              style={{ fontWeight: 600, color: 'var(--text-primary)' }}
            >
              ↺ 다시 체험하기
            </button>
            <div style={{ display: 'flex', gap: '0.25rem', marginLeft: 'auto' }}>
              <button
                className={`stepper-btn ${stage === 0 ? 'active' : ''}`}
                onClick={() => handleStepClick(0)}
              >
                대기
              </button>
              <button
                className={`stepper-btn ${stage === 1 ? 'active' : ''}`}
                onClick={() => handleStepClick(1)}
              >
                1. 문의
              </button>
              <button
                className={`stepper-btn ${stage === 2 ? 'active' : ''}`}
                onClick={() => handleStepClick(2)}
              >
                2. 검토
              </button>
              <button
                className={`stepper-btn ${stage === 3 ? 'active' : ''}`}
                onClick={() => handleStepClick(3)}
              >
                3. 안착
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// 4. Section 2 : The Unbroken Workflow (이용방법)
// ---------------------------------------------------------------------------
const WorkflowSection = () => {
  return (
    <section id="workflow" className="section-workflow">
      <div className="container">
        <div className="workflow-header">
          <div className="section-eyebrow">THE UNBROKEN WORKFLOW</div>
          <h2 className="workflow-title">
            젤 램프에 손을 넣는 60초.<br />
            그 짧은 틈마다 스마트폰을 켜야 했던 이유.
          </h2>
        </div>

        <div className="workflow-grid">
          <div>
            <div className="workflow-col-header">기존의 일상</div>
            <div className="workflow-item-list">
              <div className="workflow-item">
                <h3 className="workflow-item-title">손을 멈추고 캘린더를 확인합니다</h3>
                <p className="workflow-item-desc">
                  손님이 시술 중에 질문을 남기면, 장갑을 벗고 비어있는 시간을 직접 찾아 메시지를 보냅니다.
                  답장이 늦어지면 고객은 다른 샵을 찾아 떠납니다.
                </p>
              </div>
              <div className="workflow-item">
                <h3 className="workflow-item-title">“그 시간은 안 되는데, 다른 날은 어떠세요?”</h3>
                <p className="workflow-item-desc">
                  서너 번씩 카톡이 오가는 동안 다른 예약과 겹치거나,
                  소요 시간 계산을 잘못해 하루 전체 일정이 30분씩 밀리는 실수가 발생합니다.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="workflow-col-header">Call2Me가 만드는 일상</div>
            <div className="workflow-item-list">
              <div className="workflow-item">
                <h3 className="workflow-item-title">시술은 한 번도 멈추지 않습니다</h3>
                <p className="workflow-item-desc">
                  문의가 들어오는 즉시 매장의 비어있는 슬롯을 계산하여 손님과의 시간 조율을 자동으로 마칩니다.
                  원장님은 눈앞의 손님에게만 온전히 몰입합니다.
                </p>
              </div>
              <div className="workflow-item">
                <h3 className="workflow-item-title">정확한 일정만 캘린더에 남습니다</h3>
                <p className="workflow-item-desc">
                  시술 소요시간, 타샵 제거 유무, 앞뒤 정리 시간까지 계산하여
                  중복 예약 없이 완벽하게 확정된 블록만 캘린더에 등록됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="workflow-footer-note">
          <span>원장님은 오직 시술의 퀄리티와 고객 경험에만 집중하세요.</span>
          <span>1인 살롱부터 다인실 전문 스튜디오까지 지원</span>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// 5. Section 3 : The Silent Negotiation (서비스 상세)
// ---------------------------------------------------------------------------
interface ScenarioData {
  industry: string;
  query: string;
  analysis: string;
  proposal: string;
  result: string;
}

const SCENARIOS: ScenarioData[] = [
  {
    industry: '네일 살롱',
    query: '“금요일 6시 반에 타샵 젤 제거하고 그라데이션 가능해요? 연장도 한 개 부러졌어요.”',
    analysis: '타샵 제거(30m) + 그라데이션(80m) + 랩핑 연장 1개(15m) = 총 125분 소요',
    proposal: '18:30 슬롯은 마감까지 잔여 90분으로 불가. 17:00 또는 익일 11:00 슬롯 추천',
    result: '금요일 17:00 (125분 확보) 확정',
  },
  {
    industry: '헤어 스튜디오',
    query: '“내일 오후 3시에 셋팅펌하고 뿌리염색 같이 하고 싶은데 시간 되나요?”',
    analysis: '뿌리염색(60m) + 셋팅펌(120m) = 총 180분 연속 슬롯 필요',
    proposal: '15:00 중간 16:30 컷트 예약으로 인해 불가. 13:00 또는 17:00으로 대안 제시',
    result: '내일 13:00 (180분 확보) 확정',
  },
  {
    industry: '에스테틱 클리닉',
    query: '“일요일 2시에 윤곽관리 2인 동시 시술 가능한가요?”',
    analysis: '베드 2개 가용 여부 + 담당 관리사 2인 동시 스케줄 대조',
    proposal: '14:00 베드 1개 부족. 15:30 2베드 동시 가능 슬롯 안내',
    result: '일요일 15:30 (2인 동시) 확정',
  },
];

const NegotiationSection = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const activeScenario = SCENARIOS[selectedIdx];

  return (
    <section id="services" className="section-negotiation">
      <div className="container">
        <div className="negotiation-intro">
          <div>
            <div className="section-eyebrow">THE SILENT NEGOTIATION</div>
            <h2 className="negotiation-title">
              불가능한 시간을 거절하는 것이 아니라,<br />
              가장 완벽한 대안을 찾아냅니다.
            </h2>
          </div>
          <p className="negotiation-desc">
            고객이 원하는 시간이 마감되었을 때 단순히 안 된다고 답하지 않습니다.
            시술 세부 조건과 매장의 실제 여유 시간을 계산해, 고객이 흔쾌히 수락할 수 있는
            가장 가까운 슬롯을 찾아 매끄럽게 제안합니다.
          </p>
        </div>

        <div className="scenario-tabs">
          {SCENARIOS.map((item, idx) => (
            <button
              key={item.industry}
              className={`scenario-tab-btn ${selectedIdx === idx ? 'active' : ''}`}
              onClick={() => setSelectedIdx(idx)}
            >
              {item.industry}
            </button>
          ))}
        </div>

        <div className="scenario-display">
          <div className="scenario-left-box">
            <div>
              <span className="scenario-step-label">고객 요청</span>
              <div className="scenario-bubble" style={{ marginTop: '0.5rem' }}>
                {activeScenario.query}
              </div>
            </div>
            <div>
              <span className="scenario-step-label">조건 및 소요시간 판별</span>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-body)', marginTop: '0.5rem', lineHeight: '1.6' }}>
                {activeScenario.analysis}
              </div>
            </div>
          </div>

          <div className="scenario-right-box">
            <div>
              <span className="scenario-step-label">최적 대안 조율</span>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-body)', marginTop: '0.5rem', lineHeight: '1.6' }}>
                {activeScenario.proposal}
              </div>
            </div>

            <div className="scenario-resolution-box">
              <span className="resolution-title">최종 캘린더 확정 결과</span>
              <span className="resolution-val">{activeScenario.result}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// 6. Section 4 : Smart Handoff (예약 확정 직전 인계 단계)
// ---------------------------------------------------------------------------
const HandoffSection = () => {
  return (
    <section className="section-handoff">
      <div className="container handoff-grid">
        <div className="handoff-content">
          <div className="section-eyebrow">SMART HANDOFF</div>
          <h2 className="handoff-title">
            대화가 끝나면,<br />
            정리된 예약서로 즉시 인계됩니다.
          </h2>
          <p className="handoff-desc">
            고객과 예약 조건이 합의되는 즉시 메뉴, 일시, 소요시간, 예상금액, 고객 정보가
            모두 채워진 예약 확정 직전 화면으로 매끄럽게 연결됩니다.
            단순 대화에 그치지 않고 실제 예약 결제와 원장님 캘린더 등록까지 오차 없이 완결됩니다.
          </p>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', borderTop: '1px solid var(--line-hairline)', paddingTop: '1.5rem' }}>
            고객 대화 → 예약 조건 조율 → Smart Handoff → 결제 및 최종 확정
          </div>
        </div>

        <div className="handoff-card">
          <div className="handoff-card-header">
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              예약 확정 직전 인계서
            </span>
            <span className="handoff-badge">조건 조율 완료</span>
          </div>

          <div className="handoff-summary-row">
            <span className="handoff-summary-label">시술 메뉴</span>
            <span className="handoff-summary-val">젤네일 기본 + 타샵 젤 제거</span>
          </div>

          <div className="handoff-summary-row">
            <span className="handoff-summary-label">예약 일시</span>
            <span className="handoff-summary-val">10월 10일 (토) 17:30 - 19:30</span>
          </div>

          <div className="handoff-summary-row">
            <span className="handoff-summary-label">소요 시간</span>
            <span className="handoff-summary-val">120분 (타샵제거 30m + 시술 90m)</span>
          </div>

          <div className="handoff-summary-row">
            <span className="handoff-summary-label">예상 금액</span>
            <span className="handoff-summary-val">70,000원 (예약금 20,000원)</span>
          </div>

          <div className="handoff-summary-row">
            <span className="handoff-summary-label">고객 정보</span>
            <span className="handoff-summary-val">이수진 님 (010-****-5821)</span>
          </div>

          <div style={{ borderTop: '1px solid var(--line-hairline)', paddingTop: '1rem' }}>
            <button
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--text-inverted)',
                backgroundColor: 'var(--bg-block-solid)',
                padding: '0.55rem 1.1rem',
                borderRadius: '4px',
                width: '100%',
              }}
            >
              최종 예약 확정 및 캘린더 등록
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// 7. Section 5 : The Owner's Day (Full Schedule Timeline)
// ---------------------------------------------------------------------------
const OwnerSection = () => {
  return (
    <section className="section-owner">
      <div className="container">
        <div className="owner-header">
          <div className="section-eyebrow">THE OWNER'S CONSOLE</div>
          <h2 className="owner-title">
            출근해서 캘린더를 켜는 순간,<br />
            오늘 하루의 동선이 정돈되어 있습니다.
          </h2>
        </div>

        <div className="owner-schedule-board">
          <div className="schedule-row">
            <div className="schedule-time">10:00 - 11:30</div>
            <div className="schedule-client-info">
              <span className="schedule-client-name">정예원 님</span>
              <span className="schedule-service">기본 젤네일 + 타샵제거</span>
            </div>
            <div className="schedule-badge">Call2Me 조율 확정</div>
          </div>

          <div className="schedule-row">
            <div className="schedule-time">11:45 - 13:15</div>
            <div className="schedule-client-info">
              <span className="schedule-client-name">김도연 님</span>
              <span className="schedule-service">이달의 아트 (풀컬러 변경)</span>
            </div>
            <div className="schedule-badge">기존 회원 예약</div>
          </div>

          <div className="schedule-row">
            <div className="schedule-time">14:00 - 15:30</div>
            <div className="schedule-client-info">
              <span className="schedule-client-name">박서연 님</span>
              <span className="schedule-service">이달의 아트</span>
            </div>
            <div className="schedule-badge">Call2Me 조율 확정</div>
          </div>

          <div className="schedule-row" style={{ backgroundColor: 'var(--bg-surface-subtle)' }}>
            <div className="schedule-time" style={{ color: 'var(--text-primary)' }}>17:30 - 19:30</div>
            <div className="schedule-client-info">
              <span className="schedule-client-name">이수진 님 (방금 안착)</span>
              <span className="schedule-service">젤 시술 + 타샵 제거 (120분)</span>
            </div>
            <div className="schedule-badge highlight">방금 자동 등록 완료</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// 8. Section 6 : Target & Scope
// ---------------------------------------------------------------------------
const TargetSection = () => {
  return (
    <section className="section-target">
      <div className="container">
        <div className="target-header">
          <div className="section-eyebrow">WHO IT'S FOR</div>
          <h2 className="target-title">
            시술 중에 전화나 메시지를 받기 어려운<br />
            모든 예약제 매장을 위해.
          </h2>
        </div>

        <div className="target-grid">
          <div className="target-col">
            <h3 className="target-col-title">1인 프라이빗 뷰티살롱</h3>
            <p className="target-col-desc">
              네일, 속눈썹, 왁싱 등 시술 장갑을 벗기 힘든 1인 원장님 매장에서
              예약 응대로 인한 시술 흐름 단절을 완전히 없앱니다.
            </p>
          </div>
          <div className="target-col">
            <h3 className="target-col-title">헤어 & 바버 스튜디오</h3>
            <p className="target-col-desc">
              디자이너별 시술 소요시간(펌, 염색, 컷)과 좌석 현황을 실시간으로 대조하여
              밀리는 시간 없이 회전율을 극대화합니다.
            </p>
          </div>
          <div className="target-col">
            <h3 className="target-col-title">에스테틱 & 피부 클리닉</h3>
            <p className="target-col-desc">
              베드 수와 기기 가용 여부를 체크하고, 
              노쇼 방지 규정 안내와 예약금 확인 절차까지 일관되게 정착시킵니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// 9. Section 7 : Final Call to Action
// ---------------------------------------------------------------------------
const CtaSection = () => {
  return (
    <section className="section-cta">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">
            예약에 쏟던 에너지를,<br />
            온전히 시술에만 집중하세요.
          </h2>
          <p className="cta-desc">
            매장의 기존 캘린더와 카카오톡 채널에 간편하게 연결됩니다.
            복잡한 설정 없이 원장님의 매장 규정에 맞게 즉시 도입할 수 있습니다.
          </p>
          <div className="cta-actions">
            <a href="/admin" className="btn-cta-primary">
              1:1 매장 도입 상담
            </a>
            <a href="#services" className="link-cta-secondary">
              자주 묻는 질문 살펴보기 →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// 10. Footer
// ---------------------------------------------------------------------------
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">CALL2ME</div>
          <div className="footer-meta">
            예약 운영 자동화 인프라 · 서비스 이용약관 · 개인정보처리방침<br />
            서울특별시 강남구 테헤란로 · 고객센터 문의: support@call2me.io
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Call2Me Inc. All rights reserved.</span>
          <span>정밀 예약 조율 시스템</span>
        </div>
      </div>
    </footer>
  );
};

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <WorkflowSection />
        <NegotiationSection />
        <HandoffSection />
        <OwnerSection />
        <TargetSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
