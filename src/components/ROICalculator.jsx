import React, { useEffect, useMemo, useState } from "react";

const roiStyles = `
  @keyframes rotateGradient {
    0% { --angle: 0deg; }
    100% { --angle: 360deg; }
  }
  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
  .premium-border-card.roi-calculator {
    position: relative;
    border-radius: 40px;
    padding: 50px;
    overflow: hidden;
    backdropFilter: blur(18px);
    width: 100%;
    box-sizing: border-box;
    background: linear-gradient(135deg, rgba(37,99,235,0.25), rgba(15,23,42,0.95));
  }
  .premium-border-card.roi-calculator::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 40px;
    padding: 2px;
    background: conic-gradient(from var(--angle), #60A5FA, #2563EB, #07111F, #60A5FA);
    animation: rotateGradient 4s linear infinite;
    z-index: -1;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
  .premium-border-card.roi-calculator::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 40px;
    background: linear-gradient(135deg, rgba(37,99,235,0.25), rgba(15,23,42,0.95));
    z-index: -2;
  }
  .roi-slider-group { margin-bottom: 28px; }
  .roi-slider-label { color: #F8FAFC; font-weight: 700; font-size: 14px; margin-bottom: 10px; display: flex; justify-content: space-between; }
  .roi-slider-value { color: #60A5FA; font-weight: 800; }
  .roi-slider { width: 100%; height: 8px; border-radius: 5px; background: rgba(96,165,250,0.1); outline: none; -webkit-appearance: none; appearance: none; cursor: pointer; }
  .roi-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, #60A5FA, #2563EB); cursor: pointer; box-shadow: 0 4px 12px rgba(96,165,250,0.4); }
  .roi-slider::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, #60A5FA, #2563EB); cursor: pointer; border: none; box-shadow: 0 4px 12px rgba(96,165,250,0.4); }
  .roi-kpi-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin: 40px 0; }
  .roi-kpi-card { position: relative; background: linear-gradient(135deg, rgba(37,99,235,0.1), rgba(15,23,42,0.6)); border: 1px solid rgba(96,165,250,0.2); border-radius: 24px; padding: 28px; overflow: hidden; }
  .roi-kpi-card::before { content: ''; position: absolute; top: -50%; right: -50%; width: 200px; height: 200px; background: radial-gradient(circle, rgba(96,165,250,0.1), transparent); border-radius: 50%; }
  .roi-kpi-value { position: relative; z-index: 1; font-size: 42px; font-weight: 800; background: linear-gradient(135deg, #60A5FA, #2563EB); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 8px; }
  .roi-kpi-label { position: relative; z-index: 1; color: #CBD5E1; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  .roi-cta-btn { padding: 14px 24px; border-radius: 40px; background: linear-gradient(135deg, #60A5FA, #2563EB); color: white; border: none; cursor: pointer; font-weight: 700; font-size: 15px; transition: all 200ms ease; width: 100%; }
  .roi-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(96,165,250,0.4); }
  .roi-cta-btn:active { transform: translateY(0); }
  @media (max-width: 768px) {
    .premium-border-card.roi-calculator { padding: 28px; }
    .roi-kpi-grid { grid-template-columns: 1fr; gap: 16px; }
    .roi-kpi-value { font-size: 28px; }
    .roi-cta-btn { padding: 12px 18px; font-size: 13px; }
  }
`;

const IMPLEMENTATION_COST = 15000;

export default function ROICalculator({ onAutomation }) {
  const [employees, setEmployees] = useState(100);
  const [adminHours, setAdminHours] = useState(8);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [manualProcesses, setManualProcesses] = useState(5);

  const [displayValues, setDisplayValues] = useState({
    hoursSaved: 0,
    costSaving: 0,
    roi: 0,
    efficiency: 0,
  });

  const calculations = useMemo(() => {
    const annualHoursSaved = Math.round(employees * adminHours * 52 * 0.2);
    const annualCostSaving = Math.round(annualHoursSaved * hourlyRate);
    const roiMultiple = (annualCostSaving / IMPLEMENTATION_COST).toFixed(2);
    const efficiencyScore = Math.min(
      100,
      Math.round(((employees * adminHours * manualProcesses) / 1000) * 1.5)
    );

    return {
      hoursSaved: annualHoursSaved,
      costSaving: annualCostSaving,
      roi: roiMultiple,
      efficiency: efficiencyScore,
    };
  }, [employees, adminHours, hourlyRate, manualProcesses]);

  useEffect(() => {
    const animationDuration = 800;
    const steps = 30;
    const stepDuration = animationDuration / steps;

    const intervals = [];

    for (const key in calculations) {
      const target = calculations[key];
      const start = displayValues[key];
      const diff = target - start;

      for (let i = 1; i <= steps; i++) {
        intervals.push(
          setTimeout(() => {
            setDisplayValues((prev) => ({
              ...prev,
              [key]:
                typeof target === "number"
                  ? Math.round(start + (diff * i) / steps)
                  : target,
            }));
          }, stepDuration * i)
        );
      }
    }

    return () => intervals.forEach(clearTimeout);
  }, [calculations]);

  const formatCurrency = (value) => `£${value.toLocaleString()}`;
  const formatPercentage = (value) => `${value}%`;

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <style>{roiStyles}</style>
      <div className="premium-border-card roi-calculator" style={{ width: "100%" }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              color: "#60A5FA",
              textTransform: "uppercase",
              fontWeight: 800,
              letterSpacing: "1px",
              margin: "0 0 12px 0",
            }}
          >
            Premium Tool
          </p>
          <h2
            style={{
              margin: "0 0 12px",
              fontSize: "64px",
              color: "#F8FAFC",
            }}
          >
            ROI Calculator
          </h2>
          <p
            style={{
              color: "#CBD5E1",
              margin: "0 0 32px 0",
              fontSize: "15px",
              lineHeight: "1.6",
            }}
          >
            See the financial impact of automation and AI on your organisation. Adjust the parameters below to calculate your potential savings.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 40,
              marginBottom: 32,
            }}
          >
            <div>
              <div className="roi-slider-group">
                <div className="roi-slider-label">
                  <span>Number of Employees</span>
                  <span className="roi-slider-value">{employees}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="roi-slider"
                />
              </div>

              <div className="roi-slider-group">
                <div className="roi-slider-label">
                  <span>Admin Hours per Week</span>
                  <span className="roi-slider-value">{adminHours}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={adminHours}
                  onChange={(e) => setAdminHours(Number(e.target.value))}
                  className="roi-slider"
                />
              </div>

              <div className="roi-slider-group">
                <div className="roi-slider-label">
                  <span>Average Hourly Pay (£)</span>
                  <span className="roi-slider-value">£{hourlyRate}</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="80"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="roi-slider"
                />
              </div>

              <div className="roi-slider-group">
                <div className="roi-slider-label">
                  <span>Number of Manual Processes</span>
                  <span className="roi-slider-value">{manualProcesses}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={manualProcesses}
                  onChange={(e) => setManualProcesses(Number(e.target.value))}
                  className="roi-slider"
                />
              </div>
            </div>

            <div className="roi-kpi-grid">
              <div className="roi-kpi-card">
                <div className="roi-kpi-value">
                  {displayValues.hoursSaved.toLocaleString()}
                </div>
                <div className="roi-kpi-label">Annual Hours Saved</div>
              </div>

              <div className="roi-kpi-card">
                <div className="roi-kpi-value">
                  {formatCurrency(displayValues.costSaving)}
                </div>
                <div className="roi-kpi-label">Estimated Annual Saving</div>
              </div>

              <div className="roi-kpi-card">
                <div className="roi-kpi-value">{displayValues.roi}x</div>
                <div className="roi-kpi-label">ROI Multiple</div>
              </div>

              <div className="roi-kpi-card">
                <div className="roi-kpi-value">
                  {formatPercentage(displayValues.efficiency)}
                </div>
                <div className="roi-kpi-label">Efficiency Score</div>
              </div>
            </div>
          </div>

          <button
            className="roi-cta-btn"
            onClick={() => {
              if (onAutomation) onAutomation();
              else window.location.href = "#contact";
            }}
          >
            Discuss Your Automation Opportunity
          </button>
        </div>
      </div>
    </div>
  );
}
