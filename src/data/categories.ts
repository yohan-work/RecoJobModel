import { Role, Category, RoleType, CategoryType } from "@/types";

// 직군 정의
export const roles: Record<RoleType, Role> = {
  designer: {
    id: "designer",
    name: "디자이너",
    icon: "🎨",
    description: "UI/UX 디자인, 그래픽 디자인, 프로토타이핑",
    essentialTools: ["figma", "midjourney", "relume"],
    recommendedTools: [
      "figma",
      "midjourney",
      "relume",
      "v0-dev",
      "framer",
      "uizard",
    ],
    toolCount: 15,
  },
  pm: {
    id: "pm",
    name: "프로덕트 매니저",
    icon: "📱",
    description: "제품 기획, 문서 작성, 프로젝트 관리",
    essentialTools: ["notion-ai", "chatgpt", "gamma"],
    recommendedTools: [
      "notion-ai",
      "chatgpt",
      "gamma",
      "perplexity",
      "asana",
      "clickup",
    ],
    toolCount: 12,
  },
  marketer: {
    id: "marketer",
    name: "마케터",
    icon: "📊",
    description: "콘텐츠 마케팅, 소셜 미디어, SEO",
    essentialTools: ["jasper", "opus-clip", "perplexity"],
    recommendedTools: [
      "jasper",
      "opus-clip",
      "perplexity",
      "chatgpt",
      "copy-ai",
      "hubspot-ai",
    ],
    toolCount: 18,
  },
  sales: {
    id: "sales",
    name: "세일즈",
    icon: "💼",
    description: "영업 자동화, CRM, 리드 생성",
    essentialTools: ["hubspot-ai", "chatgpt", "gong"],
    recommendedTools: [
      "hubspot-ai",
      "apollo-io",
      "gong",
      "chatgpt",
      "salesforce",
      "pipedrive",
    ],
    toolCount: 10,
  },
  developer: {
    id: "developer",
    name: "개발자",
    icon: "💻",
    description: "코딩, 디버깅, 코드 리뷰",
    essentialTools: ["cursor", "chatgpt", "v0-dev"],
    recommendedTools: [
      "cursor",
      "github-copilot",
      "chatgpt",
      "v0-dev",
      "tabnine",
      "codeium",
    ],
    toolCount: 16,
  },
  "data-analyst": {
    id: "data-analyst",
    name: "데이터 분석가",
    icon: "📈",
    description: "데이터 분석, 시각화, 인사이트 도출",
    essentialTools: ["julius-ai", "chatgpt", "tableau"],
    recommendedTools: [
      "julius-ai",
      "tableau",
      "power-bi",
      "chatgpt",
      "datarobot",
      "hex",
    ],
    toolCount: 11,
  },
  "content-creator": {
    id: "content-creator",
    name: "콘텐츠 크리에이터",
    icon: "✍️",
    description: "글쓰기, 비디오 편집, 팟캐스트",
    essentialTools: ["notion-ai", "descript", "opus-clip"],
    recommendedTools: [
      "notion-ai",
      "descript",
      "opus-clip",
      "jasper",
      "runway",
      "riverside",
    ],
    toolCount: 14,
  },
  educator: {
    id: "educator",
    name: "교육자",
    icon: "🎓",
    description: "강의 자료, 프레젠테이션, 평가",
    essentialTools: ["gamma", "chatgpt", "notion-ai"],
    recommendedTools: ["gamma", "beautiful-ai", "chatgpt", "notion-ai", "quizlet"],
    toolCount: 8,
  },
  startup: {
    id: "startup",
    name: "스타트업 창업가",
    icon: "🚀",
    description: "빠른 프로토타이핑, 피칭, 올인원",
    essentialTools: ["chatgpt", "v0-dev", "gamma"],
    recommendedTools: [
      "chatgpt",
      "cursor",
      "v0-dev",
      "gamma",
      "notion-ai",
      "perplexity",
    ],
    toolCount: 20,
  },
  researcher: {
    id: "researcher",
    name: "리서처",
    icon: "🔍",
    description: "학술 연구, 정보 검색, 분석",
    essentialTools: ["perplexity", "elicit", "chatgpt"],
    recommendedTools: [
      "perplexity",
      "elicit",
      "consensus",
      "chatgpt",
      "claude",
      "genspark",
    ],
    toolCount: 9,
  },
};

// 카테고리 정의
export const categories: Record<CategoryType, Category> = {
  design: {
    id: "design",
    name: "디자인",
    icon: "🎨",
    description: "UI/UX 디자인, 이미지 생성, 프로토타이핑",
    toolCount: 12,
  },
  development: {
    id: "development",
    name: "개발",
    icon: "💻",
    description: "코딩, 디버깅, 테스팅",
    toolCount: 8,
  },
  content: {
    id: "content",
    name: "콘텐츠",
    icon: "✍️",
    description: "글쓰기, 블로그, 카피라이팅",
    toolCount: 15,
  },
  marketing: {
    id: "marketing",
    name: "마케팅",
    icon: "📊",
    description: "디지털 마케팅, SEO, 소셜 미디어",
    toolCount: 14,
  },
  sales: {
    id: "sales",
    name: "영업",
    icon: "💼",
    description: "CRM, 영업 자동화, 리드 생성",
    toolCount: 10,
  },
  "project-management": {
    id: "project-management",
    name: "프로젝트 관리",
    icon: "📋",
    description: "작업 관리, 협업, 워크플로우",
    toolCount: 7,
  },
  "data-analysis": {
    id: "data-analysis",
    name: "데이터 분석",
    icon: "📈",
    description: "데이터 시각화, 분석, BI",
    toolCount: 9,
  },
  research: {
    id: "research",
    name: "리서치",
    icon: "🔍",
    description: "정보 검색, 학술 연구, 시장 조사",
    toolCount: 6,
  },
  presentation: {
    id: "presentation",
    name: "프레젠테이션",
    icon: "📊",
    description: "슬라이드, 발표 자료, 피치 덱",
    toolCount: 5,
  },
  video: {
    id: "video",
    name: "비디오",
    icon: "🎬",
    description: "영상 편집, 자막, 숏폼",
    toolCount: 8,
  },
  audio: {
    id: "audio",
    name: "오디오",
    icon: "🎙️",
    description: "팟캐스트, 음성 편집, 음악",
    toolCount: 5,
  },
};

// 헬퍼 함수들
export function getRoleById(id: RoleType): Role {
  return roles[id];
}

export function getCategoryById(id: CategoryType): Category {
  return categories[id];
}

export function getAllRoles(): Role[] {
  return Object.values(roles);
}

export function getAllCategories(): Category[] {
  return Object.values(categories);
}

export function getRolesByIds(ids: RoleType[]): Role[] {
  return ids.map((id) => roles[id]);
}

export function getCategoriesByIds(ids: CategoryType[]): Category[] {
  return ids.map((id) => categories[id]);
}

