/* =========================================================================
   icons.jsx — 공용 SVG 아이콘 + 프로젝트 썸네일 모티프(추상 라인아트 placeholder)
   ========================================================================= */
const Icon = {
  github: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.53.1.72-.23.72-.5v-1.78c-2.92.63-3.54-1.4-3.54-1.4-.48-1.21-1.17-1.54-1.17-1.54-.96-.65.07-.64.07-.64 1.06.08 1.62 1.09 1.62 1.09.94 1.61 2.47 1.15 3.07.88.1-.68.37-1.15.67-1.41-2.33-.27-4.78-1.17-4.78-5.18 0-1.15.41-2.08 1.08-2.81-.11-.27-.47-1.34.1-2.79 0 0 .88-.28 2.88 1.07a9.98 9.98 0 0 1 5.24 0c2-1.35 2.88-1.07 2.88-1.07.57 1.45.21 2.52.1 2.79.68.73 1.08 1.66 1.08 2.81 0 4.02-2.45 4.9-4.79 5.16.38.33.71.97.71 1.96v2.9c0 .28.19.61.73.5A10.5 10.5 0 0 0 12 1.5Z"/>
    </svg>
  ),
  mail: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>
    </svg>
  ),
  sun: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
      <circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"/>
    </svg>
  ),
  moon: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 13.2A8.4 8.4 0 0 1 10.8 3 7.2 7.2 0 1 0 21 13.2Z"/>
    </svg>
  ),
  menu: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
      <path d="M4 7h16M4 12h16M4 17h16"/>
    </svg>
  ),
  close: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
      <path d="m6 6 12 12M18 6 6 18"/>
    </svg>
  ),
  arrow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  ),
  network: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="5" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/>
      <path d="M12 7v4m0 0-5 5m5-5 5 5M12 11h0"/>
    </svg>
  ),
  data: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.6"/><path d="M5 5.5v13c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-13M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6"/>
    </svg>
  ),
  code: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14"/>
    </svg>
  ),
  tool: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14.5 6a3.5 3.5 0 0 0-4.9 4.3l-5.3 5.3a1.8 1.8 0 0 0 2.5 2.5l5.3-5.3A3.5 3.5 0 0 0 18 8.3l-2.2 2.2-2-2L16 6.3A3.5 3.5 0 0 0 14.5 6Z"/>
    </svg>
  ),
};

/* 프로젝트 썸네일 모티프 — 추상 라인아트(placeholder) */
const Motif = {
  network: (p) => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="motif" {...p}>
      <circle cx="50" cy="22" r="7"/><circle cx="22" cy="70" r="7"/><circle cx="78" cy="70" r="7"/><circle cx="50" cy="50" r="5"/>
      <path d="M50 29v16M46 53 26 65M54 53l20 12M22 63V63M50 45 50 45"/>
      <path d="M50 29 24 64M50 29l26 35" opacity=".4"/>
    </svg>
  ),
  chain: (p) => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" className="motif" {...p}>
      <rect x="14" y="40" width="20" height="20" rx="3"/>
      <rect x="40" y="40" width="20" height="20" rx="3"/>
      <rect x="66" y="40" width="20" height="20" rx="3"/>
      <path d="M34 50h6M60 50h6" strokeLinecap="round"/>
      <path d="M19 40v-8h10M81 60v8H71" strokeLinecap="round" opacity=".5"/>
    </svg>
  ),
  voice: (p) => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="motif" {...p}>
      <path d="M22 30h40a8 8 0 0 1 8 8v18a8 8 0 0 1-8 8H40l-12 10V64h-6a8 8 0 0 1-8-8V38a8 8 0 0 1 8-8Z" opacity=".5"/>
      <path d="M30 47v6M38 43v14M46 39v22M54 44v12M62 47v6"/>
    </svg>
  ),
  cards: (p) => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" className="motif" {...p}>
      <rect x="26" y="26" width="44" height="30" rx="4" opacity=".4"/>
      <rect x="32" y="38" width="44" height="30" rx="4"/>
      <path d="M40 50h22M40 58h14" strokeLinecap="round"/>
      <path d="M64 30c4 0 7 2 7 5M64 24c7 0 12 4 12 10" strokeLinecap="round"/>
    </svg>
  ),
};

Object.assign(window, { Icon, Motif });
