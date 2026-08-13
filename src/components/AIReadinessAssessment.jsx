import React, { useEffect, useMemo, useRef, useState } from "react";

const animatedBorderStyles = `
  @keyframes rotateGradient {
    0% { --angle: 0deg; }
    100% { --angle: 360deg; }
  }
  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
  .premium-border-card.ai-readiness {
    position: relative;
    border-radius: 40px;
    padding: 50px;
    overflow: hidden;
    backdropFilter: blur(18px);
    width: 100%;
    box-sizing: border-box;
    background: #0F1622;
  }
  .premium-border-card.ai-readiness::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 40px;
    padding: 2px;
    background: conic-gradient(from var(--angle), #60A5FA, #A855F7, #EC4899, #F97316, #60A5FA);
    animation: rotateGradient 4s linear infinite;
    z-index: -1;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
  .premium-border-card.ai-readiness::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 40px;
    background: linear-gradient(135deg, rgba(37,99,235,0.25), rgba(15,23,42,0.95));
    z-index: -2;
  }
  .premium-border-card.ai-readiness:hover::before {
    filter: blur(3px);
    transition: filter 0.3s ease;
  }
  .ai-questions { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap: 12px; }
  .ai-question { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); padding: 12px; border-radius: 14px; display:flex; flex-direction:column; gap:10px; }
  .ai-toggle { display:inline-flex; gap:8px; }
  .ai-pill { padding:8px 12px; border-radius:999px; cursor:pointer; font-weight:700; font-size:13px; transition:all 200ms ease; border:1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.06); color:#CBD5E1; }
  .ai-pill.yes { background: linear-gradient(90deg,#60A5FA,#A855F7); color:#fff; }
  .ai-pill.no { background: linear-gradient(90deg,#60A5FA,#A855F7); color:#fff; }
  .ai-pill:hover { transform: translateY(-2px); }
  .ai-pill.yes:hover { box-shadow: 0 8px 24px rgba(96,165,250,0.28); }
  .ai-pill.no:hover { background: rgba(255,255,255,0.08); }
  .ai-pill:focus-visible { outline: 2px solid #60A5FA; outline-offset: 2px; }
  .gauge { width:140px; height:140px; position:relative; }
  .gauge .value { position:absolute; inset:0; display:grid; place-items:center; font-weight:800; color:#F8FAFC; }
  .status-badge { padding:8px 12px; border-radius:999px; font-weight:800; font-size:13px; }
  .cta-btn { padding:12px 18px; border-radius:40px; background:linear-gradient(135deg,#60A5FA,#A855F7); color:white; border:none; cursor:pointer; font-weight:700; transition:all 200ms ease; }
  .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(96,165,250,0.32); }
  .cta-btn:active { transform: translateY(0); }
  @media (max-width: 768px) {
    .premium-border-card.ai-readiness { padding: 28px; }
    .gauge { width:100px; height:100px; }
    .gauge .value { font-size:16px; }
    .cta-btn { padding:10px 14px; font-size:12px; width: 100%; }
    .ai-question { padding: 10px; }
    .ai-pill { padding: 6px 10px; font-size: 12px; }
  }
`;

const QUESTIONS = [
  "Do you currently use Microsoft 365?",
  "Do staff manually re-enter data between systems?",
  "Are workflows documented?",
  "Do you use Power BI for reporting?",
  "Do you use Power Automate?",
  "Do you have an AI governance framework?",
  "Is operational data stored centrally?",
  "Do teams use SharePoint effectively?",
  "Have you piloted AI tools?",
  "Do you have digital transformation objectives?",
];

export default function AIReadinessAssessment({ onConsult }) {
  const [answers, setAnswers] = useState(() => Array(QUESTIONS.length).fill(null));
  const score = useMemo(() => answers.reduce((s, a) => s + (a ? 10 : 0), 0), [answers]);

  const rating = useMemo(() => {
    if (score >= 70) return "Advanced";
    if (score >= 40) return "Developing";
    return "Emerging";
  }, [score]);

  const badgeColor = rating === "Advanced" ? "linear-gradient(90deg,#34D399,#10B981)" : rating === "Developing" ? "linear-gradient(90deg,#F59E0B,#F97316)" : "linear-gradient(90deg,#F43F5E,#EF4444)";

  const recommendations = useMemo(() => {
    if (rating === "Advanced") return [
      "Scale AI initiatives across additional teams with governance oversight.",
      "Invest in MLOps and data platform automation.",
      "Translate pilots into prioritized strategic programs.",
    ];
    if (rating === "Developing") return [
      "Standardise data capture and reduce manual re-entry.",
      "Document key workflows and measure outcomes.",
      "Pilot governance checkpoints for new AI projects.",
    ];
    return [
      "Start with a focused AI pilot in a single team.",
      "Centralise operational data and reduce siloed re-entry.",
      "Create clear digital transformation objectives and success metrics.",
    ];
  }, [rating]);

  const circleRef = useRef(null);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;
    const r = circle.r.baseVal.value;
    const c = 2 * Math.PI * r;
    circle.style.strokeDasharray = `${c} ${c}`;
    const pct = Math.max(0, Math.min(100, score));
    const offset = c - (pct / 100) * c;
    circle.style.transition = 'stroke-dashoffset 800ms cubic-bezier(.22,.9,.18,1)';
    circle.style.strokeDashoffset = String(offset);
  }, [score]);

  function setAnswer(idx, val) {
    setAnswers((prev) => {
      const next = prev.slice();
      next[idx] = val;
      return next;
    });
  }

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <style>{animatedBorderStyles}</style>
      <div className="premium-border-card ai-readiness" style={{ width: "100%" }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ color: '#60A5FA', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '1px', margin: "0 0 12px 0" }}>Premium Assessment</p>
          <h2 style={{ margin: '0 0 12px', fontSize: '32px', color: '#F8FAFC' }}>AI Readiness Assessment</h2>
          <p style={{ color: '#CBD5E1', margin: "0 0 24px 0", fontSize: '15px', lineHeight: '1.6' }}>A quick diagnostic to assess your organisation's preparedness for enterprise AI. Answer the 10 questions for an immediate, personalised score and recommendations.</p>

          <div className="ai-questions" style={{ marginBottom: 24 }}>
            {QUESTIONS.map((q, i) => (
              <div className="ai-question" key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ fontWeight: 700, color: '#F8FAFC', fontSize: '14px', flex: 1 }}>{q}</div>
                  <div className="ai-toggle">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setAnswer(i, true)}
                      onKeyDown={(e) => e.key === 'Enter' && setAnswer(i, true)}
                      className={`ai-pill yes ${answers[i] === true ? 'active' : ''}`}
                      aria-pressed={answers[i] === true}
                    >
                      Yes
                    </div>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setAnswer(i, false)}
                      onKeyDown={(e) => e.key === 'Enter' && setAnswer(i, false)}
                      className={`ai-pill no ${answers[i] === false ? 'active' : ''}`}
                      aria-pressed={answers[i] === false}
                    >
                      No
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'center' }}>
            <div>
              <p style={{ color: '#93C5FD', fontSize: '14px', fontWeight: 700, margin: '0 0 12px 0' }}>Your Score</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="gauge" aria-hidden>
                  <svg width="140" height="140" viewBox="0 0 140 140">
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#A855F7" />
                      </linearGradient>
                    </defs>
                    <g transform="translate(70,70)">
                      <circle r="56" cx="0" cy="0" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
                      <circle ref={circleRef} r="56" cx="0" cy="0" fill="none" stroke="url(#g1)" strokeWidth="12" strokeLinecap="round" transform="rotate(-90)" />
                    </g>
                  </svg>
                  <div className="value" style={{ fontSize: 22 }}>{score}</div>
                </div>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: '#F8FAFC', marginBottom: 8 }}>/100</div>
                  <div className="status-badge" style={{ background: badgeColor, color: '#021018' }}>{rating}</div>
                </div>
              </div>
            </div>

            <div style={{ color: '#CBD5E1' }}>
              <p style={{ fontWeight: 700, color: '#F8FAFC', marginBottom: 12, fontSize: '16px' }}>What's Next</p>
              <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8, fontSize: '14px' }}>
                {recommendations.slice(0,3).map((r, idx) => <li key={idx} style={{ marginBottom: 8 }}>{r}</li>)}
              </ul>
              <button className="cta-btn" onClick={() => { if (onConsult) onConsult(); else window.location.href = '#contact'; }} style={{ marginTop: 16, width: '100%' }}>Book an AI Strategy Consultation</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
