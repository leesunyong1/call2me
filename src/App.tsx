import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, ChevronRight, Sparkles, Clock, CheckCircle2, ArrowDown } from 'lucide-react';
import './App.css';

const FadeIn = ({ children, delay = 0, y = 20 }: { children: React.ReactNode, delay?: number, y?: number }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2, rootMargin: '-50px 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="nav-logo">
          CALL2ME <div className="nav-logo-dot" />
        </div>
        <div className="nav-links">
          <a href="#" className="nav-link">서비스</a>
          <a href="#" className="nav-link">이용방법</a>
          <a href="#" className="nav-link login">사업자 로그인</a>
        </div>
      </div>
    </nav>
  );
};

const InteractiveHeroDemo = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s >= 4 ? 4 : s + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="demo-window">
      <div className="demo-header">
        <div className="demo-avatar"><div className="demo-avatar-dot" /></div>
        <div className="demo-title">Call2Me AI 직원</div>
      </div>
      <div className="demo-chat-area">
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="chat-bubble customer"
            >
              이번주 토요일 4시 젤네일 가능할까요? 제거도 같이 할게요.
            </motion.div>
          )}
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="chat-bubble ai"
            >
              토요일 4시는 예약이 어려워요.<br/>
              제거를 포함해 2시간이 소요되므로, 5시 30분은 어떠신가요?
            </motion.div>
          )}
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="chat-bubble customer"
            >
              네 5시 30분으로 해주세요!
            </motion.div>
          )}
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="demo-summary"
            >
              <div className="demo-summary-row">
                <span className="demo-summary-label">시술</span>
                <span className="demo-summary-value">젤네일 + 타샵제거</span>
              </div>
              <div className="demo-summary-row">
                <span className="demo-summary-label">일시</span>
                <span className="demo-summary-value">9/27 (토) 17:30</span>
              </div>
              <div className="demo-summary-row">
                <span className="demo-summary-label">예상금액</span>
                <span className="demo-summary-value">₩70,000</span>
              </div>
              <button className="demo-action-btn">예약 내용 확인</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const StepsSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="section">
      <div className="container">
        <FadeIn><h2 className="h2" style={{ marginBottom: '4rem' }}>예약은 세 마디면 끝납니다.</h2></FadeIn>
        <div className="steps-layout">
          <div className="steps-list">
            {[
              { num: '01', title: '편하게 말하기', desc: '고객이 자연어로 원하는 시술과 조건, 궁금한 점을 편하게 말합니다.' },
              { num: '02', title: '가능한 시간 안내', desc: 'Call2Me가 매장의 실제 영업시간, 브레이크타임, 기존 예약을 바탕으로 실시간 조율합니다.' },
              { num: '03', title: '내용 확인', desc: '대화를 통해 합의된 예약 내용을 깔끔하게 정리하여 마지막 확인을 받습니다.' }
            ].map((step, idx) => (
              <div 
                key={idx} 
                className={`step-item ${activeStep === idx ? 'active' : ''}`}
                onMouseEnter={() => setActiveStep(idx)}
              >
                <div className="step-num">{step.num}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <div className="step-visual">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.3 }}
                  style={{ textAlign: 'center', color: 'var(--text-tertiary)' }}
                >
                  {activeStep === 0 && "자연스러운 대화 UI 예시"}
                  {activeStep === 1 && "실시간 캘린더/조건 검토 UI 예시"}
                  {activeStep === 2 && "최종 요약 확인 UI 예시"}
                </motion.div>
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const EngineSection = () => {
  return (
    <section className="section workflow-section">
      <div className="container">
        <FadeIn><h2 className="h2" style={{ textAlign: 'center', marginBottom: '2rem' }}>AI가 판단하는 게 아니라,<br/>AI가 이해하고 시스템이 결정합니다.</h2></FadeIn>
        <FadeIn delay={0.2}>
          <div className="engine-diagram">
            <div className="engine-node">
              <div className="engine-node-box">
                <div className="engine-node-title">CUSTOMER</div>
                <div className="engine-node-content">"토요일 4시 젤제거 + 연장"</div>
              </div>
            </div>
            <ArrowRight className="engine-arrow" />
            <div className="engine-node">
              <div className="engine-node-box" style={{ borderColor: 'var(--accent-green)' }}>
                <div className="engine-node-title" style={{ color: 'var(--accent-green)' }}>AI PARSING</div>
                <div className="engine-node-content">의도, 시술, 날짜 추출</div>
              </div>
            </div>
            <ArrowRight className="engine-arrow" />
            <div className="engine-node">
              <div className="engine-node-box">
                <div className="engine-node-title">CALL2ME ENGINE</div>
                <div className="engine-node-content" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  영업시간 / 버퍼 / 기존예약 계산<br/>가능시간 도출
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const AdminPreviewSection = () => {
  return (
    <section className="section">
      <div className="container">
        <FadeIn>
          <div className="eyebrow">ADMIN PREVIEW</div>
          <h2 className="h2" style={{ marginTop: '0.5rem' }}>오늘 해야 할 일만 보여드립니다.</h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="admin-preview">
            <div className="admin-header">
              <div className="admin-stat">
                <div className="admin-stat-num">6</div>
                <div className="admin-stat-label">오늘 예약</div>
              </div>
              <div className="admin-stat">
                <div className="admin-stat-num" style={{ color: 'var(--accent-green)' }}>2</div>
                <div className="admin-stat-label">AI 조율 중</div>
              </div>
              <div className="admin-stat">
                <div className="admin-stat-num" style={{ color: '#EAB308' }}>1</div>
                <div className="admin-stat-label">확인 필요</div>
              </div>
            </div>
            <div className="admin-timeline">
              <div className="admin-timeline-item">
                <div style={{ width: '60px', fontWeight: 600, color: 'var(--text-secondary)' }}>10:00</div>
                <div style={{ flex: 1, fontWeight: 500 }}>김지영 고객님 (젤네일)</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>확정됨</div>
              </div>
              <div className="admin-timeline-item">
                <div style={{ width: '60px', fontWeight: 600, color: 'var(--text-secondary)' }}>13:00</div>
                <div style={{ flex: 1, fontWeight: 500 }}>박소민 고객님 (타샵제거 + 프렌치)</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>확정됨</div>
              </div>
              <div className="admin-timeline-item" style={{ background: 'rgba(120, 168, 137, 0.05)', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ width: '60px', fontWeight: 600, color: 'var(--accent-green)' }}>진행중</div>
                <div style={{ flex: 1, fontWeight: 500 }}>이유진 고객님 (예약 조율)</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--accent-green)' }}>AI 응답 완료</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const TargetSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const targets = [
    { title: '1인 네일샵', query: '"제거 포함하면 얼마나 걸려요? 아트도 할건데 추가금 있나요?"' },
    { title: '1인 속눈썹샵', query: '"리터치 가능한 시간이 있을까요? 2주 지났어요."' },
    { title: '1인 에스테틱', query: '"등 관리 받고 얼굴 윤곽 관리도 같이 당일 가능한가요?"' },
  ];

  return (
    <section className="section workflow-section">
      <div className="container">
        <FadeIn><h2 className="h2">매장의 업무 규칙을 이해합니다.</h2></FadeIn>
        <div className="target-grid">
          {targets.map((t, i) => (
            <div 
              key={i} 
              className={`target-card ${activeTab === i ? 'active' : ''}`}
              onMouseEnter={() => setActiveTab(i)}
            >
              <div style={{ fontWeight: 600, fontSize: '1.25rem' }}>{t.title}</div>
              <div className="target-example">{t.query}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PORTAL_SCENARIOS = [
  {
    id: 'aesthetic',
    name: '에스테틱 & 피부',
    badge: '💆‍♀️ 에스테틱',
    shop: '청담 오블리크 에스테틱 (1인 전문)',
    image: '/images/aesthetic.jpg',
    customerQuery: '오늘 저녁 7시 퇴근하고 윤곽관리 가능한가요? 물방울 리프팅도 같이요!',
    altQuery: '그럼 윤곽관리에 물방울 리프팅까지 하면 몇 시가 제일 빠를까요?',
    modOption: '물방울 리프팅 추가 (+30분)',
    parsedSteps: [
      { key: '시술 분석', val: '윤곽관리(60분) + 물방울(30분) = 90분' },
      { key: '매장 규칙', val: '1인 프라이빗 베드 / 소독 환기 버퍼 15분 필수' },
      { key: '시간 조율', val: '19:00 충돌 회피 → 19:45 최적 슬롯 확정' }
    ],
    aiResponse: '19시는 앞선 시술이 있어 어려워요. 두 시술(90분) 모두 여유 있게 가능한 19시 45분으로 잡아드릴까요?',
    summary: {
      treatment: '윤곽 리프팅 + 물방울 리프팅',
      time: '오늘 19:45 (90분)',
      price: '₩140,000'
    },
    ticker: '청담 오블리크 에스테틱 [윤곽+물방울 19:45 확정] • 방금 완료'
  },
  {
    id: 'waxing',
    name: '프리미엄 왁싱',
    badge: '🍯 왁싱 전문',
    shop: '한남 슈가링 라운지 (1:1 프라이빗)',
    image: '/images/waxing.jpg',
    customerQuery: '토요일 14시에 브라질리언 첫방문 예약 가능한가요? 진정팩도 같이요!',
    altQuery: '진정 케어 팩까지 같이 받으면 소요시간이 어떻게 되나요?',
    modOption: '진정 케어 팩 (+15분)',
    parsedSteps: [
      { key: '시술 분석', val: '첫방문 상담(15분) + 브라질리언(45분) + 진정(15분)' },
      { key: '매장 규칙', val: '1인 룸 방역 소독 및 베드 시트 교체 버퍼 15분' },
      { key: '시간 조율', val: '토요일 14:15 슬롯 실시간 즉시 매칭' }
    ],
    aiResponse: '첫 방문 상담과 진정팩 포함 총 75분이 소요돼요. 토요일 14:15에 바로 쾌적하게 준비해 드릴게요!',
    summary: {
      treatment: '브라질리언(첫방문) + 진정팩',
      time: '이번주 토 14:15 (75분)',
      price: '₩75,000'
    },
    ticker: '한남 슈가링 라운지 [브라질리언+진정팩 14:15 조율] • 방금 완료'
  },
  {
    id: 'hair',
    name: '1인 헤어살롱',
    badge: '✂️ 1인 헤어',
    shop: '성수 아틀리에 헤어 (1:1 바버/살롱)',
    image: '/images/hair.jpg',
    customerQuery: '이번주 일요일 3시쯤 레이어드컷이랑 뿌염 가능한 시간 있을까요?',
    altQuery: '뿌리염색까지 같이하면 혹시 샴푸대 때문에 대기 시간 생기나요?',
    modOption: '프리미엄 뿌염 (+60분)',
    parsedSteps: [
      { key: '시술 분석', val: '디자인컷(40분) + 프리미엄 뿌염(60분) = 100분' },
      { key: '매장 규칙', val: '샴푸대 중복 동선 불가 / 약제 방치 타임 반영' },
      { key: '시간 조율', val: '15:00 중복 회피 → 15:30 1:1 집중 슬롯 도출' }
    ],
    aiResponse: '15시는 샴푸대 작업과 겹쳐 번잡할 수 있어요. 온전히 집중해 드릴 수 있는 15:30 어떠신가요?',
    summary: {
      treatment: '시그니처 레이어드컷 + 뿌염',
      time: '일요일 15:30 (100분)',
      price: '₩110,000'
    },
    ticker: '성수 아틀리에 헤어 [레이어드컷+뿌염 15:30 확정] • 방금 완료'
  },
  {
    id: 'pt',
    name: '1:1 PT & 필라테스',
    badge: '🏋️‍♂️ 1:1 PT',
    shop: '판교 코어 핏 스튜디오 (1:1 개인레슨)',
    image: '/images/pt.jpg',
    customerQuery: '퇴근 후 저녁 8시에 1:1 체형교정 체험 레슨 가능한가요?',
    altQuery: '인바디 분석이랑 체형 상담까지 포함해서 당일 바로 되나요?',
    modOption: '인바디 심층 상담 (+20분)',
    parsedSteps: [
      { key: '시술 분석', val: '체형 분석(20분) + 맞춤 레슨(50분) = 70분' },
      { key: '매장 규칙', val: '프라이빗 룸 2번 가용성 및 트레이너 일정 매칭' },
      { key: '시간 조율', val: '20:00 룸 예약 만료 → 20:30 즉시 제안' }
    ],
    aiResponse: '20시는 프라이빗 룸이 마감되었어요. 20:30에 바로 여유 있게 체험 레슨 도와드릴 수 있습니다!',
    summary: {
      treatment: '1:1 체형교정 심층 체험 레슨',
      time: '오늘 20:30 (70분)',
      price: '체험 특가 ₩30,000'
    },
    ticker: '판교 코어 핏 스튜디오 [1:1 체형교정 20:30 조율] • 방금 완료'
  }
];

const FullscreenPortalIntro = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isOptionToggled, setIsOptionToggled] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Parallax movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { clientWidth, clientHeight } = currentTarget;
    const x = (clientX / clientWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / clientHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  // Auto rotate scenarios every 5.5s
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % PORTAL_SCENARIOS.length);
      setIsOptionToggled(false);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = PORTAL_SCENARIOS[activeIdx];

  const handleSelectScenario = (idx: number) => {
    setActiveIdx(idx);
    setIsOptionToggled(false);
  };

  const scrollToWebsite = () => {
    const target = document.getElementById('official-hero');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="portal-intro-section"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setMousePos({ x: 0, y: 0 });
      }}
    >
      {/* 1. Fullscreen Crossfading Photography Background with Opacity Layer */}
      <div className="portal-bg-viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="portal-bg-slide"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: mousePos.x * -18,
              y: mousePos.y * -14
            }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ 
              opacity: { duration: 0.9, ease: 'easeInOut' },
              scale: { duration: 1.2, ease: 'easeOut' },
              x: { duration: 0.3, ease: 'easeOut' },
              y: { duration: 0.3, ease: 'easeOut' }
            }}
          >
            <img 
              src={current.image} 
              alt={current.name} 
              className="portal-bg-img" 
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Dark/Warm Overlay with Subtle Opacity (시각적 깊이감과 가독성 확보) */}
        <div className="portal-overlay-tint" />
        <div className="portal-vignette" />
        <div className="portal-dot-matrix" />
      </div>

      {/* 2. Floating Parallax Chips in Background (에스테틱·왁싱·헤어·PT) */}
      <div className="portal-floating-field" aria-hidden="true">
        <motion.div 
          className="portal-float-chip top-left"
          animate={{
            x: mousePos.x * 24,
            y: mousePos.y * 20 + Math.sin(Date.now() / 1000) * 8
          }}
          transition={{ ease: 'easeOut', duration: 0.2 }}
        >
          <span className="float-chip-dot" />
          <span>청담 에스테틱 • 1인 베드 소독 버퍼 반영</span>
        </motion.div>

        <motion.div 
          className="portal-float-chip top-right"
          animate={{
            x: mousePos.x * -20,
            y: mousePos.y * -16
          }}
          transition={{ ease: 'easeOut', duration: 0.2 }}
        >
          <span className="float-chip-dot" />
          <span>한남 슈가링 • 브라질리언 75분 실시간 조율</span>
        </motion.div>

        <motion.div 
          className="portal-float-chip bottom-left"
          animate={{
            x: mousePos.x * 16,
            y: mousePos.y * 18
          }}
          transition={{ ease: 'easeOut', duration: 0.2 }}
        >
          <span className="float-chip-dot" />
          <span>성수 아틀리에 헤어 • 샴푸대 중복 회피 완료</span>
        </motion.div>

        <motion.div 
          className="portal-float-chip bottom-right"
          animate={{
            x: mousePos.x * -24,
            y: mousePos.y * -20
          }}
          transition={{ ease: 'easeOut', duration: 0.2 }}
        >
          <span className="float-chip-dot" />
          <span>판교 1:1 PT • 프라이빗 룸 2번 슬롯 매칭</span>
        </motion.div>
      </div>

      {/* 3. Portal Top Navigation Bar */}
      <header className="portal-header">
        <div className="portal-header-left">
          <span className="portal-brand">CALL2ME</span>
          <span className="portal-brand-dot" />
          <span className="portal-live-pill">
            <span className="portal-pulse" />
            <span>실시간 매장 조율 가동중</span>
          </span>
        </div>

        {/* Industry Switcher Tabs */}
        <nav className="portal-nav-tabs">
          {PORTAL_SCENARIOS.map((scenario, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={scenario.id}
                onClick={() => handleSelectScenario(idx)}
                className={`portal-tab-btn ${isActive ? 'active' : ''}`}
              >
                <span>{scenario.badge}</span>
                {isActive && (
                  <motion.div 
                    layoutId="portalActiveTabGlow"
                    className="portal-tab-glow"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="portal-header-right">
          <button onClick={scrollToWebsite} className="portal-login-link">
            공식 사이트 둘러보기
          </button>
        </div>
      </header>

      {/* 4. Main Interactive Center Stage */}
      <div className="portal-stage-container">
        <div className="portal-stage-grid">
          
          {/* Left Hero Statement */}
          <motion.div 
            className="portal-hero-copy"
            style={{
              transform: `translate3d(${mousePos.x * 8}px, ${mousePos.y * 8}px, 0)`
            }}
          >
            <div className="portal-eyebrow-badge">
              <Sparkles size={14} className="portal-accent-icon" />
              <span>1인 전문 매장을 위한 지능형 예약 엔진</span>
            </div>

            <h1 className="portal-headline">
              손을 멈추지 마세요.<br />
              <span className="portal-headline-accent">예약의 끝</span>까지<br />
              Call2Me가 조율합니다.
            </h1>

            <p className="portal-subtext">
              에스테틱 · 왁싱 · 헤어 · PT. 원장님이 시술하는 동안<br className="desktop-break" />
              고객이 조건을 바꾸고 시간을 망설여도 매장의 규칙을 계산해 스스로 확정짓습니다.
            </p>

            <div className="portal-hero-actions">
              <button onClick={scrollToWebsite} className="portal-btn-primary">
                <span>Call2Me 시작하기</span>
                <ArrowRight size={16} />
              </button>
              <div className="portal-stats-mini">
                <span className="stats-num">99.4%</span>
                <span className="stats-lbl">예약 자동 조율 성공률</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Interactive Live Engine Window (3D Perspective Tilting) */}
          <motion.div 
            className="portal-engine-window-wrapper"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 5}deg)`
            }}
          >
            <div className="portal-engine-window">
              
              {/* Window Header */}
              <div className="portal-window-header">
                <div className="window-shop-info">
                  <span className="window-live-indicator" />
                  <span className="window-shop-title">{current.shop}</span>
                </div>
                <div className="window-header-tag">
                  <span>Engine: Active</span>
                </div>
              </div>

              {/* Window Content with Dynamic Animation */}
              <div className="portal-window-body">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                    className="portal-engine-content"
                  >
                    {/* Customer Message Balloon */}
                    <div className="engine-step-box customer-box">
                      <div className="step-tag customer-tag">
                        <span>고객 실시간 문의</span>
                        <span className="step-time">방금 도착</span>
                      </div>
                      <div className="customer-bubble-text">
                        "{isOptionToggled ? current.altQuery : current.customerQuery}"
                      </div>
                    </div>

                    {/* Interactive Condition Toggle Trigger */}
                    <div className="engine-interactive-bar">
                      <button 
                        onClick={() => setIsOptionToggled(!isOptionToggled)}
                        className={`portal-mod-btn ${isOptionToggled ? 'toggled' : ''}`}
                      >
                        <span className="mod-btn-dot" />
                        <span>{isOptionToggled ? '옵션 원복하기' : `[+] ${current.modOption} 변경 시뮬레이션`}</span>
                      </button>
                    </div>

                    {/* Rule Engine Real-time Analysis Breakdown */}
                    <div className="engine-step-box analysis-box">
                      <div className="step-tag engine-tag">
                        <span className="engine-tag-dot" />
                        <span>Call2Me 엔진 규칙 대조 중</span>
                      </div>
                      
                      <div className="engine-rule-rows">
                        {current.parsedSteps.map((step, sIdx) => (
                          <motion.div 
                            key={sIdx}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: sIdx * 0.1 }}
                            className="rule-row"
                          >
                            <span className="rule-key">{step.key}</span>
                            <span className="rule-val">{step.val}</span>
                          </motion.div>
                        ))}
                      </div>

                      <div className="engine-ai-reply">
                        <p className="ai-reply-text">"{current.aiResponse}"</p>
                      </div>
                    </div>

                    {/* Final Confirmed Card */}
                    <div className="engine-step-box summary-box">
                      <div className="summary-header">
                        <div className="summary-title-row">
                          <CheckCircle2 size={16} className="summary-check-icon" />
                          <span className="summary-title">예약 조율 완료</span>
                        </div>
                        <span className="summary-status-pill">자동 등록 준비 완료</span>
                      </div>

                      <div className="summary-details">
                        <div className="summary-col">
                          <span className="s-lbl">확정 시술</span>
                          <span className="s-txt strong">{current.summary.treatment}</span>
                        </div>
                        <div className="summary-col">
                          <span className="s-lbl">일시</span>
                          <span className="s-txt">{current.summary.time}</span>
                        </div>
                        <div className="summary-col">
                          <span className="s-lbl">금액</span>
                          <span className="s-txt price">{current.summary.price}</span>
                        </div>
                      </div>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* 5. Portal Bottom Bar with Live Ticker & Scroll Cue */}
      <footer className="portal-footer">
        <div className="portal-ticker-wrap">
          <div className="portal-ticker-badge">LIVE</div>
          <AnimatePresence mode="wait">
            <motion.div 
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="portal-ticker-text"
            >
              {current.ticker}
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={scrollToWebsite} className="portal-scroll-cue">
          <span>스크롤하여 서비스 전체 살펴보기</span>
          <ArrowDown size={14} className="portal-bounce-arrow" />
        </button>
      </footer>
    </section>
  );
};

function App() {
  return (
    <>
      <Navbar />
      <main>
        {/* Fullscreen 100vh Interactive Portal Hero */}
        <FullscreenPortalIntro />

        <section className="hero" id="official-hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <FadeIn>
                <div className="eyebrow">CALL2ME</div>
                <h1 className="h1" style={{ marginTop: '1rem' }}>
                  예약 업무를 대신하는<br/>나만의 AI 직원.
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="body-large" style={{ marginTop: '0.5rem' }}>
                  고객 문의부터 예약 조율까지.<br/>
                  원장님이 시술하는 동안 Call2Me가 대신합니다.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="hero-actions">
                  <button className="btn-primary">사업자로 시작하기</button>
                  <button className="btn-secondary">Call2Me 알아보기</button>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.3} y={40}>
              <InteractiveHeroDemo />
            </FadeIn>
          </div>
        </section>

        <StepsSection />
        
        <section className="section">
          <div className="container">
            <div className="workflow-grid">
              <div>
                <FadeIn><h2 className="h1">대답하는 AI가 아니라,<br/>예약 업무를<br/>끝내는 AI.</h2></FadeIn>
              </div>
              <div className="workflow-list">
                {['문의 접수', '예약 의도 파악', '조건 확인 및 조율', '가용 시간 계산', 'Smart Handoff', '원장 확인'].map((step, idx) => (
                  <FadeIn key={idx} delay={idx * 0.1}>
                    <div className="workflow-item active">
                      <div className="workflow-dot" />
                      {step}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        <EngineSection />
        
        <section className="section">
          <div className="container">
            <FadeIn><div className="benefit-statement active">문의가 와도 전화를 잡지 않아도 됩니다.</div></FadeIn>
            <FadeIn delay={0.1}><div className="benefit-statement active">예약 조건이 바뀌어도 처음부터 다시 묻지 않습니다.</div></FadeIn>
            <FadeIn delay={0.2}><div className="benefit-statement active" style={{ marginBottom: 0 }}>고객이 시간을 고민하는 동안 앱을 들여다볼 필요가 없습니다.</div></FadeIn>
          </div>
        </section>

        <AdminPreviewSection />
        <TargetSection />

        <section className="section" style={{ textAlign: 'center', padding: '12rem 0' }}>
          <div className="container">
            <FadeIn>
              <h2 className="h1" style={{ marginBottom: '1.5rem' }}>예약 문의를<br/>직접 처리하지 않아도 되도록.</h2>
              <p className="body-large" style={{ marginBottom: '3rem' }}>원장님이 시술에 집중하는 동안 Call2Me가 고객과 예약을 조율합니다.</p>
              <div className="hero-actions" style={{ justifyContent: 'center' }}>
                <button className="btn-primary">사업자로 시작하기</button>
                <button className="btn-secondary">서비스 살펴보기</button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-links">
            <a href="#">CALL2ME</a>
            <a href="#">서비스</a>
            <a href="#">이용방법</a>
            <a href="#">사업자 로그인</a>
          </div>
          <div className="footer-brand">
            Powered by Call2Me
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
