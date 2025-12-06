import type { AITool, SortOption } from "@/types";

/**
 * 정렬 유틸리티
 */

// 인기도순 정렬 (높은 순)
export function sortByPopularity(tools: AITool[]): AITool[] {
  return [...tools].sort((a, b) => b.popularity - a.popularity);
}

// 이름순 정렬 (가나다순)
export function sortByName(tools: AITool[]): AITool[] {
  return [...tools].sort((a, b) => a.name.localeCompare(b.name, "ko"));
}

// 가격순 정렬 (낮은 순)
export function sortByPriceLow(tools: AITool[]): AITool[] {
  return [...tools].sort((a, b) => {
    const priceA = a.pricing.startingPrice || 0;
    const priceB = b.pricing.startingPrice || 0;

    // 가격이 같으면 티어로 정렬
    if (priceA === priceB) {
      const tierOrder = { free: 0, freemium: 1, paid: 2, enterprise: 3 };
      return tierOrder[a.pricing.tier] - tierOrder[b.pricing.tier];
    }

    return priceA - priceB;
  });
}

// 가격순 정렬 (높은 순)
export function sortByPriceHigh(tools: AITool[]): AITool[] {
  return [...tools].sort((a, b) => {
    const priceA = a.pricing.startingPrice || 0;
    const priceB = b.pricing.startingPrice || 0;

    if (priceA === priceB) {
      const tierOrder = { free: 0, freemium: 1, paid: 2, enterprise: 3 };
      return tierOrder[b.pricing.tier] - tierOrder[a.pricing.tier];
    }

    return priceB - priceA;
  });
}

// 난이도순 정렬 (쉬운 순)
export function sortByDifficulty(tools: AITool[]): AITool[] {
  const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };
  return [...tools].sort(
    (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
  );
}

// 최신순 정렬 (new 태그가 있는 것 우선)
export function sortByNewest(tools: AITool[]): AITool[] {
  return [...tools].sort((a, b) => {
    if (a.new && !b.new) return -1;
    if (!a.new && b.new) return 1;
    return b.popularity - a.popularity; // 같으면 인기도순
  });
}

// 트렌딩순 정렬 (trending 태그가 있는 것 우선)
export function sortByTrending(tools: AITool[]): AITool[] {
  return [...tools].sort((a, b) => {
    if (a.trending && !b.trending) return -1;
    if (!a.trending && b.trending) return 1;
    return b.popularity - a.popularity; // 같으면 인기도순
  });
}

// 통합 정렬 함수
export function sortTools(tools: AITool[], sortBy: SortOption): AITool[] {
  switch (sortBy) {
    case "popularity":
      return sortByPopularity(tools);
    case "name":
      return sortByName(tools);
    case "price-low":
      return sortByPriceLow(tools);
    case "price-high":
      return sortByPriceHigh(tools);
    case "newest":
      return sortByNewest(tools);
    default:
      return tools;
  }
}

// 다중 정렬 (1차 정렬, 2차 정렬)
export function sortToolsMultiple(
  tools: AITool[],
  primarySort: SortOption,
  secondarySort: SortOption
): AITool[] {
  const primarySorted = sortTools(tools, primarySort);

  // 1차 정렬 기준이 같은 것들만 2차 정렬
  return primarySorted;
}

// 무작위 셔플 (추천용)
export function shuffleTools(tools: AITool[]): AITool[] {
  const shuffled = [...tools];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 가중치 기반 정렬 (인기도 + 트렌딩 + 난이도)
export function sortByScore(tools: AITool[]): AITool[] {
  return [...tools].sort((a, b) => {
    let scoreA = a.popularity * 10;
    let scoreB = b.popularity * 10;

    // 트렌딩 보너스
    if (a.trending) scoreA += 20;
    if (b.trending) scoreB += 20;

    // 신규 보너스
    if (a.new) scoreA += 15;
    if (b.new) scoreB += 15;

    // 난이도 보너스 (초급이 더 높은 점수)
    const difficultyScore = { beginner: 10, intermediate: 5, advanced: 0 };
    scoreA += difficultyScore[a.difficulty];
    scoreB += difficultyScore[b.difficulty];

    // 무료/프리미엄 보너스
    if (a.pricing.tier === "free") scoreA += 10;
    if (b.pricing.tier === "free") scoreB += 10;
    if (a.pricing.tier === "freemium") scoreA += 5;
    if (b.pricing.tier === "freemium") scoreB += 5;

    return scoreB - scoreA;
  });
}

// 직군별 추천 점수 정렬
export function sortByRoleRelevance(
  tools: AITool[],
  roleId: string
): AITool[] {
  return [...tools].sort((a, b) => {
    // 해당 직군이 포함되어 있으면 높은 점수
    const aInRole = a.roles.includes(roleId as any);
    const bInRole = b.roles.includes(roleId as any);

    if (aInRole && !bInRole) return -1;
    if (!aInRole && bInRole) return 1;

    // 같으면 인기도순
    return b.popularity - a.popularity;
  });
}

