/* =========================================================================
   app.jsx — App 조립, 스크롤스파이, 테마/브랜드 상태, mount
   ========================================================================= */
const { Sidebar, TopBar, NAV, About, Experience, Projects, ProjectModal, Skills, Education, Contact } = window;

/* =====================================================================
   ⬇⬇⬇  여기 한 줄만 바꾸면 전체 색상 무드가 바뀝니다.  ⬇⬇⬇
   사용 가능: 'default' | 'naver' | 'coupang' | 'hanwha' | 'sk' | 'kakao' | 'toss'
   (프리셋 색상은 js/data.jsx 의 BRANDS 에서 정의·추가)
   화면 좌측 하단 스위처로도 미리보기할 수 있습니다.
   ===================================================================== */
const ACTIVE_BRAND = "default";

/* 기본 테마: 'dark' | 'light' */
const DEFAULT_THEME = "light";

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
  const [theme, setTheme] = React.useState(DEFAULT_THEME);
  const [brand, setBrand] = React.useState(ACTIVE_BRAND);
  const [open, setOpen] = React.useState(false);     // 모바일 사이드바
  const [modal, setModal] = React.useState(null);    // 프로젝트 모달

  const active = useScrollSpy(NAV.map((n) => n.id));

  React.useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);
  React.useEffect(() => { applyBrand(brand); }, [brand]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="app">
      <Sidebar
        active={active}
        theme={theme} toggleTheme={toggleTheme}
        brand={brand} setBrand={setBrand}
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
    </div>
  );
}

/* 초기 브랜드/테마를 즉시 적용 (FOUC 방지) */
document.documentElement.setAttribute("data-theme", DEFAULT_THEME);
applyBrand(ACTIVE_BRAND);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
