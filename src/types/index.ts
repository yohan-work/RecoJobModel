// AI 도구 관련 타입 정의

export type RoleType =
  | "designer"
  | "pm"
  | "marketer"
  | "sales"
  | "developer"
  | "data-analyst"
  | "content-creator"
  | "educator"
  | "startup"
  | "researcher";

export type CategoryType =
  | "design"
  | "development"
  | "content"
  | "marketing"
  | "sales"
  | "project-management"
  | "data-analysis"
  | "research"
  | "presentation"
  | "video"
  | "audio";

export type PricingTier = "free" | "freemium" | "paid" | "enterprise";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface PricingInfo {
  tier: PricingTier;
  free?: string;
  paid?: string;
  startingPrice?: number; // 월 단위 USD
  currency?: string;
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  tagline: string; // 한 줄 설명
  category: CategoryType[];
  roles: RoleType[]; // 추천 직군
  pricing: PricingInfo;
  difficulty: DifficultyLevel;
  
  // 상세 정보
  features: string[]; // 주요 기능
  pros: string[]; // 장점
  cons: string[]; // 단점
  useCases: string[]; // 사용 사례
  
  // 외부 링크
  website: string;
  logo?: string;
  
  // 메타 정보
  popularity: number; // 1-10 점수
  trending?: boolean; // 인기 급상승
  new?: boolean; // 신규 도구
  
  // 관련 도구
  alternatives?: string[]; // 대체 도구 ID들
  integrations?: string[]; // 통합 가능한 도구들
}

export interface Role {
  id: RoleType;
  name: string;
  icon: string;
  description: string;
  essentialTools: string[]; // 필수 도구 3가지 (tool IDs)
  recommendedTools: string[]; // 추천 도구들 (tool IDs)
  toolCount: number;
}

export interface Category {
  id: CategoryType;
  name: string;
  icon: string;
  description: string;
  toolCount: number;
}

export interface UseCase {
  id: string;
  title: string;
  role: RoleType;
  description: string;
  tools: string[]; // 사용된 도구 IDs
  workflow: {
    step: number;
    tool: string;
    duration: string;
    description: string;
  }[];
  results: {
    timeSaved: string;
    improvement: string;
  };
}

export interface Comparison {
  tools: AITool[];
  criteria: {
    name: string;
    scores: { [toolId: string]: number | string };
  }[];
}

// 필터 옵션
export interface FilterOptions {
  roles?: RoleType[];
  categories?: CategoryType[];
  pricing?: PricingTier[];
  difficulty?: DifficultyLevel[];
  searchQuery?: string;
}

// 정렬 옵션
export type SortOption =
  | "popularity"
  | "name"
  | "price-low"
  | "price-high"
  | "newest";

