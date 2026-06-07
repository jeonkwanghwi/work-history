/* =========================================================================
   sections.jsx — 각 섹션 컴포넌트 + 프로젝트 모달
   ========================================================================= */
const { Icon: I, Motif: M } = window;

/* 스크롤 등장 래퍼 — IntersectionObserver로 뷰포트 진입을 감지해 .is-in을 부여.
   모든 최신 브라우저에서 동작하고, delay(ms)로 순차 등장을 만든다. */
function Reveal({ children, tag = "div", className = "", style, delay = 0 }) {
  const Tag = tag;
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={"reveal " + (shown ? "is-in " : "") + className}
      style={{ ...style, transitionDelay: delay ? delay + "ms" : undefined }}
    >
      {children}
    </Tag>
  );
}

function SectionHead({ kicker, title, sub }) {
  return (
    <Reveal>
      <p className="kicker">{kicker}</p>
      <h2 className="sec-title">{title}</h2>
      {sub && <p className="sec-sub">{sub}</p>}
    </Reveal>
  );
}

/* 숫자 카운트업 — 화면에 들어오면 0 → 목표값. 소수점 자리수는 원본 문자열 기준. */
function CountUp({ value }) {
  const decimals = (String(value).split(".")[1] || "").length;
  const target = parseFloat(value);
  const ref = React.useRef(null);
  const [display, setDisplay] = React.useState(isNaN(target) ? value : (0).toFixed(decimals));
  React.useEffect(() => {
    if (isNaN(target)) return;
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setDisplay(target.toFixed(decimals)); return; }
    let raf, start;
    const duration = 1100;
    const tick = (t) => {
      if (start === undefined) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);   // easeOutCubic
      setDisplay((target * eased).toFixed(decimals));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { raf = requestAnimationFrame(tick); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref}>{display}</span>;
}

/* ── About / Hero ─────────────────────────────────────────────────────── */
function About() {
  return (
    <section className="block hero" id="about">
      <Reveal>
        <p className="avail"><span className="dot" />{PROFILE.available}</p>
      </Reveal>
      <Reveal delay={80}>
        <h1 dangerouslySetInnerHTML={{ __html: PROFILE.headlineHtml }} />
      </Reveal>
      <Reveal delay={160}>
        <p className="lede">{PROFILE.lede}</p>
      </Reveal>
      <Reveal delay={240}>
        <div className="cta">
          <a className="btn btn-primary" href={"mailto:" + PROFILE.email}><I.mail />이메일 보내기</a>
          <a className="btn btn-ghost" href={PROFILE.github} target="_blank" rel="noreferrer"><I.github />GitHub</a>
        </div>
      </Reveal>
      <Reveal delay={300}>
        <div className="hero-stats">
          {PROFILE.stats.map((s, i) => (
            <div className="st" key={i}>
              <div className="n"><CountUp value={s.n} /><span>{s.suffix}</span></div>
              <div className="l">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ── Experience ───────────────────────────────────────────────────────── */
function Experience() {
  return (
    <section className="block" id="experience">
      <SectionHead kicker="Experience" title="경력" sub="네트워크 운영과 데이터·AI를 연결해 온 과정입니다." />
      <div className="timeline">
        {EXPERIENCE.map((e, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="tl-item">
              <div className="tl-period">{e.period}</div>
              <h3 className="tl-role">{e.role}</h3>
              <div className="tl-org">
                <b style={{ color: "var(--ink)" }}>{e.org}</b>
                <span className="sep">·</span>
                <span>{e.team}</span>
              </div>
              <ul className="tl-bullets">
                {e.bullets.map((b, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: b }} />
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Projects ─────────────────────────────────────────────────────────── */
function ProjectCard({ p, idx, onOpen }) {
  const Mt = M[p.motif] || M.network;
  const ref = React.useRef(null);
  const open = () => onOpen(p);
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
  };
  const onMove = (e) => {                     // 커서 위치 → 미세 기울기 (CSS가 적용 여부 판단)
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", (px * 4).toFixed(2) + "deg");
    el.style.setProperty("--rx", (py * -4).toFixed(2) + "deg");
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return (
    <div
      ref={ref}
      className="card"
      role="button"
      tabIndex={0}
      aria-label={p.title + " 자세히 보기"}
      onClick={open}
      onKeyDown={onKey}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="card-thumb">
        <span className="pin">{p.categoryLabel}</span>
        <Mt />
        <span className="num">{String(idx + 1).padStart(2, "0")}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{p.title}</h3>
        <p className="card-desc">{p.oneLiner}</p>
        <div className="badges">
          {p.stack.slice(0, 4).map((s, i) => <span className="badge" key={i}>{s}</span>)}
        </div>
        <span className="card-more">자세히 보기 <I.arrow /></span>
      </div>
    </div>
  );
}

function Projects({ onOpen }) {
  const [filter, setFilter] = React.useState("all");
  const list = PROJECTS.filter((p) => filter === "all" || p.category === filter);
  return (
    <section className="block" id="projects">
      <SectionHead kicker="Projects" title="프로젝트"
        sub="문제 정의 → 내 역할 → 기술적 해결 → 결과까지, 카드를 누르면 자세히 볼 수 있습니다." />
      <Reveal>
        <div className="filters">
          {PROJECT_FILTERS.map((f) => (
            <button key={f.key}
              className={"filter" + (filter === f.key ? " on" : "")}
              onClick={() => setFilter(f.key)}>
              {f.label}
              <span style={{ opacity: .55, marginLeft: 6 }}>
                {f.key === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === f.key).length}
              </span>
            </button>
          ))}
        </div>
      </Reveal>
      <div className="proj-grid">
        {list.map((p) => (
          <Reveal key={p.id} delay={0}>
            <ProjectCard p={p} idx={PROJECTS.indexOf(p)} onOpen={onOpen} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Project Modal ────────────────────────────────────────────────────── */
function ModalBlock({ n, title, items }) {
  return (
    <div className="mblock">
      <h3><span className="n">{n}</span>{title}</h3>
      <ul>
        {items.map((it, i) => <li key={i} dangerouslySetInnerHTML={{ __html: it }} />)}
      </ul>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const modalRef = React.useRef(null);
  React.useEffect(() => {
    const prevFocus = document.activeElement;          // 모달 열기 전 포커스 기억
    const modal = modalRef.current;
    const closeBtn = modal && modal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();                    // 초기 포커스를 닫기 버튼으로

    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "Tab" && modal) {                  // Tab을 모달 안에 가둔다
        const list = Array.from(modal.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])'));
        if (!list.length) return;
        const first = list[0], last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (prevFocus && prevFocus.focus) prevFocus.focus();   // 닫을 때 원래 카드로 복귀
    };
  }, [onClose]);

  if (!project) return null;
  const p = project;
  const Mt = M[p.motif] || M.network;
  const idx = PROJECTS.indexOf(p);
  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal" ref={modalRef} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={p.title}>
        <button className="modal-close" onClick={onClose} aria-label="닫기"><I.close /></button>
        <div className="modal-hd">
          <div className="modal-banner">
            <Mt />
            <span className="num">{String(idx + 1).padStart(2, "0")}</span>
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-pin">
            <span className="pin">{p.categoryLabel}</span>
            <span className="per">{p.period}</span>
          </div>
          <h2>{p.title}</h2>
          <p className="lede">{p.oneLiner}</p>
          <div className="badges">
            {p.stack.map((s, i) => <span className="badge" key={i}>{s}</span>)}
          </div>
          <ModalBlock n="01" title="문제 정의" items={p.problem} />
          <ModalBlock n="02" title="내 역할" items={p.role} />
          <ModalBlock n="03" title="기술적 해결" items={p.solution} />
          <ModalBlock n="04" title="결과 & 배운 점" items={p.result} />
        </div>
      </div>
    </div>
  );
}

/* ── Skills ───────────────────────────────────────────────────────────── */
const LEVEL = { use: "실무 사용", proj: "프로젝트 경험", learn: "학습 중" };
function Skills() {
  return (
    <section className="block" id="skills">
      <SectionHead kicker="Skills" title="기술 스택"
        sub="각 기술이 어떤 맥락에서 쓰였는지 라벨로 표시했습니다." />
      <div className="skill-groups">
        {SKILLS.map((g, i) => {
          const Gi = I[g.icon] || I.code;
          return (
            <Reveal key={i} delay={(i % 2) * 80}>
              <div className="skill-card">
                <h3><span className="ico"><Gi /></span>{g.group}</h3>
                <div className="skill-list">
                  {g.items.map((s, j) => (
                    <div className="skill-row" key={j}>
                      <span className="nm">{s.nm}</span>
                      <span className={"tag " + s.level}>{LEVEL[s.level]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal>
        <div className="skill-legend">
          <span><i style={{ background: "var(--accent)" }} />실무 사용</span>
          <span><i style={{ background: "var(--accent-soft)" }} />프로젝트 경험</span>
          <span><i style={{ border: "1px dashed var(--ink-3)" }} />학습 중</span>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Education & Awards ───────────────────────────────────────────────── */
function Education() {
  return (
    <section className="block" id="education">
      <SectionHead kicker="Education & Awards" title="학력 · 수상"
        sub="직무와 맞닿은 자격증과 경진대회 수상 위주로 정리했습니다." />
      <div className="edu-grid">
        <Reveal>
          <div>
            <div className="panel">
              <h3>학력</h3>
              <p className="edu-school">{EDUCATION.school}</p>
              <p className="edu-meta">{EDUCATION.major} · {EDUCATION.period}</p>
              <div className="edu-gpa">
                {EDUCATION.gpa.map((g, i) => (
                  <div className="g" key={i}><div className="n">{g.n}</div><div className="l">{g.l}</div></div>
                ))}
              </div>
            </div>
            <div className="panel">
              <h3>자격증</h3>
              <div className="cert-list">
                {CERTS.map((c, i) => <span className="cert" key={i}>{c}</span>)}
              </div>
            </div>
            <div className="panel">
              <h3>활동</h3>
              <ul className="misc-list">
                {ACTIVITIES.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="panel">
            <h3>수상 내역</h3>
            <ul className="award-list">
              {AWARDS.map((a, i) => (
                <li className="award-yr" key={i}>
                  <span className="yr">{a.yr}</span>
                  <ul>
                    {a.items.map((it, j) => (
                      <li key={j} className={it.win ? "win" : ""}>
                        {it.t}{it.pill && <span className="pill">{it.pill}</span>}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────────────────────────── */
function Contact() {
  return (
    <section className="block contact" id="contact">
      <SectionHead kicker="Contact" title="함께 일해요" />
      <Reveal>
        <p className="contact-big">
          네트워크와 데이터, 그 사이를 잇는 일에 관심이 있다면 <a href={"mailto:" + PROFILE.email}>언제든 연락</a> 주세요.
        </p>
      </Reveal>
      <Reveal delay={100}>
        <div className="contact-row">
          <a className="contact-card" href={"mailto:" + PROFILE.email}>
            <span className="ci"><I.mail /></span>
            <span className="ct"><span className="k">Email</span><span className="v">{PROFILE.email}</span></span>
          </a>
          <a className="contact-card" href={PROFILE.github} target="_blank" rel="noreferrer">
            <span className="ci"><I.github /></span>
            <span className="ct"><span className="k">GitHub</span><span className="v">{PROFILE.github.replace("https://", "")}</span></span>
          </a>
        </div>
      </Reveal>
      <div className="foot">
        <span>© {new Date().getFullYear()} {PROFILE.name} ({PROFILE.nameEn})</span>
        <span className="mono">Network Engineer · AI/DT</span>
      </div>
    </section>
  );
}

Object.assign(window, { About, Experience, Projects, ProjectModal, Skills, Education, Contact });
