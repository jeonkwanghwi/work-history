/* =========================================================================
   sidebar.jsx — 사이드바, 네비(스크롤스파이), 테마토글, 브랜드 스위처
   모바일에서는 탑바 + 슬라이드 사이드바
   ========================================================================= */
const { Icon, Motif } = window;

const NAV = [
  { id: "about",      label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects",   label: "Projects" },
  { id: "skills",     label: "Skills" },
  { id: "education",  label: "Education & Awards" },
  { id: "contact",    label: "Contact" },
];

function Avatar() {
  return (
    <div className="avatar" aria-hidden="true">
      {PROFILE.photo
        ? <img src={PROFILE.photo} alt={PROFILE.name} />
        : <span>{PROFILE.initial}</span>}
    </div>
  );
}

function BrandSwitcher({ brand, setBrand }) {
  return (
    <div className="brand-box">
      <div className="brand-label">
        <span>Brand</span>
        <span className="cur">{BRANDS[brand].name}</span>
      </div>
      <div className="swatches">
        {Object.keys(BRANDS).map((k) => (
          <button
            key={k}
            className={"swatch" + (k === brand ? " on" : "")}
            style={{ background: BRANDS[k].accent }}
            onClick={() => setBrand(k)}
            title={BRANDS[k].name}
            aria-label={BRANDS[k].name + " 색상"}
          />
        ))}
      </div>
    </div>
  );
}

function Sidebar({ active, theme, toggleTheme, brand, setBrand, open, setOpen }) {
  const go = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };
  return (
    <aside className={"sidebar" + (open ? " open" : "")}>
      <div className="profile">
        <Avatar />
        <div>
          <h1 className="p-name">
            {PROFILE.name}
            <span className="en">{PROFILE.nameEn}</span>
          </h1>
          <p className="p-title"><span className="dot" />{PROFILE.title}</p>
        </div>
      </div>

      <nav className="nav">
        {NAV.map((n, i) => (
          <a
            key={n.id}
            href={"#" + n.id}
            className={active === n.id ? "active" : ""}
            onClick={(e) => go(e, n.id)}
          >
            <span className="idx">{String(i + 1).padStart(2, "0")}</span>
            {n.label}
          </a>
        ))}
      </nav>

      <div className="side-foot">
        <BrandSwitcher brand={brand} setBrand={setBrand} />
        <div className="foot-row">
          <div className="socials">
            <a className="icon-btn" href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon.github /></a>
            <a className="icon-btn" href={"mailto:" + PROFILE.email} aria-label="Email"><Icon.mail /></a>
          </div>
          <button className="icon-btn theme-toggle" onClick={toggleTheme} aria-label="테마 전환">
            {theme === "dark" ? <Icon.sun /> : <Icon.moon />}
          </button>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ theme, toggleTheme, setOpen }) {
  return (
    <div className="topbar">
      <div className="tb-name"><span className="dot" />{PROFILE.name}</div>
      <div className="topbar-actions">
        <button className="icon-btn" onClick={toggleTheme} aria-label="테마 전환">
          {theme === "dark" ? <Icon.sun /> : <Icon.moon />}
        </button>
        <button className="icon-btn" onClick={() => setOpen(true)} aria-label="메뉴 열기"><Icon.menu /></button>
      </div>
    </div>
  );
}

Object.assign(window, { Sidebar, TopBar, NAV });
