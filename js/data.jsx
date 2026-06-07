/* =========================================================================
   data.jsx — 포트폴리오 콘텐츠 + 브랜드 프리셋
   여기 배열에 항목을 추가하면 화면이 자동으로 늘어납니다.
   ========================================================================= */

/* ── 브랜드 색상 프리셋 ───────────────────────────────────────────────
   accent  : 메인 강조색 (이 한 값만으로 strong/soft/faint 자동 파생)
   contrast: accent 위에 올라가는 글자색 (밝은 accent엔 #111, 어두운 accent엔 #fff)
   적용 위치는 app.jsx 의 ACTIVE_BRAND 상수.                              */
const BRANDS = {
  default: { name: "기본",     accent: "#c2410c", contrast: "#ffffff" }, // terracotta
  naver:   { name: "NAVER",    accent: "#03c75a", contrast: "#ffffff" }, // 네이버 그린
  coupang: { name: "Coupang",  accent: "#2e6ff2", contrast: "#ffffff" }, // 쿠팡 블루톤
  hanwha:  { name: "Hanwha",   accent: "#f37321", contrast: "#ffffff" }, // 한화 오렌지
  sk:      { name: "SK",       accent: "#ea002c", contrast: "#ffffff" }, // SK 레드
  kakao:   { name: "Kakao",    accent: "#3b1e1e", contrast: "#ffe000" }, // 카카오 (다크+옐로)
  toss:    { name: "Toss",     accent: "#3182f6", contrast: "#ffffff" }, // 토스 블루
};

/* ── 프로필 ─────────────────────────────────────────────────────────── */
const PROFILE = {
  name: "전광휘",
  nameEn: "Jeon Kwang Hwi",
  title: "네트워크 엔지니어 · AI/DT",
  initial: "전",
  photo: "", // 이미지 경로를 넣으면 원형 아바타에 표시됩니다. 비우면 이니셜.
  email: "nimo6289@naver.com",
  github: "https://github.com/jeonkwanghwi",
  // 히어로
  available: "Open to Network · AI/DT roles",
  headlineHtml: '네트워크 품질을 <span class="hl">데이터</span>로 관리하는 엔지니어', // 임시 — 자유롭게 교체
  lede: "현장의 네트워크 운영을 데이터와 자동화로 연결합니다. 품질관리 플랫폼 개발과 사내 데이터 분석 환경 운영을 맡고 있으며, 네트워크 운영 자동화와 AI/DT, 내부 플랫폼 개발에 관심이 많습니다.",
  stats: [
    { n: "5", suffix: "종", label: "직무 자격증" },
    { n: "3.82", suffix: "/4.5", label: "학점 (전공 4.02)" },
    { n: "8", suffix: "회", label: "수상 · 경진대회" },
  ],
};

/* ── 경력 (타임라인) ─────────────────────────────────────────────────── */
const EXPERIENCE = [
  {
    role: "네트워크 엔지니어 / AI·DT",
    org: "SK Broadband",
    team: "네트워크 품질·DT",
    period: "2025 — 현재",
    bullets: [
      "<b>네트워크 품질관리 플랫폼</b> 기획·개발에 참여 — 분산된 품질 데이터를 통합하고 현장 점검을 디지털 워크플로우로 전환",
      "<b>사내 데이터 분석 환경</b> 운영 — 품질 지표 수집·정제 파이프라인과 대시보드 관리",
      "유관 부서와 <b>데이터 요건 협의</b> 및 지표 정의, 리포트 자동화",
      "신입 TeamProject·A dot TeamProject에서 각각 <b>1등</b> 수상",
    ],
  },
  {
    role: "개발자 양성과정 (최우수 졸업)",
    org: "동국대학교",
    team: "SW 개발자 양성과정",
    period: "2024",
    bullets: [
      "웹/데이터 전반 실무 프로젝트 중심 과정 이수, <b>최우수 졸업</b>",
      "팀 프로젝트로 데이터 기반 서비스 기획부터 배포까지 경험",
      "겨울 종합설계 발표회 <b>장려상</b> (37팀 중 7등)",
    ],
  },
];

/* ── 프로젝트 ───────────────────────────────────────────────────────────
   category: 'company' | 'academic' | 'side'
   motif: thumbnail 도형 키 (network/chain/voice/cards 중)                 */
const PROJECTS = [
  {
    id: "nq",
    category: "company",
    categoryLabel: "사내",
    motif: "network",
    title: "네트워크 품질관리 플랫폼",
    period: "2025",
    oneLiner: "흩어진 네트워크 품질 데이터를 한곳에 모으고, 현장 점검을 디지털 워크플로우로 전환한 사내 플랫폼.",
    stack: ["Python", "SQL", "React", "ETL", "Dashboard"],
    problem: [
      "네트워크 품질 데이터가 여러 시스템과 엑셀에 흩어져 있어 현황 파악과 의사결정에 시간이 오래 걸렸습니다.",
      "현장 점검은 종이·수기 기반이라 결과가 데이터로 축적되지 않고, 부서마다 보는 지표가 달랐습니다.",
    ],
    role: [
      "<b>데이터 통합 파이프라인</b> 설계에 참여하고, 다중 소스의 품질 지표를 표준 스키마로 정규화",
      "<b>현장 점검 워크플로우</b> 화면을 기획·프론트엔드 개발 (점검 항목 폼, 상태 추적)",
      "유관 부서와 <b>데이터 요건을 협의</b>하고 지표 정의를 합의",
    ],
    solution: [
      "여러 소스를 ETL로 수집·정제해 단일 품질 데이터 저장소를 구성",
      "역할별 권한과 상태 기반 점검 워크플로우(요청 → 점검 → 검수)를 구현",
      "핵심 품질 지표를 대시보드로 시각화해 부서 공통 기준으로 통일",
    ],
    result: [
      "점검 결과가 데이터로 축적되며 <b>현황 파악 리드타임이 단축</b>",
      "수기 입력 오류가 줄어 <b>데이터 신뢰도 향상</b>",
      "배운 점: 좋은 플랫폼은 기능보다 <b>도메인 이해와 지표 합의</b>에서 시작된다는 것을 체감",
    ],
  },
  {
    id: "will",
    category: "academic",
    categoryLabel: "학부",
    motif: "chain",
    title: "블록체인 유언장",
    period: "학부",
    oneLiner: "스마트 컨트랙트로 위·변조 없이 유언을 보관하고, 지정한 조건이 충족되면 안전하게 공개·실행하는 서비스.",
    stack: ["Solidity", "Ethereum", "Web3.js", "React"],
    problem: [
      "유언장은 위·변조와 분실 위험이 크고, 공개 시점과 신원 확인을 신뢰할 수 있는 방식으로 보장하기 어렵습니다.",
      "기존 전자 유언 서비스는 중앙 서버에 의존해 운영 주체를 신뢰해야 하고, 서버 장애·해킹 시 내용이 훼손될 수 있습니다.",
    ],
    role: [
      "스마트 컨트랙트 설계·작성과 프론트엔드 지갑 연동(Web3.js)을 담당",
    ],
    solution: [
      "유언 내용을 암호화해 온체인/오프체인에 분리 저장하고, 컨트랙트로 무결성을 검증",
      "지정 조건 충족 시에만 열람·실행되도록 접근 제어 로직 구성",
      "가스 비용을 줄이기 위해 본문은 오프체인(IPFS)에 저장하고 해시만 온체인에 기록, 지갑 서명으로 작성자 신원을 검증",
    ],
    result: [
      "테스트넷에 배포해 <b>작성 → 보관 → 조건부 공개</b> 흐름을 데모로 검증",
      "배운 점: 온체인 비용·프라이버시 제약 때문에 <b>무엇을 체인에 올릴지</b> 설계가 핵심이라는 것을 체감",
    ],
  },
  {
    id: "memoir",
    category: "academic",
    categoryLabel: "학부",
    motif: "voice",
    title: "AI 구술 자서전",
    period: "학부",
    oneLiner: "대화형 AI가 어르신의 이야기를 인터뷰하듯 끌어내고, 구술을 자서전 텍스트로 엮어 주는 서비스.",
    stack: ["Python", "LLM", "STT/TTS", "Prompt"],
    problem: [
      "어르신이 자신의 삶을 글로 정리하기는 어렵고, 구술 인터뷰는 인력과 시간이 많이 듭니다.",
      "단순 녹음·받아쓰기만으로는 이야기가 파편적으로 남아, 한 편의 글로 정리하려면 또 많은 편집 노동이 필요합니다.",
    ],
    role: [
      "인터뷰 프롬프트 설계와 음성 파이프라인(STT/TTS) 연동을 담당",
    ],
    solution: [
      "음성 인식(STT)으로 구술을 텍스트화하고, LLM이 후속 질문을 생성해 자연스러운 인터뷰 흐름을 유도",
      "수집된 답변을 챕터 구조의 자서전 초고로 재구성",
      "주제별(유년기·가족·일) 질문 트리를 설계해 대화가 끊기지 않게 하고, 생성된 초고를 사람이 다듬는 검수 단계를 둠",
    ],
    result: [
      "재가노인 심리치료 프로젝트(Enactus)·AI 융합 주제와 맞닿은 경험",
      "배운 점: LLM 결과물은 <b>질문 설계</b>가 품질의 8할을 좌우한다는 것을 체감",
    ],
  },
  {
    id: "vocab",
    category: "side",
    categoryLabel: "사이드",
    motif: "cards",
    title: "영어 단어 암기 웹앱",
    period: "사이드",
    oneLiner: "TTS 발음과 자동 채점으로 영어 단어를 외우는 웹앱. 듣고 → 입력하고 → 즉시 채점되는 학습 루프.",
    stack: ["JavaScript", "Web Speech API", "React", "LocalState"],
    problem: [
      "단어 암기는 발음을 직접 듣고 직접 써 봐야 오래 남는데, 단순 카드 앱은 수동적 보기만 반복하게 됩니다.",
    ],
    role: [
      "기획·디자인·구현 전부를 혼자 진행한 개인 프로젝트",
    ],
    solution: [
      "Web Speech API(TTS)로 단어 발음을 재생하고, 사용자가 받아 적도록 유도",
      "<b>채점 로직</b>: 입력값을 정규화(공백·대소문자·문장부호 제거)한 뒤 정답과 비교, 오타 허용을 위한 유사도 판정 적용",
      "오답 단어를 우선 재출제하는 간단한 복습 큐 구성",
    ],
    result: [
      "듣기·쓰기·즉시 피드백을 한 화면에 묶어 학습 몰입도를 높임",
      "배운 점: 작은 학습 루프라도 <b>피드백 지연을 줄이는 것</b>이 체감 효과를 크게 바꾼다는 것",
    ],
  },
];

const PROJECT_FILTERS = [
  { key: "all", label: "전체" },
  { key: "company", label: "사내" },
  { key: "academic", label: "학부" },
  { key: "side", label: "사이드" },
];

/* ── 스킬 ───────────────────────────────────────────────────────────────
   level: 'use'(실무 사용) | 'proj'(프로젝트 경험) | 'learn'(학습 중)        */
const SKILLS = [
  {
    group: "Network / Infra",
    icon: "network",
    items: [
      { nm: "네트워크 설계·운영", level: "use" },
      { nm: "품질 모니터링 / 지표 관리", level: "use" },
      { nm: "라우팅 · 스위칭", level: "proj" },
      { nm: "네트워크관리사 2급", level: "use" },
    ],
  },
  {
    group: "Data / AI",
    icon: "data",
    items: [
      { nm: "SQL · 데이터 모델링", level: "use" },
      { nm: "Python 데이터 분석 (ETL)", level: "use" },
      { nm: "머신러닝 / 데이터 분석", level: "proj" },
      { nm: "LLM · 프롬프트 엔지니어링", level: "learn" },
    ],
  },
  {
    group: "Web / Dev",
    icon: "code",
    items: [
      { nm: "JavaScript", level: "proj" },
      { nm: "React", level: "proj" },
      { nm: "HTML · CSS", level: "use" },
      { nm: "Solidity (스마트 컨트랙트)", level: "proj" },
    ],
  },
  {
    group: "Tools",
    icon: "tool",
    items: [
      { nm: "Git · GitHub", level: "use" },
      { nm: "Microsoft Azure", level: "proj" },
      { nm: "협업 · 이슈 트래킹", level: "use" },
      { nm: "Figma", level: "learn" },
    ],
  },
];

/* ── 학력 / 자격증 / 수상 ─────────────────────────────────────────────── */
const EDUCATION = {
  school: "동국대학교",
  major: "컴퓨터공학 (Computer Science Engineering)",
  period: "2025년 졸업",
  gpa: [
    { n: "3.82", l: "전체 / 4.5" },
    { n: "4.02", l: "전공 / 4.5" },
  ],
};

const CERTS = [
  "정보처리기사",
  "SQLD",
  "Microsoft Azure Fundamentals",
  "ISTQB CTFL",
  "네트워크관리사 2급",
];

const AWARDS = [
  { yr: "2025", items: [
    { t: "SK Broadband 신입 TeamProject 1등", win: true, pill: "1등" },
    { t: "SK Broadband A dot TeamProject 1등", win: true, pill: "1등" },
  ]},
  { yr: "2024", items: [
    { t: "동국대학교 개발자 양성과정 최우수 졸업", win: true },
    { t: "겨울 종합설계 발표회 장려상 (37팀 중 7등)", win: true, pill: "장려" },
    { t: "1·2학기 학기 우등생" },
  ]},
  { yr: "2023", items: [
    { t: "공과대학 Speech 경진대회 AI융합대학장상", win: true, pill: "1등" },
    { t: "2학기 학기 우등생" },
  ]},
  { yr: "2022", items: [
    { t: "Farm SW프로젝트 경진대회 최우수상", win: true, pill: "1등" },
  ]},
  { yr: "2021", items: [
    { t: "공과대학 어드벤처디자인 경진대회 우수상", win: true, pill: "우수" },
    { t: "2학기 학기 우등생" },
  ]},
];

const ACTIVITIES = [
  "2024 · 소셜벤처 창업동아리 Enactus 32기 (재가노인 심리치료 프로젝트)",
  "2023 · 스마트 해상물류 경진대회 2차 본선 진출",
  "2022 · 교내 청각장애인 학습 도우미",
  "2022 · 베트남 온라인 해외봉사",
];

/* 전역 공유 */
Object.assign(window, {
  BRANDS, PROFILE, EXPERIENCE, PROJECTS, PROJECT_FILTERS,
  SKILLS, EDUCATION, CERTS, AWARDS, ACTIVITIES,
});
