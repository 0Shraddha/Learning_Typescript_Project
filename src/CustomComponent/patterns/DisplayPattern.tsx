import { useEffect, useState } from "react";
import { Lessons } from "./Lessons";
import { AppIcon } from "./icons";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #fdf6f0;
    --surface: #faeee8;
    --surface2: #f5e4db;
    --surface3: #efd8cc;
    --border: #e8c9be;
    --border-subtle: #f0ddd5;
    --accent: palevioletred;
    --accent-rgb: 219,112,147;
    --accent-dim: rgba(219,112,147,0.12);
    --accent-hover: #d4507a;
    --text: #3a1f2a;
    --text-muted: #7a4f5e;
    --text-dim: #b08898;
    --green: #7a9e7e;
    --green-dim: rgba(122,158,126,0.15);
    --blue: #7a8eb0;
    --font: 'DM Sans', system-ui, sans-serif;
    --mono: 'DM Mono', monospace;
    --radius: 8px;
    --radius-sm: 4px;
    --header-h: 56px;
    --sidebar-w: 360px;
  }

  .lp-app {
    font-family: var(--font);
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    line-height: 1.5;
  }

  /* ─── TOPBAR ─── */
  .lp-topbar {
    height: var(--header-h);
    background: var(--surface);
    border-bottom: 1px solid var(--border-subtle);
    display: flex;
    align-items: center;
    padding: 0 1.25rem;
    gap: 1rem;
    position: sticky;
    top: 0;
    z-index: 100;
    flex-shrink: 0;
  }

  .lp-topbar-divider {
    width: 1px;
    height: 20px;
    background: var(--border);
  }

  .lp-topbar-course-title {
    font-size: 0.82rem;
    color: var(--text-muted);
    font-weight: 400;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .lp-topbar-progress {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .lp-progress-bar-wrap {
    width: 120px;
    height: 4px;
    background: var(--surface3);
    border-radius: 99px;
    overflow: hidden;
  }

  .lp-progress-bar-fill {
    height: 100%;
    background: var(--accent);
    border-radius: 99px;
    transition: width 0.4s ease;
  }

  /* ─── BODY LAYOUT ─── */
  .lp-body {
    display: flex;
    flex: 1;
    overflow: hidden;
    height: calc(100vh - var(--header-h));
  }

  /* ─── MAIN CONTENT ─── */
  .lp-main {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  /* ─── VIDEO PLAYER ─── */
  .lp-video-wrap {
    background: var(--surface3);
    width: 100%;
    aspect-ratio: 16/9;
    max-height: 56vh;
    position: relative;
    flex-shrink: 0;
  }

  .lp-video-wrap video {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }

  .lp-video-empty {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: var(--surface3);
    color: var(--text-dim);
  }

  .lp-video-empty-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 2px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: var(--text-dim);
  }

  .lp-video-empty p {
    font-size: 0.85rem;
    color: var(--text-dim);
  }

  /* ─── CONTENT AREA BELOW VIDEO ─── */
  .lp-content-area {
    padding: 1.5rem 2rem 3rem;
    flex: 1;
    max-width: 900px;
  }

  /* ─── LESSON TITLE ROW ─── */
  .lp-lesson-header {
    margin-bottom: 1.25rem;
    animation: fadeUp 0.4s ease both;
  }

  .lp-lesson-title {
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text);
    line-height: 1.25;
    margin-bottom: 0.5rem;
  }

  .lp-lesson-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1rem;
  }

  .lp-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.25rem 0.7rem;
    border-radius: 99px;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.01em;
  }

  .lp-chip-yarn   { background: var(--accent-dim);  color: var(--accent); }
  .lp-chip-green  { background: var(--green-dim);   color: var(--green); }
  .lp-chip-blue   { background: rgba(91,156,246,.15); color: var(--blue); }

  /* ─── TABS ─── */
  .lp-tabs {
    display: flex;
    gap: 0;
    border-bottom: 1px solid var(--border);
    margin-bottom: 1.5rem;
    animation: fadeUp 0.4s 0.05s ease both;
  }

  .lp-tab {
    padding: 0.6rem 1.1rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text-muted);
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.15s;
    margin-bottom: -1px;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    font-family: var(--font);
  }

  .lp-tab:hover { color: var(--text); }

  .lp-tab.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  /* ─── TAB PANEL ─── */
  .lp-tab-panel { animation: fadeUp 0.3s ease both; }

  /* ─── OVERVIEW PANEL ─── */
  .lp-description-block {
    padding: 0 0 1rem 0;
  }

  .lp-description-block h4 {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-dim);
    margin-bottom: 0.6rem;
  }

  .lp-description-block p {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.7;
  }

  /* ─── STEPS PANEL ─── */
  .lp-steps-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius);
    overflow: hidden;
  }

  .lp-step-row {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border-subtle);
    transition: background 0.15s;
    cursor: default;
    position: relative;
  }

  .lp-step-row:last-child { border-bottom: none; }
  .lp-step-row:hover { background: var(--surface2); }

  .lp-step-num {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.72rem;
    font-weight: 700;
    font-family: var(--mono);
    margin-top: 1px;
  }

  .lp-step-row.type-row .lp-step-num {
    background: var(--accent-dim);
    color: var(--accent);
    border: 1px solid rgba(232,168,56,0.3);
  }

  .lp-step-row.type-info .lp-step-num {
    background: var(--green-dim);
    color: var(--green);
    border: 1px solid rgba(76,175,125,0.3);
  }

  .lp-step-body { flex: 1; }

  .lp-step-type-label {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.2rem;
  }

  .lp-step-row.type-row .lp-step-type-label { color: var(--accent); }
  .lp-step-row.type-info .lp-step-type-label { color: var(--green); }

  .lp-step-text {
    font-size: 0.88rem;
    color: var(--text);
    line-height: 1.55;
  }

  .lp-step-empty {
    padding: 3rem;
    text-align: center;
    color: var(--text-dim);
    font-size: 0.85rem;
    font-style: italic;
    background: var(--surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius);
  }

  /* ─── SIDEBAR ─── */
  .lp-sidebar {
    width: var(--sidebar-w);
    flex-shrink: 0;
    border-left: 1px solid var(--border-subtle);
    background: var(--surface);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .lp-sidebar-header {
    padding: 1rem 1.25rem 0.75rem;
    border-bottom: 1px solid var(--border-subtle);
    position: sticky;
    top: 0;
    background: var(--surface);
    z-index: 10;
  }

  .lp-sidebar-title {
    font-size: 0.82rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
  }

  .lp-sidebar-progress-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .lp-sidebar-progress-bar {
    flex: 1;
    height: 4px;
    background: var(--surface3);
    border-radius: 99px;
    overflow: hidden;
  }

  .lp-sidebar-progress-fill {
    height: 100%;
    background: var(--accent);
    border-radius: 99px;
    transition: width 0.4s ease;
  }

  /* ─── SECTION ─── */
  .lp-section {
    border-bottom: 1px solid var(--border-subtle);
  }

  .lp-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.9rem 1.25rem;
    cursor: pointer;
    user-select: none;
    transition: background 0.15s;
  }

  .lp-section-header:hover { background: var(--surface2); }

  .lp-section-name {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text);
    letter-spacing: -0.01em;
  }

  .lp-section-count {
    font-size: 0.72rem;
    color: var(--text-dim);
  }

  .lp-section-chevron {
    font-size: 0.7rem;
    color: var(--text-dim);
    transition: transform 0.2s;
  }

  .lp-section-chevron.open { transform: rotate(180deg); }

  /* ─── LESSON ROW ─── */
  .lp-lesson-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.65rem 1.25rem 0.65rem 2rem;
    cursor: pointer;
    transition: background 0.12s;
    border-top: 1px solid var(--border-subtle);
  }

  .lp-lesson-row:hover { background: var(--surface2); }

  .lp-lesson-row.active {
    background: rgba(219,112,147,0.1);
    border-left: 3px solid palevioletred;
    padding-left: calc(2rem - 3px);
  }

  .lp-lesson-check {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1.5px solid var(--border);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    transition: all 0.2s;
    cursor: pointer;
  }

  .lp-lesson-check.done {
    background: palevioletred;
    border-color: palevioletred;
    color: #fff;
  }

  .lp-lesson-check.active-check {
    border-color: var(--accent);
  }

  .lp-lesson-row-info { flex: 1; min-width: 0; }

  .lp-lesson-row-name {
    font-size: 0.82rem;
    color: var(--text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.3;
  }

  .lp-lesson-row.active .lp-lesson-row-name { color: var(--accent); font-weight: 600; }

  .lp-lesson-row-type {
    font-size: 0.68rem;
    color: var(--text-dim);
    margin-top: 1px;
  }

  .lp-play-icon {
    font-size: 0.7rem;
    color: var(--text-dim);
  }

  .lp-lesson-row.active .lp-play-icon { color: var(--accent); }

  /* ─── ANIMATIONS ─── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ─── SCROLLBARS ─── */
  .lp-main::-webkit-scrollbar,
  .lp-sidebar::-webkit-scrollbar { width: 4px; }
  .lp-main::-webkit-scrollbar-track,
  .lp-sidebar::-webkit-scrollbar-track { background: transparent; }
  .lp-main::-webkit-scrollbar-thumb,
  .lp-sidebar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 768px) {
    .lp-body { flex-direction: column; height: auto; overflow: visible; }
    .lp-sidebar { width: 100%; height: auto; border-left: none; border-top: 1px solid var(--border-subtle); }
    .lp-video-wrap { max-height: 220px; }
    .lp-content-area { padding: 1rem; }
    .lp-topbar-progress { display: none; }
  }
`;

interface PatternStep {
  id?: string;
  type: "row" | "info";
  text: string;
}

interface Pattern {
  videoUrl?: string;
  imageUrl?: string;
  title?: string;
  hook?: string;
  woolType?: string;
  woolColors?: string;
  description?: string;
  steps?: PatternStep[];
}

interface SidebarLesson {
  id: string;
  name: string;
  type: string;
  active?: boolean;
}

interface SidebarSection {
  id: string;
  name: string;
  lessons: SidebarLesson[];
}

const MOCK_CURRICULUM: SidebarSection[] = [
  {
    id: "s1",
    name: "Getting Started",
    lessons: [
      { id: "l1", name: "Introduction & Materials", type: "Video" },
      { id: "l2", name: "Reading the Pattern", type: "Guide" },
      { id: "l3", name: "Hook & Yarn Setup", type: "Video" },
    ],
  },
  {
    id: "s2",
    name: "Core Pattern",
    lessons: [
      { id: "l4", name: "Tutorial Video", type: "Video", active: true },
      { id: "l5", name: "Row-by-Row Steps", type: "Steps" },
      { id: "l6", name: "Joining & Finishing", type: "Video" },
    ],
  },
  {
    id: "s3",
    name: "Final Touches",
    lessons: [
      { id: "l7", name: "Blocking & Shaping", type: "Video" },
      { id: "l8", name: "Troubleshooting Guide", type: "Guide" },
    ],
  },
];

export const DisplayPattern = () => {
  const [pattern, setPattern] = useState<Pattern>({});
  const [activeTab, setActiveTab] = useState<"overview" | "steps">("overview");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ s1: false, s2: true, s3: false });
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set(["l1", "l2", "l3"]));

  useEffect(() => {
    try {
      const stored = localStorage.getItem("pattern");
      if (stored) setPattern(JSON.parse(stored));
    } catch (e) {
      console.error("Failed to parse pattern:", e);
    }
  }, []);

  const totalLessons = MOCK_CURRICULUM.flatMap(s => s.lessons).length;
  const progressPct = Math.round((completedLessons.size / totalLessons) * 100);

  const toggleSection = (id: string) =>
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));

  const toggleDone = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedLessons(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const title = pattern.title || "Crochet Pattern Tutorial";

  return (
    <>
      <style>{styles}</style>
  
      <div className="lp-app">
        {/* ── TOPBAR ── */}
        <header className="lp-topbar">
         
          <div className="" />
          <div className="lp-topbar-course-title">{title}</div>
          <div className="lp-topbar-progress">
            <div className="lp-progress-bar-wrap">
              <div className="lp-progress-bar-fill" style={{ width: `${progressPct}%` }} />
            </div>
            <span>{progressPct}% complete</span>
            <div className="lp-topbar-divider" />
            <span>{completedLessons.size}/{totalLessons} completed</span>
          </div>
        </header>

        {/* ── BODY ── */}
        <div className="lp-body">

          {/* ── MAIN ── */}
          <main className="lp-main">

            {/* VIDEO */}
            <div className="lp-video-wrap">
              {pattern.videoUrl ? (
                <video controls>
                  <source src={pattern.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="lp-video-empty">
                  <div className="lp-video-empty-icon">▶</div>
                  <p>No tutorial video uploaded yet</p>
                </div>
              )}
            </div>

            {/* CONTENT BELOW VIDEO */}
            <div className="lp-content-area">

              {/* Lesson header */}
              <div className="lp-lesson-header">
                <h1 className="lp-lesson-title">{title}</h1>
              </div>

              {/* TABS */}
              <div className="lp-tabs">
                <button
                  className={`lp-tab ${activeTab === "overview" ? "active" : ""}`}
                  onClick={() => setActiveTab("overview")}
                >Overview</button>
                <button
                  className={`lp-tab ${activeTab === "steps" ? "active" : ""}`}
                  onClick={() => setActiveTab("steps")}
                >Pattern Steps {pattern.steps?.length ? `(${pattern.steps.length})` : ""}</button>
              </div>

              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <div className="lp-tab-panel">

                  <div className="lp-description-block">
                    <h4>About This Pattern</h4>
                    <p>{pattern.description || "No description has been added for this pattern yet."}</p>
                    <div className="lp-lesson-meta">
                      {pattern.hook && (
                        <span className="lp-chip lp-chip-yarn">🪝 Hook {pattern.hook}</span>
                      )}
                      {pattern.woolType && (
                        <span className="lp-chip lp-chip-blue">🧵 {pattern.woolType}</span>
                      )}
                      {pattern.woolColors && (
                        <span className="lp-chip lp-chip-green">🎨 {pattern.woolColors}</span>
                      )}
                      {!pattern.hook && !pattern.woolType && !pattern.woolColors && (
                        <span className="lp-chip lp-chip-yarn">No materials info yet</span>
                      )}
                    </div>
                  </div>

                  {pattern.imageUrl && (
                    <div style={{ marginTop: "1rem", borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid var(--border)" }}>
                      <img src={pattern.imageUrl} alt={title} style={{ width: "100%", display: "block", maxHeight: "280px", objectFit: "cover" }} />
                    </div>
                  )}
                </div>
              )}

              {/* STEPS TAB */}
              {activeTab === "steps" && (
                <div className="lp-tab-panel">
                  {pattern.steps && pattern.steps.length > 0 ? (
                    <div className="lp-steps-list">
                      {pattern.steps.map((step, i) => (
                        <div key={step.id || i} className={`lp-step-row type-${step.type}`}>
                          <div className="lp-step-num">{i + 1}</div>
                          <div className="lp-step-body">
                            <div className="lp-step-type-label">
                              {step.type === "row" ? "Row" : "Note"}
                            </div>
                            <div className="lp-step-text">{step.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="lp-step-empty">No pattern steps have been added yet.</div>
                  )}
                </div>
              )}

            </div>
          </main>

          {/* ── SIDEBAR ── */}
          <aside className="lp-sidebar">
  
          <Lessons mockCurriculum={MOCK_CURRICULUM} />
        
          </aside>

        </div>
      </div>
    </>
  );
};