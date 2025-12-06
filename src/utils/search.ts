import type { AITool } from "@/types";

/**
 * 검색 유틸리티
 */

// 기본 텍스트 검색 (대소문자 구분 없음)
export function searchTools(tools: AITool[], query: string): AITool[] {
  if (!query || query.trim() === "") return tools;

  const lowerQuery = query.toLowerCase().trim();

  return tools.filter((tool) => {
    // 이름에서 검색
    if (tool.name.toLowerCase().includes(lowerQuery)) return true;

    // 태그라인에서 검색
    if (tool.tagline.toLowerCase().includes(lowerQuery)) return true;

    // 설명에서 검색
    if (tool.description.toLowerCase().includes(lowerQuery)) return true;

    // 기능에서 검색
    if (tool.features.some((f) => f.toLowerCase().includes(lowerQuery)))
      return true;

    // 사용 사례에서 검색
    if (tool.useCases.some((uc) => uc.toLowerCase().includes(lowerQuery)))
      return true;

    return false;
  });
}

// 정확한 이름 매칭
export function searchByExactName(tools: AITool[], name: string): AITool | undefined {
  return tools.find((tool) => tool.name.toLowerCase() === name.toLowerCase());
}

// 여러 키워드로 검색 (AND 조건)
export function searchByKeywords(tools: AITool[], keywords: string[]): AITool[] {
  if (keywords.length === 0) return tools;

  return tools.filter((tool) => {
    const searchText = `${tool.name} ${tool.tagline} ${tool.description} ${tool.features.join(
      " "
    )} ${tool.useCases.join(" ")}`.toLowerCase();

    return keywords.every((keyword) =>
      searchText.includes(keyword.toLowerCase())
    );
  });
}

// 태그 검색
export function searchByTags(
  tools: AITool[],
  tags: string[]
): AITool[] {
  if (tags.length === 0) return tools;

  return tools.filter((tool) => {
    const toolTags = [
      ...tool.category,
      ...tool.roles,
      tool.pricing.tier,
      tool.difficulty,
    ];
    return tags.some((tag) =>
      toolTags.some((toolTag) =>
        toolTag.toLowerCase().includes(tag.toLowerCase())
      )
    );
  });
}

// 기능으로 검색
export function searchByFeature(tools: AITool[], feature: string): AITool[] {
  const lowerFeature = feature.toLowerCase();
  return tools.filter((tool) =>
    tool.features.some((f) => f.toLowerCase().includes(lowerFeature))
  );
}

// 사용 사례로 검색
export function searchByUseCase(tools: AITool[], useCase: string): AITool[] {
  const lowerUseCase = useCase.toLowerCase();
  return tools.filter((tool) =>
    tool.useCases.some((uc) => uc.toLowerCase().includes(lowerUseCase))
  );
}

// 고급 검색 (가중치 기반 점수)
export function advancedSearch(
  tools: AITool[],
  query: string
): { tool: AITool; score: number }[] {
  if (!query || query.trim() === "") {
    return tools.map((tool) => ({ tool, score: 0 }));
  }

  const lowerQuery = query.toLowerCase().trim();

  const results = tools.map((tool) => {
    let score = 0;

    // 이름 매칭 (가중치 10)
    if (tool.name.toLowerCase() === lowerQuery) {
      score += 100;
    } else if (tool.name.toLowerCase().includes(lowerQuery)) {
      score += 50;
    }

    // 태그라인 매칭 (가중치 5)
    if (tool.tagline.toLowerCase().includes(lowerQuery)) {
      score += 25;
    }

    // 설명 매칭 (가중치 3)
    if (tool.description.toLowerCase().includes(lowerQuery)) {
      score += 15;
    }

    // 기능 매칭 (가중치 2)
    const featureMatches = tool.features.filter((f) =>
      f.toLowerCase().includes(lowerQuery)
    ).length;
    score += featureMatches * 10;

    // 사용 사례 매칭 (가중치 2)
    const useCaseMatches = tool.useCases.filter((uc) =>
      uc.toLowerCase().includes(lowerQuery)
    ).length;
    score += useCaseMatches * 10;

    // 인기도 보너스
    score += tool.popularity;

    // 트렌딩 보너스
    if (tool.trending) score += 5;

    return { tool, score };
  });

  // 점수가 0보다 큰 것만 반환하고 점수순 정렬
  return results.filter((r) => r.score > 0).sort((a, b) => b.score - a.score);
}

// 검색 결과 하이라이트
export function highlightSearchTerm(text: string, searchTerm: string): string {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

// 추천 검색어 생성
export function generateSearchSuggestions(
  tools: AITool[],
  query: string,
  limit: number = 5
): string[] {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();
  const suggestions = new Set<string>();

  // 도구 이름에서 제안
  tools.forEach((tool) => {
    if (tool.name.toLowerCase().includes(lowerQuery)) {
      suggestions.add(tool.name);
    }
  });

  // 카테고리에서 제안
  tools.forEach((tool) => {
    tool.category.forEach((cat) => {
      if (cat.toLowerCase().includes(lowerQuery)) {
        suggestions.add(cat);
      }
    });
  });

  return Array.from(suggestions).slice(0, limit);
}

