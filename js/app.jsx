/* =========================================================================
   app.jsx — App 조립, 스크롤스파이, 테마/브랜드 상태, mount
   ========================================================================= */
const { Sidebar, TopBar, NAV, About, Experience, Projects, ProjectModal, Skills, Education, Contact, Icon } = window;

/* 상단 스크롤 진행 바 */
function ScrollProgress() {
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return <div className="scroll-progress" style={{ transform: `scaleX(${pct / 100})` }} aria-hidden="true" />;
}

/* 맨 위로 버튼 — 일정 스크롤 후 노출 */
function BackToTop() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={"to-top" + (show ? " show" : "")}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="맨 위로"
      tabIndex={show ? 0 : -1}
    >
      <Icon.arrowUp />
    </button>
  );
}

/* =====================================================================
   ⬇⬇⬇  여기 한 줄만 바꾸면 전체 색상 무드가 바뀝니다.  ⬇⬇⬇
   사용 가능: 'default' | 'naver' | 'coupang' | 'hanwha' | 'sk' | 'kakao' | 'toss'
   (프리셋 색상은 js/data.jsx 의 BRANDS 에서 정의·추가)
   ===================================================================== */
const ACTIVE_BRAND = "default";

/* 기본 테마(저장값·OS 설정이 모두 없을 때): 'dark' | 'light' */
const DEFAULT_THEME = "light";

/* 초기 테마 결정: 사용자가 고른 값(localStorage) > OS 설정 > 기본값 */
function getInitialTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch (e) { /* localStorage 차단 환경 무시 */ }
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return DEFAULT_THEME;
}

function applyBrand(key) {
  const b = window.BRANDS[key] || window.BRANDS.default;
  const r = document.documentElement;
  r.style.setProperty("--accent", b.accent);
  r.style.setProperty("--accent-contrast", b.contrast);
}

function useScrollSpy(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const handler = () => {
      const probe = window.scrollY + window.innerHeight * 0.32;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) cur = id;
      }
      // 페이지 맨 아래면 마지막 섹션 강제 활성화
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) cur = ids[ids.length - 1];
      setActive(cur);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => { window.removeEventListener("scroll", handler); window.removeEventListener("resize", handler); };
  }, [ids.join(",")]);
  return active;
}

function App() {
  const [theme, setTheme] = React.useState(getInitialTheme);
  const [open, setOpen] = React.useState(false);     // 모바일 사이드바
  const [modal, setModal] = React.useState(null);    // 프로젝트 모달

  const active = useScrollSpy(NAV.map((n) => n.id));

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (e) { /* 저장 차단 환경 무시 */ }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="app">
      <ScrollProgress />
      <Sidebar
        active={active}
        theme={theme} toggleTheme={toggleTheme}
        open={open} setOpen={setOpen}
      />
      <TopBar theme={theme} toggleTheme={toggleTheme} setOpen={setOpen} />
      {open && <div className="scrim" onClick={() => setOpen(false)} />}

      <main className="content">
        <div className="content-inner">
          <About />
          <Experience />
          <Projects onOpen={setModal} />
          <Skills />
          <Education />
          <Contact />
        </div>
      </main>

      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
      <BackToTop />
    </div>
  );
}

/* 초기 브랜드/테마를 즉시 적용 (FOUC 방지) */
document.documentElement.setAttribute("data-theme", getInitialTheme());
applyBrand(ACTIVE_BRAND);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
