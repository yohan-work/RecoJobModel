import type { PricingTier, DifficultyLevel, AITool } from "@/types";

/**
 * 포맷팅 유틸리티
 */

// 가격 티어를 한글로 변환
export function formatPricingTier(tier: PricingTier): string {
  const tierMap: Record<PricingTier, string> = {
    free: "무료",
    freemium: "프리미엄",
    paid: "유료",
    enterprise: "엔터프라이즈",
  };
  return tierMap[tier];
}

// 난이도를 한글로 변환
export function formatDifficulty(difficulty: DifficultyLevel): string {
  const difficultyMap: Record<DifficultyLevel, string> = {
    beginner: "초급",
    intermediate: "중급",
    advanced: "고급",
  };
  return difficultyMap[difficulty];
}

// 난이도를 별 이모지로 변환
export function formatDifficultyStars(difficulty: DifficultyLevel): string {
  const starsMap: Record<DifficultyLevel, string> = {
    beginner: "⭐ 초급",
    intermediate: "⭐⭐ 중급",
    advanced: "⭐⭐⭐ 고급",
  };
  return starsMap[difficulty];
}

// 가격 포맷팅
export function formatPrice(price: number | undefined, currency: string = "USD"): string {
  if (!price) return "문의 필요";
  
  const currencySymbol = currency === "USD" ? "$" : "₩";
  return `${currencySymbol}${price}`;
}

// 월간 가격 포맷팅
export function formatMonthlyPrice(tool: AITool): string {
  if (tool.pricing.tier === "free") return "무료";
  
  if (tool.pricing.startingPrice) {
    return `${formatPrice(tool.pricing.startingPrice)}/월~`;
  }
  
  return formatPricingTier(tool.pricing.tier);
}

// 인기도를 퍼센트로 변환
export function formatPopularityPercent(popularity: number): number {
  return popularity * 10;
}

// 인기도를 설명 텍스트로 변환
export function formatPopularityText(popularity: number): string {
  if (popularity >= 9) return "매우 인기있음";
  if (popularity >= 7) return "인기있음";
  if (popularity >= 5) return "보통";
  if (popularity >= 3) return "신규";
  return "틈새 도구";
}

// 배열을 쉼표로 구분된 문자열로 변환
export function formatList(items: string[], limit?: number): string {
  const itemsToShow = limit ? items.slice(0, limit) : items;
  return itemsToShow.join(", ");
}

// URL에서 도메인만 추출
export function formatDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace("www.", "");
  } catch {
    return url;
  }
}

// 텍스트를 특정 길이로 자르기
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

// 숫자를 K, M 단위로 변환 (예: 1000 -> 1K)
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

// 날짜를 상대적 시간으로 변환 (예: "2일 전")
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "방금 전";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}주 전`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}개월 전`;
  return `${Math.floor(diffInSeconds / 31536000)}년 전`;
}

// 배지 variant 결정
export function getPricingBadgeVariant(tier: PricingTier): "success" | "primary" | "gray" {
  if (tier === "free") return "success";
  if (tier === "freemium") return "primary";
  return "gray";
}

// SEO를 위한 메타 타이틀 생성
export function generateMetaTitle(tool: AITool): string {
  return `${tool.name} - ${tool.tagline} | AI Tools Hub`;
}

// SEO를 위한 메타 디스크립션 생성
export function generateMetaDescription(tool: AITool): string {
  const price = formatMonthlyPrice(tool);
  const difficulty = formatDifficulty(tool.difficulty);
  return `${tool.description} ${price} | ${difficulty} | ${tool.category.slice(0, 3).join(", ")}`;
}

// URL 슬러그 생성
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// 카테고리 ID를 한글 이름으로 변환
export function formatCategoryName(categoryId: string): string {
  const categoryNames: Record<string, string> = {
    design: "디자인",
    development: "개발",
    content: "콘텐츠",
    marketing: "마케팅",
    sales: "영업",
    "project-management": "프로젝트 관리",
    "data-analysis": "데이터 분석",
    research: "리서치",
    presentation: "프레젠테이션",
    video: "비디오",
    audio: "오디오",
  };
  return categoryNames[categoryId] || categoryId;
}

// 직군 ID를 한글 이름으로 변환
export function formatRoleName(roleId: string): string {
  const roleNames: Record<string, string> = {
    designer: "디자이너",
    pm: "PM",
    marketer: "마케터",
    sales: "세일즈",
    developer: "개발자",
    "data-analyst": "데이터 분석가",
    "content-creator": "콘텐츠 크리에이터",
    educator: "교육자",
    startup: "스타트업 창업가",
    researcher: "리서처",
  };
  return roleNames[roleId] || roleId;
}

// 복수형 처리
export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) return `${count} ${singular}`;
  return `${count} ${plural || singular + "s"}`;
}

// 한글 숫자 포맷 (예: 1000 -> 1천)
export function formatKoreanNumber(num: number): string {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}만`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}천`;
  }
  return num.toString();
}

