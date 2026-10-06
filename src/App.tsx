import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, ChevronRight } from 'lucide-react';
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

function App() {
  return (
    <>
      <Navbar />
      <main>
        <section className="hero">
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
