"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { aiTools } from "@/data/ai-tools";
import { getAllRoles, getAllCategories } from "@/data/categories";
import type { RoleType, CategoryType, PricingTier, DifficultyLevel } from "@/types";

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<RoleType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<PricingTier[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel[]>([]);
  const [sortBy, setSortBy] = useState<"popularity" | "name" | "price">("popularity");

  const roles = getAllRoles();
  const categories = getAllCategories();

  // 필터링 및 정렬
  const filteredTools = useMemo(() => {
    let filtered = [...aiTools];

    // 검색
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.tagline.toLowerCase().includes(query)
      );
    }

    // 직군 필터
    if (selectedRoles.length > 0) {
      filtered = filtered.filter((tool) =>
        tool.roles.some((role) => selectedRoles.includes(role))
      );
    }

    // 카테고리 필터
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((tool) =>
        tool.category.some((cat) => selectedCategories.includes(cat))
      );
    }

    // 가격 필터
    if (selectedPricing.length > 0) {
      filtered = filtered.filter((tool) =>
        selectedPricing.includes(tool.pricing.tier)
      );
    }

    // 난이도 필터
    if (selectedDifficulty.length > 0) {
      filtered = filtered.filter((tool) =>
        selectedDifficulty.includes(tool.difficulty)
      );
    }

    // 정렬
    filtered.sort((a, b) => {
      if (sortBy === "popularity") {
        return b.popularity - a.popularity;
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price") {
        const priceOrder = { free: 0, freemium: 1, paid: 2, enterprise: 3 };
        return priceOrder[a.pricing.tier] - priceOrder[b.pricing.tier];
      }
      return 0;
    });

    return filtered;
  }, [
    searchQuery,
    selectedRoles,
    selectedCategories,
    selectedPricing,
    selectedDifficulty,
    sortBy,
  ]);

  const toggleFilter = <T,>(value: T, array: T[], setter: (arr: T[]) => void) => {
    if (array.includes(value)) {
      setter(array.filter((item) => item !== value));
    } else {
      setter([...array, value]);
    }
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedRoles([]);
    setSelectedCategories([]);
    setSelectedPricing([]);
    setSelectedDifficulty([]);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedRoles.length > 0 ||
    selectedCategories.length > 0 ||
    selectedPricing.length > 0 ||
    selectedDifficulty.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI 도구 탐색
          </h1>
          <p className="text-lg text-gray-600">
            {filteredTools.length}개의 AI 도구를 찾았습니다
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="도구 이름, 설명으로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 shrink-0">
            <Card padding="md" className="sticky top-20">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">필터</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-primary-500 hover:text-primary-600"
                    >
                      초기화
                    </button>
                  )}
                </div>

                {/* 정렬 */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    정렬
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="popularity">인기순</option>
                    <option value="name">이름순</option>
                    <option value="price">가격순</option>
                  </select>
                </div>

                {/* 가격 필터 */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    가격
                  </label>
                  <div className="space-y-2">
                    {(["free", "freemium", "paid", "enterprise"] as PricingTier[]).map(
                      (tier) => (
                        <label key={tier} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedPricing.includes(tier)}
                            onChange={() =>
                              toggleFilter(tier, selectedPricing, setSelectedPricing)
                            }
                            className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {tier === "free"
                              ? "무료"
                              : tier === "freemium"
                              ? "프리미엄"
                              : tier === "paid"
                              ? "유료"
                              : "엔터프라이즈"}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* 난이도 필터 */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    난이도
                  </label>
                  <div className="space-y-2">
                    {(["beginner", "intermediate", "advanced"] as DifficultyLevel[]).map(
                      (level) => (
                        <label key={level} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedDifficulty.includes(level)}
                            onChange={() =>
                              toggleFilter(
                                level,
                                selectedDifficulty,
                                setSelectedDifficulty
                              )
                            }
                            className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {level === "beginner"
                              ? "초급"
                              : level === "intermediate"
                              ? "중급"
                              : "고급"}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* 직군 필터 */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    직군
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {roles.map((role) => (
                      <label key={role.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedRoles.includes(role.id)}
                          onChange={() =>
                            toggleFilter(role.id, selectedRoles, setSelectedRoles)
                          }
                          className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {role.icon} {role.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          {/* Tools Grid */}
          <div className="flex-1">
            {filteredTools.length === 0 ? (
              <Card padding="lg" className="text-center">
                <p className="text-gray-600">
                  검색 조건에 맞는 도구를 찾을 수 없습니다.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  className="mt-4"
                  onClick={clearAllFilters}
                >
                  필터 초기화
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTools.map((tool) => (
                  <Link key={tool.id} href={`/tools/${tool.id}`}>
                    <Card hover padding="lg" className="h-full">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                              {tool.name.charAt(0)}
                            </div>
                            <div>
                              <CardTitle className="text-lg">
                                {tool.name}
                              </CardTitle>
                              <div className="flex gap-2 mt-1">
                                <Badge
                                  variant={
                                    tool.pricing.tier === "free"
                                      ? "success"
                                      : tool.pricing.tier === "freemium"
                                      ? "primary"
                                      : "gray"
                                  }
                                  size="sm"
                                >
                                  {tool.pricing.tier === "free"
                                    ? "무료"
                                    : tool.pricing.tier === "freemium"
                                    ? "프리미엄"
                                    : tool.pricing.startingPrice
                                    ? `$${tool.pricing.startingPrice}/월~`
                                    : "유료"}
                                </Badge>
                                {tool.trending && (
                                  <Badge variant="secondary" size="sm">
                                    🔥 인기
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {tool.tagline}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-1">
                            {tool.category.slice(0, 3).map((cat) => (
                              <Badge key={cat} variant="gray" size="sm">
                                {
                                  categories.find((c) => c.id === cat)?.name
                                }
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">
                              인기도: {tool.popularity}/10
                            </span>
                            <span className="text-gray-500">
                              {tool.difficulty === "beginner"
                                ? "⭐ 초급"
                                : tool.difficulty === "intermediate"
                                ? "⭐⭐ 중급"
                                : "⭐⭐⭐ 고급"}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

