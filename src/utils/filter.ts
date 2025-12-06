import type {
  AITool,
  RoleType,
  CategoryType,
  PricingTier,
  DifficultyLevel,
  FilterOptions,
} from "@/types";

/**
 * AI 도구 필터링 유틸리티
 */

// 직군별 필터링
export function filterByRoles(tools: AITool[], roles: RoleType[]): AITool[] {
  if (roles.length === 0) return tools;
  return tools.filter((tool) => tool.roles.some((role) => roles.includes(role)));
}

// 카테고리별 필터링
export function filterByCategories(
  tools: AITool[],
  categories: CategoryType[]
): AITool[] {
  if (categories.length === 0) return tools;
  return tools.filter((tool) =>
    tool.category.some((cat) => categories.includes(cat))
  );
}

// 가격별 필터링
export function filterByPricing(
  tools: AITool[],
  pricing: PricingTier[]
): AITool[] {
  if (pricing.length === 0) return tools;
  return tools.filter((tool) => pricing.includes(tool.pricing.tier));
}

// 난이도별 필터링
export function filterByDifficulty(
  tools: AITool[],
  difficulty: DifficultyLevel[]
): AITool[] {
  if (difficulty.length === 0) return tools;
  return tools.filter((tool) => difficulty.includes(tool.difficulty));
}

// 인기도 범위 필터링
export function filterByPopularity(
  tools: AITool[],
  minPopularity: number,
  maxPopularity: number = 10
): AITool[] {
  return tools.filter(
    (tool) => tool.popularity >= minPopularity && tool.popularity <= maxPopularity
  );
}

// 트렌딩 필터링
export function filterTrending(tools: AITool[], trendingOnly: boolean): AITool[] {
  if (!trendingOnly) return tools;
  return tools.filter((tool) => tool.trending === true);
}

// 신규 도구 필터링
export function filterNew(tools: AITool[], newOnly: boolean): AITool[] {
  if (!newOnly) return tools;
  return tools.filter((tool) => tool.new === true);
}

// 무료 도구만 필터링
export function filterFreeOnly(tools: AITool[]): AITool[] {
  return tools.filter(
    (tool) => tool.pricing.tier === "free" || tool.pricing.tier === "freemium"
  );
}

// 가격 범위 필터링
export function filterByPriceRange(
  tools: AITool[],
  minPrice: number,
  maxPrice: number
): AITool[] {
  return tools.filter((tool) => {
    const price = tool.pricing.startingPrice || 0;
    return price >= minPrice && price <= maxPrice;
  });
}

// 통합 필터 함수
export function applyFilters(
  tools: AITool[],
  filters: FilterOptions
): AITool[] {
  let filtered = [...tools];

  if (filters.roles && filters.roles.length > 0) {
    filtered = filterByRoles(filtered, filters.roles);
  }

  if (filters.categories && filters.categories.length > 0) {
    filtered = filterByCategories(filtered, filters.categories);
  }

  if (filters.pricing && filters.pricing.length > 0) {
    filtered = filterByPricing(filtered, filters.pricing);
  }

  if (filters.difficulty && filters.difficulty.length > 0) {
    filtered = filterByDifficulty(filtered, filters.difficulty);
  }

  return filtered;
}

// 필터가 활성화되어 있는지 확인
export function hasActiveFilters(filters: FilterOptions): boolean {
  return (
    (filters.roles && filters.roles.length > 0) ||
    (filters.categories && filters.categories.length > 0) ||
    (filters.pricing && filters.pricing.length > 0) ||
    (filters.difficulty && filters.difficulty.length > 0) ||
    (filters.searchQuery && filters.searchQuery.length > 0)
  );
}

// 필터 개수 세기
export function countActiveFilters(filters: FilterOptions): number {
  let count = 0;
  if (filters.roles && filters.roles.length > 0) count += filters.roles.length;
  if (filters.categories && filters.categories.length > 0)
    count += filters.categories.length;
  if (filters.pricing && filters.pricing.length > 0)
    count += filters.pricing.length;
  if (filters.difficulty && filters.difficulty.length > 0)
    count += filters.difficulty.length;
  if (filters.searchQuery && filters.searchQuery.length > 0) count += 1;
  return count;
}

// 필터 리셋
export function resetFilters(): FilterOptions {
  return {
    roles: [],
    categories: [],
    pricing: [],
    difficulty: [],
    searchQuery: "",
  };
}

