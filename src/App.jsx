import { useEffect, useMemo, useRef, useState } from "react";

/* ---------------- GLOBAL STYLES (shared across components) ---------------- */
const sectionTag = {
  color: "#60A5FA",
  letterSpacing: "1px",
  fontWeight: 700,
  marginBottom: "15px",
};
const sectionHeading = {
  fontSize: "58px",
  lineHeight: "1.1",
  letterSpacing: "-2px",
  maxWidth: "1000px",
  margin: 0,
};
const filmBodyText = {
  color: "#CBD5E1",
  lineHeight: "1.85",
  fontSize: "16px",
  margin: 0,
};

const primaryButton = {
  background: "linear-gradient(90deg,#2563EB,#60A5FA)",
  color: "white",
  border: "none",
  padding: "18px 34px",
  borderRadius: "14px",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(37,99,235,0.35)",
};

const secondaryButton = {
  background: "rgba(255,255,255,0.06)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.08)",
  padding: "18px 34px",
  borderRadius: "14px",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
  backdropFilter: "blur(12px)",
};

const sliderButton = {
  width: "52px",
  height: "52px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(7,17,31,0.78)",
  color: "white",
  fontSize: "18px",
  fontWeight: "700",
  cursor: "pointer",
  backdropFilter: "blur(12px)",
  boxShadow: "0 10px 24px rgba(0,0,0,0.28)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const metricCard = {
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "24px",
  padding: "24px 24px 22px",
  minWidth: "0",
  boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
};

const statNumber = {
  margin: 0,
  fontSize: "36px",
  lineHeight: 1.05,
  color: "#60A5FA",
  letterSpacing: "-1px",
};

const statText = {
  color: "#CBD5E1",
  marginTop: "10px",
  fontSize: "14px",
  lineHeight: "1.55",
  maxWidth: "18ch",
};

const testimonialCard = {
  background: "rgba(255,255,400,0.06)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "30px",
  padding: "40px",
};

const avatar = {
  width: "85px",
  height: "85px",
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: "20px",
};

const role = {
  color: "#60A5FA",
  fontSize: "13px",
  letterSpacing: "1px",
  marginBottom: "18px",
};

const quote = {
  color: "#CBD5E1",
  lineHeight: "1.9",
};

const detailRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  padding: "14px 0",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};

const detailLabel = {
  color: "#93C5FD",
  fontWeight: 700,
  fontSize: "13px",
  letterSpacing: "1px",
  textTransform: "uppercase",
};

const detailValue = {
  color: "#E2E8F0",
  textAlign: "right",
  maxWidth: "60%",
};

const automationText = {
  color: "#CBD5E1",
  lineHeight: "1.9",
};

/* ---------------- ICONS ---------------- */

function IconShell({
  children,
  tint = "#60A5FA",
  bg = "rgba(96,165,250,0.12)",
  active = false,
  flashed = false,
}) {
  return (
    <div
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "18px",
        color: active || flashed ? "#BFDBFE" : tint,
        background:
          active || flashed
            ? "linear-gradient(135deg, rgba(96,165,250,0.24), rgba(59,130,246,0.16))"
            : bg,
        border:
          active || flashed
            ? "1px solid rgba(147,197,253,0.28)"
            : "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          active || flashed
            ? "0 10px 28px rgba(37,99,235,0.16), inset 0 1px 0 rgba(255,255,255,0.08)"
            : "inset 0 1px 0 rgba(255,255,255,0.06)",
        transition: "all 320ms ease",
      }}
    >
      {children}
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2c2.8 3 4 6.5 4 10s-1.2 7-4 10c-2.8-3-4-6.5-4-10s1.2-7 4-10z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function CurrencyPoundIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 5a4 4 0 0 0-8 0v3" />
      <path d="M6 11h8" />
      <path d="M6 15h6" />
      <path d="M6 19h10" />
    </svg>
  );
}
function BriefcaseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M2 12h20" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 19 9 5 6 12 2 12" />
    </svg>
  );
}

/* ---------------- HERO PANEL ICONS ---------------- */

function HeroPanelIcon({ type }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (type === "data") {
    return (
      <svg {...common}>
        <path d="M4 19h16" />
        <path d="M7 16V9" />
        <path d="M12 16V5" />
        <path d="M17 16v-4" />
      </svg>
    );
  }

  if (type === "research") {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="6" />
        <path d="M20 20l-3.5-3.5" />
        <path d="M11 8v6" />
        <path d="M8 11h6" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="3" y="6" width="14" height="12" rx="2" />
      <path d="M17 10l4-2v8l-4-2" />
    </svg>
  );
}

/* ---------------- HELPERS ---------------- */

function formatStatValue(value, stat) {
  if (stat.display === "millionPlus") {
    if (value >= 1000000) return "1M+";
    if (value >= 100000) return `${Math.floor(value / 100000) / 10}M+`;
    if (value >= 1000) return `${Math.floor(value / 1000)}K`;
    return `${value}`;
  }

  if (stat.display === "thousand") {
    if (value >= 1000) return `${Math.floor(value / 1000)}K`;
    return `${value}`;
  }

  if (value >= 1000) return value.toLocaleString("en-GB");
  return `${value}`;
}

function getVisibleTestimonials(items, startIndex, count = 3) {
  return Array.from(
    { length: count },
    (_, i) => items[(startIndex + i) % items.length]
  );
}

function getYoutubeId(url) {
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return shortMatch[1];

  const longMatch = url.match(/[?&]v=([^&]+)/);
  if (longMatch) return longMatch[1];

  return "";
}

/* ---------------- SEQUENTIAL STATS ---------------- */

function SequentialStats({ stats, start }) {
  const [values, setValues] = useState(stats.map(() => 0));
  const [activeIndex, setActiveIndex] = useState(-1);
  const [flashed, setFlashed] = useState([]);
  const [completed, setCompleted] = useState([]);

  const frameRef = useRef(null);
  const timeoutRef = useRef(null);
  const controlRef = useRef({
    cancelled: false,
  });

  useEffect(() => {
    if (!start) return;

    controlRef.current.cancelled = false;

    const clearAllTimers = () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const resetCycle = () => {
      if (controlRef.current.cancelled) return;

      setValues(stats.map(() => 0));
      setActiveIndex(-1);
      setFlashed([]);
      setCompleted([]);

      timeoutRef.current = setTimeout(() => {
        if (!controlRef.current.cancelled) runStat(0);
      }, 180);
    };

    const runStat = (index) => {
      if (controlRef.current.cancelled) return;

      if (index >= stats.length) {
        setActiveIndex(-1);

        timeoutRef.current = setTimeout(() => {
          if (controlRef.current.cancelled) return;
          setFlashed(stats.map((_, i) => i));

          timeoutRef.current = setTimeout(() => {
            if (controlRef.current.cancelled) return;
            resetCycle();
          }, 700);
        }, 240);

        return;
      }

      const stat = stats[index];
      const target = stat.target;
      const duration = stat.duration || 460;
      const startTime = performance.now();

      setActiveIndex(index);

      const animate = (now) => {
        if (controlRef.current.cancelled) return;

        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const nextValue = Math.floor(target * eased);

        setValues((prev) => {
          const next = [...prev];
          next[index] = nextValue;
          return next;
        });

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setValues((prev) => {
            const next = [...prev];
            next[index] = target;
            return next;
          });

          setCompleted((prev) => [...new Set([...prev, index])]);
          setFlashed((prev) => [...new Set([...prev, index])]);

          timeoutRef.current = setTimeout(() => {
            if (controlRef.current.cancelled) return;

            setFlashed((prev) => prev.filter((i) => i !== index));

            timeoutRef.current = setTimeout(() => {
              if (controlRef.current.cancelled) return;
              runStat(index + 1);
            }, 140);
          }, 240);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    };

    resetCycle();

    return () => {
      controlRef.current.cancelled = true;
      clearAllTimers();
    };
  }, [start, stats]);

  return (
    <>
      {stats.map((stat, index) => {
        const isActive = activeIndex === index;
        const isFlashed = flashed.includes(index);
        const isCompleted = completed.includes(index);

        return (
          <div
            key={index}
            style={{
              ...metricCard,
              border:
                isActive || isFlashed || isCompleted
                  ? "1px solid rgba(96,165,250,0.24)"
                  : "1px solid rgba(255,255,255,0.08)",
              background:
                isActive || isFlashed || isCompleted
                  ? "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.05))"
                  : "rgba(255,255,255,0.06)",
              boxShadow: isFlashed
                ? "0 0 0 1px rgba(96,165,250,0.14), 0 0 30px rgba(59,130,246,0.18), 0 15px 40px rgba(0,0,0,0.24)"
                : isActive
                ? "0 0 0 1px rgba(96,165,250,0.08), 0 12px 34px rgba(37,99,235,0.12), 0 15px 40px rgba(0,0,0,0.2)"
                : "0 15px 40px rgba(0,0,0,0.2)",
              transform: isActive ? "translateY(-3px)" : "translateY(0px)",
              transition:
                "transform 320ms ease, box-shadow 320ms ease, border 320ms ease, background 320ms ease",
              animation: isFlashed ? "statPulse 700ms ease" : "none",
            }}
          >
            <IconShell active={isActive} flashed={isFlashed}>
              {stat.icon}
            </IconShell>

            <h2
              style={{
                ...statNumber,
                color:
                  isActive || isFlashed || isCompleted ? "#93C5FD" : "#60A5FA",
                textShadow: isFlashed
                  ? "0 0 20px rgba(96,165,250,0.25)"
                  : "none",
                transition: "all 280ms ease",
              }}
            >
              {stat.prefix || ""}
              {formatStatValue(values[index], stat)}
              {stat.suffix && stat.display !== "millionPlus"
                ? stat.suffix
                : ""}
            </h2>

            <p
              style={{
                ...statText,
                color:
                  isActive || isFlashed || isCompleted ? "#E2E8F0" : "#CBD5E1",
              }}
            >
              {stat.label}
            </p>

            <div
              style={{
                marginTop: "14px",
                width: "100%",
                height: "4px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.06)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: isCompleted
                    ? "100%"
                    : isActive
                    ? `${Math.max((values[index] / stat.target) * 100, 6)}%`
                    : "0%",
                  borderRadius: "999px",
                  background:
                    isFlashed || isActive
                      ? "linear-gradient(90deg, #60A5FA, #93C5FD)"
                      : "linear-gradient(90deg, rgba(96,165,250,0.6), rgba(147,197,253,0.5))",
                  boxShadow:
                    isFlashed || isActive
                      ? "0 0 16px rgba(96,165,250,0.22)"
                      : "none",
                  transition: "width 160ms linear, box-shadow 240ms ease",
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

/* ---------------- GIF DECK ---------------- */

function GifDeck() {
  const gifs = [
    {
      src: "/hero-1.gif",
      label: "Data and Intelligence",
      panelEyebrow: "DATA & DIGITAL",
      panelTitle: "OPERATIONAL EFFICIENCY",
      panelStat: "4,160 Hours",
      panelBody:
        "Annual capacity released through automation, workflow optimisation and real-time reporting.",
      icon: "data",
    },
    {
      src: "/hero-2.gif",
      label: "Research and Engagement",
      panelEyebrow: "RESEARCH & COMMUNITY ENGAGEMENT",
      panelTitle: "GLOBAL KNOWLEDGE REACH",
      panelStat: "27 Countries",
      panelBody:
        "Research, learning and improvement programmes delivered across five continents.",
      icon: "research",
    },
    {
      src: "/hero-3.gif",
      label: "Digital Storytelling",
      panelEyebrow: "FILM & CREATIVE CAMPAIGNS",
      panelTitle: "INCLUSIVE HEALTH COMMUNICATIONS",
      panelStat: "90% Positive Feedback",
      panelBody:
        "Community-informed public health campaigns driving engagement and accessibility.",
      icon: "film",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const currentHero = gifs[activeIndex];

  const nextGif = () => {
    setActiveIndex((prev) => (prev + 1) % gifs.length);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "560px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "850px",
        }}
      >
        {gifs.map((item, index) => {
          const position = (index - activeIndex + gifs.length) % gifs.length;

          let dynamicStyle = {
            opacity: 0,
            pointerEvents: "none",
            zIndex: 0,
            transform: "translate3d(48px, 30px, 0) scale(0.93) rotate(4deg)",
          };

          if (position === 0) {
            dynamicStyle = {
              opacity: 1,
              pointerEvents: "auto",
              zIndex: 3,
              transform: "translate3d(0px, 0px, 0) scale(1) rotate(0deg)",
            };
          } else if (position === 1) {
            dynamicStyle = {
              opacity: 0.7,
              pointerEvents: "none",
              zIndex: 2,
              transform:
                "translate3d(20px, 14px, 0) scale(0.975) rotate(2deg)",
            };
          } else if (position === 2) {
            dynamicStyle = {
              opacity: 0.42,
              pointerEvents: "none",
              zIndex: 1,
              transform:
                "translate3d(38px, 24px, 0) scale(0.95) rotate(3.5deg)",
            };
          }

          return (
            <div
              key={item.label}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "40px",
                overflow: "hidden",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 25px 70px rgba(0,0,0,0.35)",
                transition:
                  "transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease",
                willChange: "transform, opacity",
                animation:
                  position === 0 ? "float 6s ease-in-out infinite" : "none",
                ...dynamicStyle,
              }}
            >
              <img
                src={item.src}
                alt={item.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  top: "22px",
                  left: "22px",
                  zIndex: 8,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 18px",
                  borderRadius: "999px",
                  background: "rgba(7,17,31,0.72)",
                  backdropFilter: "blur(18px)",
                  border: "1px solid rgba(147,197,253,0.35)",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#60A5FA",
                    boxShadow: "0 0 0 6px rgba(96,165,250,0.12)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    color: "#EFF6FF",
                    fontSize: "13px",
                    fontWeight: "800",
                    letterSpacing: "1.1px",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </span>
              </div>

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 5,
                  background:
                    "linear-gradient(to top, rgba(7,17,31,0.52), rgba(7,17,31,0.14), rgba(7,17,31,0.03))",
                }}
              />
            </div>
          );
        })}

        <div
          key={activeIndex}
          style={{
            position: "absolute",
            bottom: "40px",
            left: "-60px",
            width: "410px",
            zIndex: 20,
            borderRadius: "30px",
            padding: "1.5px",
            background:
              "linear-gradient(135deg, rgba(96,165,250,0.95), rgba(168,85,247,0.55), rgba(34,211,238,0.8))",
            backgroundSize: "200% 200%",
            animation: "panelBorderFlow 7s ease infinite, fadeCard 520ms ease",
            boxShadow:
              "0 24px 70px rgba(0,0,0,0.34), 0 0 0 1px rgba(255,255,255,0.03)",
          }}
        >
          <div
            style={{
              borderRadius: "28px",
              padding: "28px 28px 26px",
              background:
                "linear-gradient(180deg, rgba(14,23,38,0.88), rgba(8,15,28,0.92))",
              backdropFilter: "blur(24px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(96,165,250,0.10), rgba(255,255,255,0.02), rgba(168,85,247,0.08))",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#BFDBFE",
                  background:
                    "linear-gradient(135deg, rgba(96,165,250,0.22), rgba(168,85,247,0.16))",
                  border: "1px solid rgba(147,197,253,0.24)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                  flexShrink: 0,
                }}
              >
                <HeroPanelIcon type={currentHero.icon} />
              </div>

              <p
                style={{
                  color: "#93C5FD",
                  fontWeight: "800",
                  margin: 0,
                  fontSize: "11px",
                  letterSpacing: "1.9px",
                  textTransform: "uppercase",
                  lineHeight: 1.4,
                }}
              >
                {currentHero.panelEyebrow}
              </p>
            </div>

            <p
              style={{
                position: "relative",
                zIndex: 2,
                color: "white",
                fontWeight: "700",
                fontSize: "15px",
                letterSpacing: "0.8px",
                marginTop: 0,
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              {currentHero.panelTitle}
            </p>

            <h2
              style={{
                position: "relative",
                zIndex: 2,
                margin: 0,
                fontSize: currentHero.icon === "film" ? "48px" : "56px",
                lineHeight: 1.02,
                color: "#F8FAFC",
                textShadow: "0 0 24px rgba(96,165,250,0.12)",
              }}
            >
              {currentHero.panelStat}
            </h2>

            <p
              style={{
                position: "relative",
                zIndex: 2,
                color: "#CBD5E1",
                lineHeight: "1.8",
                marginTop: "14px",
                marginBottom: 0,
                fontSize: "15px",
                maxWidth: "34ch",
              }}
            >
              {currentHero.panelBody}
            </p>
          </div>
        </div>

        <button
          onClick={nextGif}
          aria-label="Show next hero"
          style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 30,
            width: "62px",
            height: "62px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(7,17,31,0.68)",
            backdropFilter: "blur(14px)",
            color: "white",
            fontSize: "20px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 14px 34px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}

/* ---------------- FILM PROJECT PAGE ---------------- */

function FilmProjectsPage() {
  const project = {
    title: "Documentary Storytelling for Public Health and Community Impact",
    subtitle:
      "A project-led body of film work combining interviews, public health communication, youth voice and community documentation.",
    stats: [
      { label: "Focus", value: "Health, education, equity" },
      { label: "Format", value: "Interview + documentary film" },
      { label: "Approach", value: "Human-centred visual storytelling" },
    ],
    overview:
      "This body of work uses documentary practice to translate lived experience, community expertise and public interest issues into accessible visual stories. Rather than presenting film as standalone media, the project brings together interviews, campaign films and field documentation to show how storytelling can support trust, engagement and systems change.",
    approach:
      "The production approach combines sensitive interviewing, observational filming, lightweight location setups and editorial structure designed for clarity. The emphasis is on voice, context and social relevance rather than promotional aesthetics.",
    outcome:
      "The result is a portfolio of film work that supports public understanding, amplifies community perspectives and creates more memorable forms of communication across health and social sectors.",
  };

  const selectedWorks = [
    {
      title: "Vacci-Nation",
      type: "Feature Film",
      description:
        "A public health film addressing vaccine hesitancy through community-centred communication.",
      link: "https://youtu.be/54kEGQShgEs",
    },
    {
      title: "Young Sutton Voices - Understanding the Autism Spectrum",
      type: "Feature Film",
      description:
        "A youth-centred film exploring autism awareness, lived experience and inclusive dialogue.",
      link: "https://www.youtube.com/watch?v=wKq1nso9XbA",
    },
    {
      title: "Interview with Vanessa McCain",
      type: "Community Interview",
      description:
        "A conversation on resilience, advocacy, youth support and post-pandemic recovery.",
      link: "https://youtu.be/vL9ouRH6D0A",
    },
    {
      title: "Interview with Abdurahman Sayed",
      type: "Community Interview",
      description:
        "A discussion on Grenfell recovery, faith-based support and culturally sensitive outreach.",
      link: "https://youtu.be/FCkgYwuSQiI",
    }, 
  ];

  const sharedImageCard = {
    borderRadius: "28px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
    background: "#020617",
  };

  const sharedImageStyle = {
    width: "100%",
    height: "100%",
    display: "block",
    aspectRatio: "4 / 3",
    objectFit: "cover",
  };

  return (
    <section
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "140px 80px 100px",
        background: "#07111F",
        color: "white",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <p
          style={{
            color: "#60A5FA",
            textTransform: "uppercase",
            letterSpacing: "1.4px",
            fontWeight: 700,
            marginBottom: "18px",
          }}
        >
          Film Project
        </p>

        <h1
          style={{
            fontSize: "76px",
            lineHeight: "0.96",
            letterSpacing: "-3px",
            margin: "0 0 20px",
            maxWidth: "980px",
          }}
        >
          {project.title}
        </h1>

        <p
          style={{
            color: "#CBD5E1",
            fontSize: "21px",
            lineHeight: "1.85",
            maxWidth: "780px",
            margin: "0 0 36px",
          }}
        >
          {project.subtitle}
        </p>

        <div
          style={{
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            marginBottom: "42px",
          }}
        >
          {project.stats.map((item) => (
            <div
              key={item.label}
              style={{
                padding: "14px 18px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#E2E8F0",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>
                {item.label}:
              </span>{" "}
              {item.value}
            </div>
          ))}
        </div>

        <div
          style={{
            marginBottom: "72px",
            borderRadius: "32px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
          }}
        >
          <img
            src="/kfENTON.JPG"
            alt="Film project collage showing interview, community and documentary scenes"
            style={{
              width: "100%",
              display: "block",
              aspectRatio: "16 / 8.5",
              objectFit: "cover",
            }}
          />
        </div>

        <div
          className="film-project-overview"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "28px",
            marginBottom: "72px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "28px",
              padding: "30px",
            }}
          >
            <p style={sectionTag}>Project Overview</p>
            <p style={filmBodyText}>{project.overview}</p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "28px",
              padding: "30px",
            }}
          >
            <p style={sectionTag}>Approach</p>
            <p style={filmBodyText}>{project.approach}</p>
            <p style={{ ...sectionTag, marginTop: "24px" }}>Outcome</p>
            <p style={filmBodyText}>{project.outcome}</p>
          </div>
        </div>

        <div
          className="film-collage-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginBottom: "72px",
          }}
        >
          <div style={sharedImageCard}>
            <img
              src="/UYG.JPG"
              alt="Collage of documentary interview and community footage"
              style={sharedImageStyle}
            />
          </div>

          <div style={sharedImageCard}>
            <img
              src="/WhatsApp Image 2026-06-05 at 12.11.25.jpeg"
              alt="Behind the scenes collage showing documentary filming process"
              style={sharedImageStyle}
            />
          </div>
        </div>

        <div style={{ marginBottom: "72px" }}>
          <p style={sectionTag}>Selected Works</p>
          <h2
            style={{
              margin: "0 0 26px",
              fontSize: "44px",
              letterSpacing: "-1.6px",
            }}
          >
            Films within the project
          </h2>

          <div
            className="film-works-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "24px",
            }}
          >
            {selectedWorks.map((item) => (
              <a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "24px",
                  padding: "24px",
                  display: "block",
                  boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
                }}
              >
                <div
                  style={{
                    borderRadius: "18px",
                    overflow: "hidden",
                    marginBottom: "18px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "#020617",
                  }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${getYoutubeId(
                      item.link
                    )}/hqdefault.jpg`}
                    alt={`${item.title} YouTube thumbnail`}
                    style={{
                      width: "100%",
                      display: "block",
                      aspectRatio: "16 / 9",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <p
                  style={{
                    color: "#60A5FA",
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  {item.type}
                </p>

                <h3
                  style={{
                    margin: "0 0 12px",
                    fontSize: "28px",
                    lineHeight: "1.15",
                    letterSpacing: "-0.8px",
                    color: "white",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#CBD5E1",
                    lineHeight: "1.8",
                    fontSize: "15px",
                  }}
                >
                  {item.description}
                </p>

                <div
                  style={{
                    marginTop: "18px",
                    color: "#93C5FD",
                    fontWeight: 700,
                    fontSize: "15px",
                  }}
                >
                  Watch film →
                </div>
              </a>
            ))}
          </div>
        </div>

        <div
          className="film-process-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              ...sharedImageCard,
              height: "100%",
              display: "flex",
            }}
          >
            <img
              src="/Capture98080.JPG"
              alt="Behind the scenes collage showing documentary filming process"
              style={sharedImageStyle}
            />
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "28px",
              padding: "30px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p style={sectionTag}>Process</p>
            <h3
              style={{
                margin: "0 0 16px",
                fontSize: "36px",
                letterSpacing: "-1px",
              }}
            >
              From fieldwork to final film
            </h3>

            <p style={filmBodyText}>
              The work combines documentary interviews, environmental detail,
              location-based observation and concise editing choices to hold
              attention while preserving context.
            </p>

            <ul
              style={{
                margin: "18px 0 0",
                paddingLeft: "20px",
                color: "#E2E8F0",
                lineHeight: "2",
              }}
            >
              <li>Interview-led narrative structure</li>
              <li>Community and environmental context shots</li>
              <li>Accessible, issue-led public storytelling</li>
              <li>Production adapted for live social settings</li>
              <li>6K internal raw camera workflow for greater image fidelity</li>
              <li>Multi-camera setup for broader coverage and continuity</li>
              <li>Variety of stabilisers for controlled movement</li>
              <li>Prime and zoom lens combinations for flexible framing</li>
              <li>Focus pulling for subject isolation and transitions</li>
              <li>Drone footage for scale, movement and location context</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- AUTOMATION PAGE ---------------- */

function WorkflowCarousel() {
  const slides = [
    {
      title: " Legacy Process",
      image: "/Old workflow.JPG",
      description: [
        " Workforce programmes, placements and application requests were managed through fragmented processes, creating administrative overhead, inconsistent data collection and limited visibility of service demand and performance.",
      ],
    },
    {
      title: " Digital Transformation",
      image: "/Transition.JPG",
      description: [
        " The service was redesigned into a structured digital workflow, replacing manual and email-based processes with automated request handling, centralised data management and standardised operational controls.",
      ],
    },
    {
      title: " Integrated Solution",
      image: "/New workflow.JPG",
      description: [
        " Power Automate, SharePoint and Power BI were brought together to create a connected digital ecosystem that automates workflow management, captures data in real time and provides end-to-end visibility across service delivery.",
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const activeSlide = slides[activeIndex];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 0.8fr",
        gap: "28px",
        alignItems: "stretch",
      }}
      className="workflow-carousel-grid"
    >
      <div
        style={{
          position: "relative",
          borderRadius: "30px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.04)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.24)",
          minHeight: "620px",
        }}
      >
        {slides.map((slide, index) => (
          <img
            key={slide.title}
            src={slide.image}
            alt={slide.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              display: "block",
              opacity: index === activeIndex ? 1 : 0,
              transform: index === activeIndex ? "scale(1)" : "scale(1.01)",
              transition: "opacity 700ms ease, transform 700ms ease",
              padding: "20px",
              background: "#020617",
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(7,17,31,0.18), rgba(7,17,31,0.04), rgba(7,17,31,0.01))",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "22px",
            left: "22px",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 18px",
            borderRadius: "999px",
            background: "rgba(7,17,31,0.74)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(147,197,253,0.22)",
            color: "#E2E8F0",
            fontSize: "12px",
            fontWeight: "800",
            letterSpacing: "1.1px",
            textTransform: "uppercase",
            zIndex: 4,
          }}
        >
          Workflow Transformation
        </div>
      </div>

      <div
        key={activeSlide.title}
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "30px",
          padding: "34px",
          backdropFilter: "blur(14px)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          animation: "fadeCard 520ms ease",
        }}
      >
        <div>
          <p
            style={{
              color: "#60A5FA",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            {activeSlide.title}
          </p>

          <h3
            style={{
              margin: "0 0 22px",
              fontSize: "40px",
              lineHeight: "1.05",
              letterSpacing: "-1.4px",
              color: "white",
            }}
          >
            {activeSlide.title}
          </h3>

          <div style={{ display: "grid", gap: "18px" }}>
            {activeSlide.description.map((text, index) => (
              <div
                key={`${activeSlide.title}-${index}`}
                style={{
                  padding: "18px 20px",
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#CBD5E1",
                    fontSize: "16px",
                    lineHeight: "1.85",
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${slide.title} slide`}
              style={{
                width: index === activeIndex ? "34px" : "12px",
                height: "12px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                background:
                  index === activeIndex
                    ? "linear-gradient(90deg,#2563EB,#60A5FA)"
                    : "rgba(255,255,255,0.18)",
                boxShadow:
                  index === activeIndex
                    ? "0 0 18px rgba(59,130,246,0.28)"
                    : "none",
                transition: "all 260ms ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function AutomationImageCarousel() {
  const images = [
    "/Old workflow.JPG",
    "/Transition.JPG",
    "/New workflow.JPG",
"/dashboard 1.JPG"
  ];

  const slides = [
  {
    title: "Old Workflow",
    description: [
      "Applications and requests were managed across multiple routes including placements, internships, work experience and observerships.",
      "The process relied on manual handling, inconsistent data capture and limited visibility of demand, activity and outcomes."
    ]
  },
  {
    title: "Transition",
    description: [
      "The process was redesigned to streamline requests through a structured digital pathway.",
      "Applications moved from email-driven workflows to automated forms, centralised data collection and standardised processing."
    ]
  },
  {
    title: "New Workflow",
    description: [
      "Power Automate, SharePoint and Power BI were combined to create an integrated ecosystem.",
      "Requests are routed automatically, data is captured in real time and dashboards provide live operational intelligence for decision-makers."
    ]
  },
  {
    title: " Operational Intelligence",
    description: [
      " Live reporting and workforce analytics provide actionable insight into application volumes, demographic trends and programme activity, enabling data-driven decision-making, improved resource planning and more effective service delivery..",
    ]
  }
];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "clamp(600px, 70vh, 900px)",
          borderRadius: "30px",
          overflow: "hidden",
          background: "#020617",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 30px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(96,165,250,0.08)"
        }}
      >
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt="Automation workflow visual"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              display: "block",
              opacity: index === activeIndex ? 1 : 0,
              transition: "opacity 700ms ease",
              padding: "28px",
              background: "#020617"
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            bottom: "16px",
            display: "flex",
            gap: "8px",
            zIndex: 3
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Show workflow image ${i + 1}`}
              style={{
                width: i === activeIndex ? "22px" : "8px",
                height: "8px",
                borderRadius: "999px",
                border: "none",
                background:
                  i === activeIndex
                    ? "linear-gradient(90deg,#2563EB,#60A5FA)"
                    : "rgba(255,255,255,0.3)",
                cursor: "pointer",
                transition: "all 200ms ease"
              }}
            />
          ))}
        </div>
      </div>

      <div
        key={activeIndex}
        style={{
          margin: "24px auto 0",
          width: "100%",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "28px",
          padding: "28px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
          animation: "fadeCard 500ms ease"
        }}
      >
        <p
          style={{
            color: "#60A5FA",
            fontSize: "12px",
            fontWeight: "800",
            letterSpacing: "1.4px",
            textTransform: "uppercase",
            marginBottom: "12px"
          }}
        >
          {slides[activeIndex].title}
        </p>

        <h3
          style={{
            margin: "0 0 18px",
            fontSize: "32px",
            color: "white",
            letterSpacing: "-1px"
          }}
        >
          {slides[activeIndex].title}
        </h3>

        <div style={{ display: "grid", gap: "14px" }}>
          {slides[activeIndex].description.map((text, i) => (
            <p
              key={i}
              style={{
                margin: 0,
                color: "#CBD5E1",
                fontSize: "16px",
                lineHeight: "1.8"
              }}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
function AutomationAIPage() {
  const surfaceCard = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "28px",
    padding: "30px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
    backdropFilter: "blur(14px)"
  };

  const mediaCard = {
    overflow: "hidden",
    borderRadius: "28px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.04)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.22)"
  };

  const chipStyle = {
    padding: "12px 16px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#E2E8F0",
    fontSize: "13px",
    fontWeight: 600
  };

  const listStyle = {
    margin: 0,
    paddingLeft: "20px",
    color: "#CBD5E1",
    lineHeight: 2,
    fontSize: "15px"
  };

  const promptCard = {
    padding: "16px 18px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#E2E8F0",
    fontSize: "15px",
    lineHeight: 1.7
  };

  return (
    <section
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "140px 80px 100px",
        background: "#07111F",
        color: "white",
        boxSizing: "border-box"
      }}
    >
      <div style={{ maxWidth: "1380px", margin: "0 auto" }}>
        <p
          style={{
            color: "#60A5FA",
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: "20px"
          }}
        >
          Automation AI
        </p>
        <section id="automation"></section>
        <h1
          style={{
            fontSize: "84px",
            lineHeight: 0.95,
            letterSpacing: "-4px",
            maxWidth: "1000px",
            margin: "0 0 28px"
          }}
        >
          Building intelligent systems that remove friction.
        </h1>

        <p
          style={{
            maxWidth: "820px",
            fontSize: "22px",
            lineHeight: 1.9,
            color: "#CBD5E1",
            marginBottom: "90px"
          }}
        >
          This page showcases digital transformation solutions that improve service delivery, streamline business processes and enhance user engagement through workflow automation, intelligent services and integrated digital experiences.
        </p>

        <div
          style={{
            ...surfaceCard,
            marginBottom: "100px",
            padding: "48px"
          }}
        >
          <p style={sectionTag}>Featured Build</p>
          <h2
            style={{
              fontSize: "52px",
              margin: "0 0 24px",
              letterSpacing: "-1.8px",
              color: "white"
            }}
          >
            End-to-End Workforce Automation
          </h2>

          <div
            className="automation-feature-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "24px",
              marginBottom: "28px"
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "22px",
                padding: "24px"
              }}
            >
              <h3 style={{ margin: "0 0 12px", fontSize: "24px", color: "white" }}>Challenge</h3>
              <p style={automationText}>
Disparate processes and manual handling created inefficiencies, inconsistent user experiences and limited oversight of operational performance.              </p>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "22px",
                padding: "24px"
              }}
            >
              <h3 style={{ margin: "0 0 12px", fontSize: "24px", color: "white" }}>Solution</h3>
              <p style={automationText}>
                An integrated digital service was developed to streamline workflows, automate key processes and provide a single source of truth for operational management.              </p>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "22px",
                padding: "24px"
              }}
            >
              <h3 style={{ margin: "0 0 12px", fontSize: "24px", color: "white" }}>Outcome</h3>
              <p style={automationText}>
                The solution improved efficiency, strengthened governance, enhanced visibility of service activity and enabled more effective, data-driven decision-making.
              </p>
            </div>
          </div>
<div style={mediaCard}>
  <AutomationImageCarousel />
</div>
        </div>
        <div
          style={{
            ...surfaceCard,
            padding: "42px",
            marginBottom: "80px"
          }}
        >
          <p style={sectionTag}>Interactive Demo</p>
          <h2
            style={{
              margin: "0 0 18px",
              fontSize: "48px",
              lineHeight: 1.08,
              letterSpacing: "-2px",
              color: "white",
              maxWidth: "700px"
            }}
          >
            AI Digital Assistant
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0.8fr 1.2fr",
              gap: "28px",
              alignItems: "start"
            }}
            className="workflow-carousel-grid"
          >
            <div>
              <p style={{ ...automationText, marginBottom: "22px" }}>
         This demonstration showcases how AI-powered conversational services can enhance user support, streamline access to information and improve digital service delivery. By providing immediate, context-aware assistance, organisations can reduce support demand, improve user experience and increase operational efficiency.
Example capabilities:

              </p>

              <div style={{ display: "grid", gap: "14px" }}>
                <div style={promptCard}> How can workforce automation streamline service delivery and operational processes?</div>
                <div style={promptCard}> How does the digital assistant support users with information, guidance and task completion?</div>
                <div style={promptCard}> How can interactive workflow experiences accelerate approvals, communications and service requests?</div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "28px",
                overflow: "hidden",
                boxShadow: "0 20px 50px rgba(0,0,0,0.22)"
              }}
            >
              <div
                style={{
                  padding: "18px 22px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.03)"
                }}
              >
                <strong style={{ color: "white", fontSize: "15px" }}>AI Assistant Demo</strong>
                <span style={{ color: "#93C5FD", fontSize: "13px", fontWeight: 700 }}>Demo ready</span>
              </div>

              <div
                style={{
                  padding: "22px",
                  display: "grid",
                  gap: "16px"
                }}
              >
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "16px 18px",
                    borderRadius: "20px",
                    borderTopLeftRadius: "8px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#E2E8F0",
                    lineHeight: 1.7,
                    fontSize: "15px"
                  }}
                >
                  Hello. I can help explain the workflow, show how the Teams cards fit into the
                  process, or outline what the AI agents are designed to support.
                </div>

                <div
                  style={{
                    maxWidth: "78%",
                    marginLeft: "auto",
                    padding: "16px 18px",
                    borderRadius: "20px",
                    borderTopRightRadius: "8px",
                    background: "linear-gradient(90deg, #2563EB, #60A5FA)",
                    color: "white",
                    lineHeight: 1.7,
                    fontSize: "15px"
                  }}
                >
                  How does the automation improve the process?
                </div>

                <div
                  style={{
                    maxWidth: "85%",
                    padding: "16px 18px",
                    borderRadius: "20px",
                    borderTopLeftRadius: "8px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#E2E8F0",
                    lineHeight: 1.7,
                    fontSize: "15px"
                  }}
                >
                  It reduces fragmented manual handling by introducing structured intake,
                  automated routing, centralised data capture and clearer reporting.
                  That creates better consistency, visibility and efficiency across the workflow.
                </div>
              </div>

              <div
                style={{
                  padding: "18px 22px",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center"
                }}
              >
                <div
                  style={{
                    flex: 1,
                    minHeight: "48px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 16px",
                    color: "#94A3B8",
                    fontSize: "14px",
                    background: "rgba(255,255,255,0.04)"
                  }}
                >
                  Type a question for the demo assistant…
                </div>

                <button
                  type="button"
                  aria-label="Send message"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "999px",
                    border: "none",
                    background: "linear-gradient(90deg, #2563EB, #60A5FA)",
                    color: "white",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  ↑
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginBottom: "100px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "28px"
          }}
          className="automation-capability-grid"
        >
          <div>
            <p style={sectionTag}>Teams Showcase</p>
            <h2
              style={{
                margin: "0 0 18px",
                fontSize: "46px",
                letterSpacing: "-1.6px",
                color: "white"
              }}
            >
              Microsoft Teams Service Integration
            </h2>

            <div style={mediaCard}>
<img
  src="/adaptive-card.gif"
  alt="Adaptive Cards Demo"
  style={{
    width: "100%",
    display: "block",
    aspectRatio: "16 / 10",
    objectFit: "contain",
    background: "#020617"
  }}
/>
            </div>
          </div>

          <div style={{ ...surfaceCard, height: "100%" }}>
            <p style={sectionTag}>What this demonstrates</p>
            <h3
              style={{
                margin: "0 0 18px",
                fontSize: "32px",
                letterSpacing: "-1px",
                color: "white"
              }}
            >
              Integrated Service Delivery
            </h3>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "22px"
              }}
            >
<div style={chipStyle}>Integrated workflow management</div>
<div style={chipStyle}>Streamlined user journeys</div>
<div style={chipStyle}>Reduced administrative overhead</div>
<div style={chipStyle}>Faster service delivery</div>
<div style={chipStyle}>Scalable digital solutions</div>            
</div>

            <p style={automationText}>
These solutions demonstrate how intelligent workflow automation can transform service delivery by bringing communications, approvals and operational processes into a seamless digital experience. By reducing manual intervention and streamlining user interactions, organisations can improve efficiency, accelerate response times, enhance user experience and deliver scalable services that support long-term growth and operational excellence.

            </p>
          </div>
        </div>

        <div
          style={{
            marginBottom: "100px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "28px"
          }}
          className="automation-gallery-grid"
        >
          <div>
            <p style={sectionTag}>AI Agents</p>
            <h2
              style={{
                margin: "0 0 18px",
                fontSize: "46px",
                letterSpacing: "-1.6px",
                color: "white"
              }}
            >
              AI-Powered Knowledge and Service Platforms
            </h2>
<div
  style={{
    ...mediaCard,
    height: "720px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}
>
  <img
    src="/nhs-agent.JPG"
    alt=" AI-powered knowledge platform"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
      display: "block",
      background: "#020617"
    }}
  />
</div>
 </div>

<div style={{ ...surfaceCard, height: "100%" }}>
  <p style={sectionTag}>Platform Capabilities</p>

  <h3
    style={{
      margin: "0 0 18px",
      fontSize: "32px",
      letterSpacing: "-1px",
      color: "white"
    }}
  >
    Intelligent Knowledge and Service Delivery
  </h3>

<ul style={listStyle}>
  <li> Reducing manual queries and standardising responses, we improve efficiency, enhancing consistency and supporting better decision-making across workforce and service delivery.</li>

  <li>Provideing conversational access to organisational knowledge, policies, procedures and business information through a single digital interface.</li>

  <li>Connecting users with relevant forms, systems, guidance and resources, reducing time spent navigating complex environments.</li>

  <li>Improveing consistency by delivering standardised information and reducing variation across support interactions.</li>

  <li>Reduceing demand on operational teams by handling high-volume, repeatable enquiries automatically.</li>

  <li>Integrates with Microsoft 365, SharePoint, Teams and business systems to create a seamless digital experience.</li>

  <li>Supporting scalable digital service delivery while enabling teams to focus on higher-value work and strategic priorities.</li>
  </ul>
</div>
        </div>

      </div>
    </section>
  );
}
/* ---------------- RESEARCH PAGE ---------------- */

function ResearchPage() {
  const publications = useMemo(
    () => [
      {
        id: 1,
        title:
          "Leveraging Performative Arts Programmes for Enhancing Skills and Well-Being in Global Majority Youth",
        type: "Book Chapter",
        year: 2026,
        summary:
          "This peer-reviewed chapter explores the role of public health, creative arts, recruitment and widening participation in building more inclusive educational and workforce pathways.",
        coverTheme: "linear-gradient(180deg, #0F172A, #1E3A8A)",
        coverImage: "/Sustainability in education.jfif",
        focus: "Public health, Social Impact, Widening Participation",
        format: "Book chapter, PDF",
        purchaseLink:
          "https://order.springer.com/public/cart?message=AddToCartSuccess",
        summaryLink:
          "https://link.springer.com/chapter/10.1007/978-3-032-16077-5_18",
        overview:
          "This peer‑reviewed chapter, written by Mohammed Ali and indexed in Scopus, was published by Springer International in 2026.",
      },
      {
        id: 4,
        title:
          "CSR and Coping with COVID-19 Pandemic in the Global Health Service Institutions: The United Kingdom",
        type: "Book Chapter",
        year: 2023,
        summary:
          "This peer-reviewed chapter investigates how the private sector, the third sector, and philanthropists utilized Corporate Social Responsibility (CSR) to support the UK National Health Service (NHS) and disadvantaged communities during the COVID-19 pandemic.",
        coverTheme: "linear-gradient(180deg, #172554, #0F172A)",
        coverImage: "/Corporate social responsibility in the health sector.JPG",
        focus: "Public Health, Corporate Social Responsibility, Human Factors",
        format: "Book chapter, PDF",
        purchaseLink:
          "https://order.springer.com/public/cart?message=AddToCartSuccess",
        summaryLink:
          "https://link.springer.com/chapter/10.1007/978-3-031-23261-9_9",
        overview:
          "This peer‑reviewed chapter, written by Mohammed Ali and co-authored by Courtney Grant, indexed in Scopus, was published by Springer International in 2023.",
      },
      {
        id: 2,
        title: "How Human Factors Can Enhance Delivery of Equality, Diversity, and Inclusion",
        type: "Guidance Document",
        year: 2021,
        summary:
          "This comprehensive guidance explores how the scientific discipline of human factors (HF) can enhance the delivery of equality, diversity, and inclusion (EDI) by addressing systemic challenges in design, behavior, and organizational systems.",
        coverTheme: "linear-gradient(180deg, #0B1120, #1D4ED8)",
        coverImage:
          "/How human factors can enhance the delivery of equality, diversity, and inclusion (EDI).JPG",
        focus:
          "Human factors science, systems thinking, participatory design, and EDI delivery",
        format: "Peer-reviewed guidance",
        purchaseLink:
          "https://ergonomics.org.uk/asset/9C908FC3-3BAB-474C-88FEB4BCC8C1D351/",
        summaryLink:
          "https://ergonomics.org.uk/asset/9C908FC3-3BAB-474C-88FEB4BCC8C1D351/",
        overview:
          "This peer-reviewed guidance, written by Courtney Grant and contributors including Mohammed Ali, was published by the Chartered Institute of Ergonomics & Human Factors (CIEHF) in 2021.",
      },
      {
        id: 3,
        title: "Responding to a Crisis",
        type: "Magazine Article",
        year: 2020,
        summary:
          "This feature article explores the role of human factors in civic disaster planning and community-led emergency response, drawing on Mohammed Ali's firsthand experiences as a volunteer in the aftermath of the Grenfell Tower fire.",
        coverTheme: "linear-gradient(180deg, #111827, #2563EB)",
        coverImage: "/Ergonomist.png",
        focus:
          "Disaster planning, crisis response, volunteer coordination, and human factors application",
        format: "Magazine feature",
        purchaseLink:
          "https://ergonomics.org.uk/asset/629503CA%2D48C8%2D4F38%2D8C53974F5F9E73BC/",
        summaryLink: "https://ergonomics.org.uk/resource/te-2020-compendium.html",
        overview:
          "This article, co-authored by Mohammed Ali and Courtney Grant, was published in The Ergonomist, the magazine of the Chartered Institute of Ergonomics & Human Factors.",
      },
      {
        id: 5,
        title: "Our Impact (Quarter 1, 2022)",
        type: "Magazine",
        year: 2022,
        summary:
          "This special issue of Our Impact magazine explores the intersection of health, human factors, and inclusivity, focusing on improving population well-being through expert interviews and real-life experiences.",
        coverTheme: "linear-gradient(180deg, #0F172A, #1E3A8A)",
        coverImage: "/Our Impact Quarter 1 2022 (Final).JPG",
        focus:
          "Public health, psychiatry, mind management, spirituality, and youth empowerment",
        format: "Well-being Special Edition, PDF",
        purchaseLink: "/Our Impact Quarter 1 2022 (Final).pdf",
        summaryLink: "/Our Impact Quarter 1 2022 (Final).pdf",
        overview:
          "This 8th issue brings together global perspectives on health and human factors. It features exclusive interviews with Public Health Director Professor Kevin Fenton on COVID-19 and healthy lifestyles, and Consultant Psychiatrist Professor Steve Peters on developing resilience. The magazine also explores pathways to improving lives through public health interventions, elite sports psychiatry, spirituality, and grassroots community support.",
      },
      {
        id: 6,
        title: "Our Impact (7th Issue)",
        type: "Magazine",
        year: 2021,
        summary:
          "This special one-year anniversary edition of Our Impact magazine explores global issues of social justice, systemic inequality, and the ethical implications of emerging technology through high-profile interviews and expert analysis.",
        coverTheme: "linear-gradient(180deg, #111827, #2563EB)",
        coverImage: "/Our Impact Oct-Nov Article 2021 (Final).JPG",
        focus: "Racial justice, AI ethics, femicide prevention and systemic reform",
        format: "Magazine",
        purchaseLink: "/Our Impact Oct-Nov Article 2021 (Final).pdf",
        summaryLink: "/Our Impact Oct-Nov Article 2021 (Final).pdf",
        overview:
          "This landmark 7th issue features an exclusive interview with LaTonya Floyd regarding the life and global legacy of her brother, George Floyd. This special edition examines the intersection of systemic racism, gender-based violence, and technological discrimination by reflecting on the tragic deaths of George Floyd, Sabina Nessa, and Sarah Everard.",
      },
      {
        id: 7,
        title: "Our Impact (6th edition)",
        type: "Magazine",
        year: 2021,
        summary:
          "This special fourth-anniversary edition of Our Impact magazine provides a bilingual tribute to the 72 lives lost in the Grenfell Tower fire, offering a critical analysis of disaster management and the vital role of faith-based and voluntary organizations in crisis response.",
        coverTheme: "linear-gradient(180deg, #0B1120, #1D4ED8)",
        coverImage: "/Our Impact Grenfell (Iran) ver 7 copy.JPG",
        focus:
          "Disaster planning, human factors in crisis response, faith-based humanitarianism, and third-sector coordination",
        format: "Grenfell Tower Special Edition (English and Farsi)",
        purchaseLink: "/Our Impact Grenfell (Iran) ver 7 copy.pdf",
        summaryLink: "/Our Impact Grenfell (Iran) ver 7 copy.pdf",
        overview:
          "This 6th issue is a collaboration with the Ergonomic Student Magazine in Iran, disseminated in both English and Farsi. It features exclusive interviews on managing community disasters and harnessing the third sector. The issue also includes a human factors analysis of the Grenfell response by Courtney Grant and Mohammed Ali, alongside a moving tribute commemorating the victims. This edition explores the systematic failures and coordination challenges encountered after the Grenfell tragedy, showing how process mapping and cognitive task analysis can help civic authorities integrate the voluntary sector into strategic disaster planning rather than treating it as a last-minute addition.",
      },
      {
        id: 8,
        title: "Our Impact (5th Issue)",
        type: "Magazine",
        year: 2021,
        summary:
          "This special edition of Our Impact magazine serves as a poignant tribute to the life and legacy of Stephen Lawrence, exploring personal memories from those who knew him and providing a critical analysis of institutional racism in the United Kingdom.",
        coverTheme: "linear-gradient(180deg, #0B1120, #1D4ED8)",
        coverImage: "/Our Impact May-June Article 2021 (Final).JPG",
        focus: "Equality Diversity Inclusion, social justice, and youth resilience",
        format: "Stephen Lawrence Special Edition Magazine",
        purchaseLink: "/Our Impact May-June Article 2021 (Final).pdf",
        summaryLink: "/Our Impact May-June Article 2021 (Final).pdf",
        overview:
          "This issue features an exclusive interview with The Right Honourable Stuart Lawrence regarding his debut book, Silence is Not an Option, focused on teaching resilience to the next generation. The magazine examines the profound and lasting impact of Stephen Lawrence’s life on British society and the ongoing fight for racial equity.",
      },
      {
        id: 9,
        title: "Our Impact Magazine: Spring Edition (4th Issue)",
        type: "Magazine",
        year: 2021,
        summary:
          "This fourth issue of Our Impact magazine highlights systemic inequalities in higher education, neurodiversity awareness through film, and the application of human factors to improve the safety and well-being of the elderly.",
        coverTheme: "linear-gradient(180deg, #0B1120, #1D4ED8)",
        coverImage: "/Our Impact Mar-Apr Article 2021 (Final pages).JPG",
        focus: "Autism awareness, elderly safety, and educational equity",
        format: "Magazine",
        purchaseLink: "/Our Impact Mar-Apr Article 2021 (Final pages).pdf",
        summaryLink: "/Our Impact Mar-Apr Article 2021 (Final pages).pdf",
        overview:
          "This 4th issue features a deep dive into social justice and safety through diverse global perspectives. It includes a two-part interview with equity specialist Sofia Akel on the landmark adoption of an Islamophobia definition by London Metropolitan University and her Free Books Campaign partnership with musician Kano. The issue examines critical barriers to success and safety across marginalized groups and explores the double barrier of institutional racism and Islamophobia, advocating for decolonizing education to close attainment gaps and ensure safety for all students.",
      },
      {
        id: 10,
        title: "Our Impact Magazine: Vaccine Special (3rd Issue)",
        type: "Magazine",
        year: 2021,
        summary:
          "This third issue of Our Impact magazine provides a comprehensive analysis of the COVID-19 vaccine landscape, exploring the scientific, regulatory, and social dimensions of the global immunization effort to offer readers reassurance and evidence-based hope.",
        coverTheme: "linear-gradient(180deg, #0B1120, #1D4ED8)",
        coverImage: "/Our Impact Jan -Feb Article 2021 (Version 12).JPG",
        focus:
          "Vaccine development, clinical trials, regulatory approval, vaccine hesitancy, and global health equity",
        format: "Vaccine Special Edition",
        purchaseLink: "/Our Impact Jan -Feb Article 2021 (Version 12).pdf",
        summaryLink: "/Our Impact Jan -Feb Article 2021 (Version 12).pdf",
        overview:
          "This 3rd issue brings together medical and data science experts to demystify the vaccine process. It features clinical data scientist Parvez Sheikh-Taj discussing the clinical trial lifecycle and an exclusive interview with Muhyadeen Mohamed from the Ministry of Health Puntland State of Somalia. The edition examines the paradigm shift in medical innovation triggered by the pandemic, where global collaboration and parallel processing enabled life-saving vaccines to be developed in months rather than years, while highlighting the need for equitable vaccine distribution so nations like Somalia are not left behind.",
      },
      {
        id: 11,
        title: "Our Impact Magazine: 2nd Issue",
        type: "Magazine",
        year: 2020,
        summary:
          "This second issue of Our Impact magazine provides a multidisciplinary analysis of the second wave of the COVID-19 pandemic, offering expert guidance on maintaining employability, finding one's voice through public speaking, and staying physically fit during times of global uncertainty.",
        coverTheme: "linear-gradient(180deg, #0B1120, #1D4ED8)",
        coverImage: "/Our Impact Nov- December Article 2020 (Final).JPG",
        focus:
          "COVID-19 second wave analysis, career resilience, public speaking, and holistic fitness",
        format: "2nd Issue",
        purchaseLink: "/Our Impact Nov- December Article 2020 (Final).pdf",
        summaryLink: "/Our Impact Nov- December Article 2020 (Final).pdf",
        overview:
          "This issue brings together expertise in public health, psychology, and physical training to help readers navigate the challenges of the pandemic. It features an exclusive interview with Lean UX leader Jeff Gothelf on his book Forever Employable, and a discussion with renowned voice coach Caroline Goyder on building confidence and gravitas. The edition explores how individuals can build resilience during the second wave of the coronavirus and applies the human factors concept of varied mapping to explain the psychological confusion caused by changing public health rules, advocating for clearer systemic communication.",
      },
      {
        id: 12,
        title: "Our Impact Magazine: Inaugural Edition (1st Issue)",
        type: "Magazine",
        year: 2020,
        summary:
          "This debut issue of Our Impact magazine introduces a multidisciplinary approach to social and systemic challenges, examining the human factors of disaster management in the wake of the Grenfell Tower fire, the reorganization of NHS hospital services, and community-led COVID-19 emergency responses.",
        coverTheme: "linear-gradient(180deg, #0B1120, #1D4ED8)",
        coverImage: "/Our Impact Sept - October Article 2020 (Final).JPG",
        focus:
          "Disaster management, healthcare system design, community volunteering, and bereavement poetry",
        format: "1st Issue Special Edition",
        purchaseLink: "/Our Impact Sept - October Article 2020 (Final).pdf",
        summaryLink: "/Our Impact Sept - October Article 2020 (Final).pdf",
        overview:
          "This landmark first issue explores the intersection of human factors and civic response. It features a multi-disciplinary analysis of the Improving Healthcare Together plan for Sutton Hospital with Ariyan Makhecha, and an account of local pandemic support by Marta Rocco. The edition advocates for an integrated systems thinking approach to holistic health and crisis management, applying human factors principles such as Task Analysis and Link Analysis to evaluate systemic complexity across hospital service fragmentation and the cognitive demands placed on disaster relief volunteers.",
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activePublication = publications[activeIndex];

  const nextPublication = () => {
    setActiveIndex((prev) => (prev + 1) % publications.length);
  };

  const prevPublication = () => {
    setActiveIndex((prev) => (prev - 1 + publications.length) % publications.length);
  };

  return (
    <section
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "140px 80px 100px",
        background: "#07111F",
        color: "white",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <p
          style={{
            color: "#60A5FA",
            letterSpacing: "1.4px",
            fontWeight: 700,
            marginBottom: "18px",
            textTransform: "uppercase",
          }}
        >
          Research & Publications
        </p>
        <section id="research"></section>
        <h1
          style={{
            fontSize: "76px",
            lineHeight: "0.98",
            letterSpacing: "-3px",
            margin: "0 0 22px",
            maxWidth: "950px",
          }}
        >
          Evidence, Insight and Published Work
        </h1>

        <p
          style={{
            color: "#CBD5E1",
            fontSize: "20px",
            lineHeight: "1.9",
            maxWidth: "860px",
            marginBottom: "60px",
          }}
        >
          Explore reports, evaluations, articles and published outputs across
          equity, workforce development, digital innovation, public health and
          community impact.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "36px",
            marginBottom: "70px",
            alignItems: "stretch",
          }}
          className="research-feature-grid"
        >
          <div
            style={{
              position: "relative",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "34px",
              padding: "34px",
              boxShadow: "0 24px 70px rgba(0,0,0,0.3)",
              backdropFilter: "blur(14px)",
              overflow: "hidden",
              minHeight: "640px",
            }}
            className="featured-publication-panel"
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015) 45%, rgba(255,255,255,0.01) 100%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  alignSelf: "flex-start",
                  padding: "10px 16px",
                  borderRadius: "999px",
                  background: "rgba(7,17,31,0.74)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#93C5FD",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "28px",
                }}
              >
                Featured Publication
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.15fr 260px",
                  gap: "28px",
                  alignItems: "center",
                  flex: 1,
                }}
                className="featured-publication-inner"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minWidth: 0,
                  }}
                >
                  <p
                    style={{
                      color: "#60A5FA",
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "1.4px",
                      textTransform: "uppercase",
                      marginBottom: "14px",
                    }}
                  >
                    {activePublication.type}
                  </p>

                  <h2
                    style={{
                      fontSize: "42px",
                      lineHeight: "1.02",
                      letterSpacing: "-1.6px",
                      margin: "0 0 18px",
                      maxWidth: "11ch",
                      color: "white",
                    }}
                  >
                    {activePublication.title}
                  </h2>

                  <p
                    style={{
                      color: "#E2E8F0",
                      lineHeight: "1.8",
                      fontSize: "16px",
                      maxWidth: "34ch",
                      marginBottom: "24px",
                    }}
                  >
                    {activePublication.summary}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      flexWrap: "wrap",
                      marginBottom: "10px",
                    }}
                  >
                    <a
                      href={activePublication.purchaseLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        ...primaryButton,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      Open Document
                    </a>

                    <a
                      href={activePublication.summaryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        ...secondaryButton,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        background: "rgba(31,41,55,0.4)",
                      }}
                    >
                      Read Summary
                    </a>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "250px",
                      aspectRatio: "0.72 / 1",
                      overflow: "hidden",
                      background:
                        activePublication.coverTheme || "rgba(255,255,255,0.08)",
                      boxShadow: "0 22px 50px rgba(0,0,0,0.28)",
                    }}
                  >
                    {activePublication.coverImage ? (
                      <img
                        src={activePublication.coverImage}
                        alt={`${activePublication.title} cover`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#CBD5E1",
                          fontSize: "14px",
                          padding: "20px",
                          textAlign: "center",
                        }}
                      >
                        No cover image available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "30px",
              padding: "28px",
              backdropFilter: "blur(14px)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "22px",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "22px",
                  letterSpacing: "-0.5px",
                }}
              >
                Publication Details
              </h3>

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={prevPublication} style={sliderButton}>
                  ←
                </button>
                <button onClick={nextPublication} style={sliderButton}>
                  →
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gap: "18px" }}>
              <div style={detailRow}>
                <span style={detailLabel}>Title</span>
                <span style={detailValue}>{activePublication.title}</span>
              </div>
              <div style={detailRow}>
                <span style={detailLabel}>Type</span>
                <span style={detailValue}>{activePublication.type}</span>
              </div>
              <div style={detailRow}>
                <span style={detailLabel}>Year</span>
                <span style={detailValue}>{activePublication.year}</span>
              </div>
              <div style={detailRow}>
                <span style={detailLabel}>Focus</span>
                <span style={detailValue}>
                  {activePublication.focus || "Equity, workforce, digital health"}
                </span>
              </div>
              <div style={detailRow}>
                <span style={detailLabel}>Format</span>
                <span style={detailValue}>
                  {activePublication.format || "PDF publication"}
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: "28px",
                borderRadius: "24px",
                padding: "22px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p style={{ ...sectionTag, marginBottom: "10px" }}>Overview</p>
              <p
                style={{
                  margin: 0,
                  color: "#CBD5E1",
                  lineHeight: "1.85",
                }}
              >
                {activePublication.overview ||
                  "This section can hold author names, commissioning organisations, abstracts, download links and impact statements for each report."}
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            gap: "20px",
            marginBottom: "26px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p style={sectionTag}>Publication Archive</p>
            <h2 style={{ margin: 0, fontSize: "48px", letterSpacing: "-2px" }}>
              All Research Publications
            </h2>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "24px",
          }}
          className="publication-grid"
        >
          {publications.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveIndex(index)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border:
                  index === activeIndex
                    ? "1px solid rgba(96,165,250,0.34)"
                    : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "28px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
                transition: "transform 240ms ease, box-shadow 240ms ease",
              }}
            >
              <div
                style={{
                  aspectRatio: "3 / 4",
                  background: item.coverImage
                    ? `center / cover no-repeat url("${item.coverImage}")`
                    : item.coverTheme,
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "start",
                  padding: "22px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "18px",
                    left: "18px",
                    padding: "8px 12px",
                    borderRadius: "999px",
                    background: "rgba(7,17,31,0.65)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#93C5FD",
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  PDF
                </div>
              </div>

              <div style={{ padding: "22px" }}>
                <p
                  style={{
                    color: "#60A5FA",
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "12px",
                  }}
                >
                  {item.type}
                </p>

                <p
                  style={{
                    color: "#CBD5E1",
                    lineHeight: "1.75",
                    fontSize: "15px",
                    margin: 0,
                  }}
                >
                  {item.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function TrustBar() {
  const items = [
    "Springer Published Author",
    "NHS Digital Transformation",
    "Public Health Specialist",
    "Community Impact Projects",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginTop: "24px",
        marginBottom: "18px",
        alignItems: "center",
      }}
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              borderRadius: "999px",
              background: isActive
                ? "linear-gradient(135deg, rgba(96,165,250,0.18), rgba(59,130,246,0.10))"
                : "rgba(255,255,255,0.02)",
              border: isActive
                ? "1px solid rgba(147,197,253,0.30)"
                : "1px solid rgba(255,255,255,0.05)",
              fontSize: "12px",
              fontWeight: "500",
              color: isActive ? "#EAF3FF" : "rgba(255,255,255,0.7)",
              boxShadow: isActive
                ? "0 0 0 1px rgba(96,165,250,0.10), 0 0 22px rgba(59,130,246,0.14)"
                : "none",
              transform: isActive ? "translateY(-1px)" : "translateY(0px)",
              transition:
                "background 260ms ease, border 260ms ease, color 260ms ease, box-shadow 260ms ease, transform 260ms ease",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: isActive ? "#93C5FD" : "#60A5FA",
                boxShadow: isActive ? "0 0 12px rgba(96,165,250,0.8)" : "none",
                transition: "all 260ms ease",
              }}
            />
            {item}
          </div>
        );
      })}
    </div>
  );
}
/* ---------------- HOME PAGE ---------------- */

function HomePage({ onNavigate }) {
  const statsRef = useRef(null);
  const [startStats, setStartStats] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchContainerRef = useRef(null);

  const stats = useMemo(
    () => [
   {
  target: 4160,
  label: "Annual Work Hours Saved",
  icon: <BriefcaseIcon />,
  duration: 550,
},
{
  target: 91500,
  label: "Cost Savings",
  icon: < CurrencyPoundIcon />,
  duration: 500,
  prefix: "£",
},
{
  target: 25000,
  label: "Workforce Served",
  icon: <ActivityIcon />,
  duration: 600,
  display: "thousand",
},
{
  target: 20,
  label: "Reduction in Hospital Waiting Times",
  icon: <ActivityIcon />,
  duration: 475,
  suffix: "%",
},
      {
  target: 1000000,
  label: "Population Coverage",
  icon: <UsersIcon />,
  duration: 675,
  display: "millionPlus",
},
{
  target: 27,
  label: "Countries Reached",
  icon: <GlobeIcon />,
  duration: 450,
},
    ],
    []
  );

  const testimonials = useMemo(
    () => [
      {
        name: "Florence Eshalomi MP",
        role: "MEMBER OF PARLIAMENT OF THE UNITED KINGDOM",
        image: "/Florence Eshalomi.jpg",
        alt: "Florence Eshalomi",
        quote:
          "It was great to have you there and we have had some great feedback from schools who said that students had some great conversations.",
      },
      {
        name: "James Labrum",
        role: "DIGITAL MARKETING MANAGER",
        image: "/james-labrum.jfif",
        alt: "James Labrum",
        quote:
          "The creative ideation process was always engaging and brought fruitful results to the projects’ end goals.",
      },
      {
        name: "Rebecca Duffus",
        role: "SEN ADVISORY TEACHER",
        image: "/Rebecca Duffus.jfif",
        alt: "Rebecca Duffus",
        quote:
          "I appreciate the dedication and enthusiasm to create such an amazing piece.",
      },
      {
        name: "LaTonya Floyd",
        role: "SISTER OF GEORGE FLOYD",
        image: "/latonya-floyd.jpg",
        alt: "LaTonya Floyd",
        quote:
          "What you did for us was so beautiful thank you so much God bless you always",
      },
      {
        name: "Cristiana Atherton",
        role: "SPEECH AND LANGUAGE THERAPIST",
        image: "/cristiana-atherton.jpg",
        alt: "Cristiana Atherton",
        quote:
          "It was so wonderful to work with someone so kind, caring, interested, and driven. You have such good energy and really think about the patients and want to do the best for them.",
      },
      {
        name: "Professor Sam Idowu",
        role: "PRESIDENT AND CEO OF GLOBAL CORPORATE GOVERNANCE INSTITUTE",
        image: "/sam idowu.JPG",
        alt: "Professor Sam Idowu",
        quote:
          "Your research and contributions to our book series are an excellent addition.",
      },
      {
        name: "Jennifer Sibley",
        role: "DIRECTOR OF ENVIRONMENT AND PLANNING",
        image: "/jennifer-sibley.JPG",
        alt: "Jennifer Sibley",
        quote:
          "You were a huge help in the development of this event and I am grateful for the time you dedicated to supporting it.",
      },
      {
        name: "Desiree Saunders",
        role: "ASSISTANT GENERAL MANAGER (NHS)",
        image: "/desiree-saunders.jpg",
        alt: "Desiree Saunders",
        quote:
          "The Portal is highly user-friendly, with clear guidance and an intuitive process throughout. The support is outstanding, responsive, helpful, and committed to ensuring a positive experience.",
      },
    ],
    []
  );

  // ---------- SEARCH INDEX (covers everything on the site) ----------
  const searchIndex = useMemo(() => {
    const results = [];

    // 1. Home page content
    results.push({
      type: "Home",
      title: "Digital Transformations",
      description: "Transforming complex processes into intelligent digital services through automation, analytics and AI.",
      page: "home",
    });
    stats.forEach(stat => {
      results.push({
        type: "Key Stat",
        title: stat.label,
        description: `${stat.prefix || ""}${stat.target}${stat.suffix || ""} – ${stat.label}`,
        page: "home",
      });
    });
    testimonials.forEach(t => {
      results.push({
        type: "Testimonial",
        title: t.name,
        description: t.quote.substring(0, 120),
        page: "home",
      });
    });

    // 2. Film project page
    const filmProject = {
      title: "Documentary Storytelling for Public Health and Community Impact",
      description: "A project-led body of film work combining interviews, public health communication, youth voice and community documentation.",
      page: "film",
    };
    results.push({ type: "Film Project", ...filmProject });
    const selectedWorks = [
      { title: "Vacci-Nation", description: "A public health film addressing vaccine hesitancy." },
      { title: "Young Sutton Voices", description: "A youth-centred film exploring autism awareness." },
      { title: "Interview with Vanessa McCain", description: "Conversation on resilience and advocacy." },
      { title: "Interview with Abdurahman Sayed", description: "Discussion on Grenfell recovery and faith-based support." }
    ];
    selectedWorks.forEach(work => {
      results.push({
        type: "Film",
        title: work.title,
        description: work.description,
        page: "film",
      });
    });

    // 3. Research publications (using the same data as ResearchPage)
    const publicationsData = [
      { title: "Leveraging Performative Arts Programmes for Enhancing Skills and Well-Being in Global Majority Youth", type: "Book Chapter", summary: "This peer-reviewed chapter explores the role of public health, creative arts, recruitment and widening participation." },
      { title: "CSR and Coping with COVID-19 Pandemic in the Global Health Service Institutions: The United Kingdom", type: "Book Chapter", summary: "Investigates how CSR supported the NHS and disadvantaged communities." },
      { title: "How Human Factors Can Enhance Delivery of Equality, Diversity, and Inclusion", type: "Guidance Document", summary: "Explores how human factors can enhance EDI delivery." },
      { title: "Responding to a Crisis", type: "Magazine Article", summary: "Explores human factors in civic disaster planning." },
      { title: "Our Impact (Quarter 1, 2022)", type: "Magazine", summary: "Explores health, human factors, and inclusivity." },
      { title: "Our Impact (7th Issue)", type: "Magazine", summary: "Explores social justice, AI ethics, and systemic reform." }
    ];
    publicationsData.forEach(pub => {
      results.push({
        type: `Publication (${pub.type})`,
        title: pub.title,
        description: pub.summary,
        page: "research",
      });
    });

    // 4. Automation & AI page
    const automationItems = [
      { title: "End-to-End Workforce Automation", description: "Power Automate, SharePoint and Power BI integrated ecosystem." },
      { title: "AI Digital Assistant", description: "Conversational AI to enhance user support." },
      { title: "Microsoft Teams Service Integration", description: "Adaptive Cards for integrated service delivery." },
      { title: "AI-Powered Knowledge Platforms", description: "Conversational access to organisational knowledge." }
    ];
    automationItems.forEach(item => {
      results.push({
        type: "Automation & AI",
        title: item.title,
        description: item.description,
        page: "automation",
      });
    });

    return results;
  }, [stats, testimonials]);

  // Real‑time search filter
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (term.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      setSelectedIndex(-1);
      return;
    }
    const filtered = searchIndex.filter(item =>
      item.title.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term)
    );
    setSearchResults(filtered);
    setShowResults(true);
    setSelectedIndex(-1);
  }, [searchTerm, searchIndex]);

  const handleResultClick = (result) => {
    onNavigate(result.page);
    setShowResults(false);
    setSearchTerm("");
    // Optional: scroll to section if needed
    if (result.page === "automation") {
      setTimeout(() => document.getElementById("automation")?.scrollIntoView({ behavior: "smooth" }), 100);
    } else if (result.page === "research") {
      setTimeout(() => document.getElementById("research")?.scrollIntoView({ behavior: "smooth" }), 100);
    } else if (result.page === "film") {
      setTimeout(() => document.getElementById("film")?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  const handleKeyDown = (e) => {
    if (!showResults || searchResults.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % searchResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleResultClick(searchResults[selectedIndex]);
    } else if (e.key === "Escape") {
      setShowResults(false);
      setSearchTerm("");
    }
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const visibleTestimonials = getVisibleTestimonials(
    testimonials,
    testimonialIndex,
    3
  );

  const nextTestimonials = () => {
    setTestimonialIndex((prev) => (prev + 3) % testimonials.length);
  };

  const prevTestimonials = () => {
    setTestimonialIndex(
      (prev) => (prev - 3 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartStats(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          padding: "14px 80px",
          marginTop: "108px",
          background: "rgba(255,255,255,0.03)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          gap: "45px",
          color: "#CBD5E1",
          fontSize: "14px",
          backdropFilter: "blur(12px)",
          boxSizing: "border-box",
          flexWrap: "wrap",
        }}
      >
        <span>● AI Systems Active</span>
        <span>● Workforce Analytics Online</span>
        <span>● Equity Reporting Enabled</span>
        <span>● Community Intelligence Live</span>
      </div>

      <section
        style={{
          minHeight: "100vh",
          width: "100%",
          padding: "120px 80px 100px",
          position: "relative",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: "-250px",
            width: "700px",
            height: "700px",
            background:
              "radial-gradient(circle, rgba(0,94,184,0.35) 0%, rgba(0,94,184,0) 70%)",
            filter: "blur(90px)",
            animation: "glow 6s infinite ease-in-out",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-250px",
            right: "-250px",
            width: "800px",
            height: "800px",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.28) 0%, rgba(59,130,246,0) 70%)",
            filter: "blur(90px)",
            animation: "glow 8s infinite ease-in-out",
          }}
        />

        <div
          className="hero-grid"
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr",
            gap: "90px",
            alignItems: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div>
            <p
              style={{
                color: "#60A5FA",
                letterSpacing: "1px",
                fontWeight: "700",
                marginBottom: "25px",
              }}
            >
              AI • DATA INTELLIGENCE • CREATIVE HEALTH • EQUITY SYSTEMA
            </p>

            <h1
              style={{
                fontSize: "105px",
                lineHeight: "0.95",
                letterSpacing: "-5px",
                marginBottom: "35px",
                maxWidth: "950px",
              }}
            >
              Digital Transformations
              <br />
            </h1>

            <p
              style={{
                color: "#CBD5E1",
                fontSize: "24px",
                lineHeight: "1.9",
                maxWidth: "850px",
                marginBottom: "45px",
              }}
            >
              Transforming complex processes into intelligent digital services through automation, analytics and AI—reducing administrative burden, improving visibility and enabling better decisions.
            </p>

            {/* SEARCH COMPONENT */}
            <div ref={searchContainerRef} style={{ position: "relative", width: "100%", maxWidth: "720px", marginBottom: "40px" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <input
                  type="text"
                  placeholder="Search anything on this site..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => searchTerm.length >= 2 && setShowResults(true)}
                  style={{
                    flex: 1,
                    padding: "24px 28px",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(12px)",
                    color: "white",
                    fontSize: "17px",
                    outline: "none",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
                  }}
                />
                <button
                  onClick={() => setShowResults(!showResults)}
                  style={{
                    padding: "0 32px",
                    borderRadius: "20px",
                    border: "none",
                    cursor: "pointer",
                    background: "linear-gradient(135deg,#2563EB,#60A5FA)",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "16px",
                    whiteSpace: "nowrap",
                    boxShadow: "0 15px 30px rgba(37,99,235,0.3)",
                  }}
                >
                  🔍 Search
                </button>
              </div>

              {/* Dropdown results */}
              {showResults && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    marginTop: "12px",
                    background: "rgba(7,17,31,0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "20px",
                    maxHeight: "400px",
                    overflowY: "auto",
                    zIndex: 100,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                  }}
                >
                  {searchResults.length === 0 && searchTerm.length >= 2 ? (
                    <div style={{ padding: "20px", color: "#CBD5E1", textAlign: "center" }}>
                      No results found for "{searchTerm}"
                    </div>
                  ) : (
                    searchResults.map((result, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleResultClick(result)}
                        style={{
                          padding: "16px 20px",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                          cursor: "pointer",
                          transition: "background 0.2s",
                          background: selectedIndex === idx ? "rgba(96,165,250,0.15)" : "transparent",
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                      >
                        <div style={{ fontSize: "12px", color: "#60A5FA", marginBottom: "4px" }}>
                          {result.type}
                        </div>
                        <div style={{ fontWeight: "600", color: "white" }}>{result.title}</div>
                        <div style={{ fontSize: "13px", color: "#CBD5E1", marginTop: "4px" }}>
                          {result.description.length > 100 ? result.description.substring(0, 100) + "…" : result.description}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: "60px",
                flexWrap: "wrap",
              }}
            >
              <button style={primaryButton}>Book a Consultation</button>
              <button
                style={secondaryButton}
                onClick={() => onNavigate("automation")}
              >
                View Case Studies
              </button>
            </div>
            <TrustBar />
            <div
              ref={statsRef}
              className="stats-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "22px",
                maxWidth: "980px",
                marginTop: "38px"
              }}
            >
              <SequentialStats stats={stats} start={startStats} />
            </div>
          </div>

          <div
            style={{
              position: "relative",
            }}
          >
            <GifDeck />
          </div>
        </div>
      </section>

      <section
        style={{
          width: "100%",
          padding: "0 80px 120px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(37,99,235,0.25), rgba(15,23,42,0.95))",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "40px",
            padding: "80px",
            position: "relative",
            overflow: "hidden",
            backdropFilter: "blur(18px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "350px",
              height: "350px",
              background:
                "radial-gradient(circle, rgba(96,165,250,0.4) 0%, rgba(96,165,250,0) 70%)",
              filter: "blur(40px)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: "900px",
            }}
          >
            <p style={sectionTag}>MEMBERSHIP ACCESS</p>

            <h1
              style={{
                fontSize: "64px",
                lineHeight: "1.05",
                letterSpacing: "-2px",
                marginBottom: "30px",
              }}
            >
              Join The Intelligent Impact Network
            </h1>

            <p
              style={{
                color: "#CBD5E1",
                lineHeight: "1.9",
                fontSize: "20px",
                marginBottom: "45px",
                maxWidth: "760px",
              }}
            >
              Access exclusive workforce intelligence, AI insight reports,
              strategic dashboards, creative health research and cross-sector
              collaboration opportunities.
            </p>

            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  minWidth: "300px",
                  padding: "22px 26px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  fontSize: "16px",
                  outline: "none",
                }}
              />

              <button style={primaryButton}>Become A Member</button>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          width: "100%",
          padding: "0 80px 140px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            marginBottom: "60px",
          }}
        >
          <p style={sectionTag}>TRUSTED ACROSS SYSTEMS</p>
          <h1 style={sectionHeading}>
            Trusted By Communities, Leaders and Strategic Partners
          </h1>
        </div>

        <div
          className="testimonial-slider-wrap"
          style={{
            position: "relative",
          }}
        >
          <button
            onClick={prevTestimonials}
            style={{
              ...sliderButton,
              position: "absolute",
              left: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 5,
            }}
            aria-label="Previous testimonials"
          >
            ←
          </button>

          <button
            onClick={nextTestimonials}
            style={{
              ...sliderButton,
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 5,
            }}
            aria-label="Next testimonials"
          >
            →
          </button>

          <div
            className="testimonial-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "30px",
            }}
          >
            {visibleTestimonials.map((item) => (
              <div key={item.name} style={testimonialCard}>
                <img src={item.image} alt={item.alt} style={avatar} />
                <h3>{item.name}</h3>
                <p style={role}>{item.role}</p>
                <p style={quote}>“{item.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- FLOATING CHAT WIDGET ---------------- */
function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        role: "bot",
        text: "Hello. I'm the Impact QI AI Assistant. Ask me about publications, research, public health, documentaries, widening participation, or automation projects.",
        timestamp: Date.now(),
      },
    ];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage, timestamp: Date.now() },
    ]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.reply || "No response received.",
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, I couldn't connect to the AI service.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
    if (e.key === "Escape") setIsOpen(false);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "bot",
        text: "Chat cleared. Ask me anything!",
        timestamp: Date.now(),
      },
    ]);
  };

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 1000 }}>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "30px",
          background: "linear-gradient(135deg, #2563EB, #60A5FA)",
          border: "none",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            right: "0",
            width: "380px",
            maxWidth: "calc(100vw - 48px)",
            height: "560px",
            background: "#0A1222",
            borderRadius: "24px",
            border: "1px solid rgba(96,165,250,0.4)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "fadeInUp 0.2s ease-out",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              background: "rgba(37,99,235,0.15)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "5px",
                  background: "#60A5FA",
                  boxShadow: "0 0 8px #60A5FA",
                }}
              />
              <span style={{ fontWeight: "bold", color: "#93C5FD" }}>Impact QI AI</span>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={clearChat}
                style={{
                  background: "none",
                  border: "none",
                  color: "#94A3B8",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
                title="Clear chat"
              >
                🗑️
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#CBD5E1",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "10px 14px",
                    borderRadius: "18px",
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg, #2563EB, #60A5FA)"
                        : "rgba(255,255,255,0.08)",
                    color: "white",
                    fontSize: "14px",
                    lineHeight: "1.4",
                    wordWrap: "break-word",
                  }}
                >
                  {msg.text}
                </div>
                <span
                  style={{
                    fontSize: "10px",
                    color: "#64748B",
                    marginTop: "4px",
                    marginLeft: msg.role === "user" ? 0 : "8px",
                    marginRight: msg.role === "user" ? "8px" : 0,
                  }}
                >
                  {msg.timestamp ? formatTime(msg.timestamp) : ""}
                </span>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "8px" }}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    padding: "10px 14px",
                    borderRadius: "18px",
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      background: "#93C5FD",
                      borderRadius: "4px",
                      animation: "bounce 1.4s infinite ease-in-out",
                    }}
                  />
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      background: "#93C5FD",
                      borderRadius: "4px",
                      animation: "bounce 1.4s infinite ease-in-out 0.2s",
                    }}
                  />
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      background: "#93C5FD",
                      borderRadius: "4px",
                      animation: "bounce 1.4s infinite ease-in-out 0.4s",
                    }}
                  />
                </div>
                <span style={{ fontSize: "12px", color: "#94A3B8" }}>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(0,0,0,0.2)",
              display: "flex",
              gap: "10px",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask a question..."
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: "30px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.05)",
                color: "white",
                outline: "none",
                fontSize: "14px",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #2563EB, #60A5FA)",
                border: "none",
                borderRadius: "30px",
                padding: "10px 20px",
                color: "white",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </div>
  );
}

/* ---------------- APP ---------------- */

export default function App() {
  const [activePage, setActivePage] = useState("home");

  const navItemStyle = (page) => ({
    color: activePage === page ? "#93C5FD" : "#CBD5E1",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "16px",
  });

  const navButtonReset = {
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#07111F",
        color: "white",
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>
        {`
          @keyframes glow {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.08); opacity: 0.82; }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-14px); }
          }

          @keyframes fadeCard {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes panelBorderFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes statPulse {
            0% {
              transform: scale(1);
              box-shadow: 0 0 0 1px rgba(96,165,250,0.12), 0 0 0 rgba(96,165,250,0);
            }
            50% {
              transform: scale(1.015);
              box-shadow: 0 0 0 1px rgba(96,165,250,0.18), 0 0 28px rgba(96,165,250,0.14);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 0 0 1px rgba(96,165,250,0.12), 0 0 0 rgba(96,165,250,0);
            }
          }

          input::placeholder {
            color: #94A3B8;
          }

          @media (max-width: 1200px) {
            .hero-grid,
            .research-feature-grid,
            .featured-publication-inner,
            .film-project-overview,
            .film-collage-grid,
            .film-process-grid,
            .automation-before-after-grid,
            .automation-feature-grid,
            .automation-capability-grid,
            .automation-gallery-grid,
            .workflow-carousel-grid {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
            }

            .publication-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 1100px) {
            .stats-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }

            .testimonial-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 900px) {
            .film-works-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 768px) {
            .main-nav {
              display: none !important;
            }

            .publication-grid {
              grid-template-columns: 1fr !important;
            }

            .testimonial-slider-wrap {
              padding: 0 14px !important;
            }
          }

          @media (max-width: 680px) {
            .stats-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>

      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 100,
          padding: "24px 80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(7,17,31,0.7)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            cursor: "pointer",
          }}
          onClick={() => setActivePage("home")}
        >
          <img
            src="/logo.png"
            alt="ImpactQi logo"
            style={{
              width: "62px",
              height: "62px",
              objectFit: "contain",
            }}
          />

          <h1
            style={{
              margin: 0,
              fontSize: "30px",
              fontWeight: "800",
              letterSpacing: "-1px",
            }}
          >
            ImpactQi
          </h1>
        </div>

        <div
          className="main-nav"
          style={{
            display: "flex",
            gap: "40px",
          }}
        >
          <button onClick={() => setActivePage("home")} style={navButtonReset}>
            <span style={navItemStyle("home")}>Home</span>
          </button>
          <button onClick={() => setActivePage("automation")} style={navButtonReset}>
            <span style={navItemStyle("automation")}>Automation & AI</span>
          </button>
          <button onClick={() => setActivePage("film")} style={navButtonReset}>
            <span style={navItemStyle("film")}>Film Project</span>
          </button>
          <button onClick={() => setActivePage("research")} style={navButtonReset}>
            <span style={navItemStyle("research")}>Research</span>
          </button>
          <button onClick={() => setActivePage("home")} style={navButtonReset}>
            <span style={navItemStyle("membership")}>Membership</span>
          </button>
          <button onClick={() => setActivePage("home")} style={navButtonReset}>
            <span style={navItemStyle("contact")}>Contact</span>
          </button>
        </div>
      </nav>

      {activePage === "research" ? (
        <ResearchPage />
      ) : activePage === "film" ? (
        <FilmProjectsPage />
      ) : activePage === "automation" ? (
        <AutomationAIPage />
      ) : (
        <HomePage onNavigate={setActivePage} />
      )}

      {/* Floating chat widget – appears on all pages */}
      <ChatWidget />
    </div>
  );
}