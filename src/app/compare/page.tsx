"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { aiTools, getToolById } from "@/data/ai-tools";
import type { AITool } from "@/types";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const [selectedTools, setSelectedTools] = useState<AITool[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // URL에서 도구 ID 가져오기
    const toolIds = searchParams.get("tools")?.split(",") || [];
    const tools = toolIds
      .map((id) => getToolById(id))
      .filter((tool): tool is AITool => tool !== undefined);
    setSelectedTools(tools);
  }, [searchParams]);

  const handleAddTool = (tool: AITool) => {
    if (selectedTools.length < 4 && !selectedTools.find((t) => t.id === tool.id)) {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const handleRemoveTool = (toolId: string) => {
    setSelectedTools(selectedTools.filter((t) => t.id !== toolId));
  };

  const filteredTools = aiTools.filter(
    (tool) =>
      !selectedTools.find((t) => t.id === tool.id) &&
      (searchQuery === "" ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI 도구 비교
          </h1>
          <p className="text-lg text-gray-600">
            최대 4개의 도구를 선택하여 기능, 가격, 난이도를 비교해보세요
          </p>
        </div>

        {/* Selected Tools */}
        {selectedTools.length > 0 && (
          <div className="mb-8">
            <Card padding="lg">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  선택된 도구 ({selectedTools.length}/4)
                </h2>
                {selectedTools.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTools([])}
                  >
                    모두 제거
                  </Button>
                )}
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        항목
                      </th>
                      {selectedTools.map((tool) => (
                        <th
                          key={tool.id}
                          className="text-left py-4 px-4 min-w-[200px]"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-bold text-gray-900">
                                {tool.name}
                              </div>
                              <div className="text-sm font-normal text-gray-600">
                                {tool.tagline}
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveTool(tool.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              ✕
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* 가격 */}
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-medium text-gray-700">
                        가격
                      </td>
                      {selectedTools.map((tool) => (
                        <td key={tool.id} className="py-4 px-4">
                          <Badge
                            variant={
                              tool.pricing.tier === "free"
                                ? "success"
                                : tool.pricing.tier === "freemium"
                                ? "primary"
                                : "gray"
                            }
                            size="md"
                          >
                            {tool.pricing.tier === "free"
                              ? "무료"
                              : tool.pricing.tier === "freemium"
                              ? "프리미엄"
                              : tool.pricing.startingPrice
                              ? `$${tool.pricing.startingPrice}/월~`
                              : "유료"}
                          </Badge>
                          {tool.pricing.free && (
                            <div className="text-sm text-gray-600 mt-1">
                              {tool.pricing.free}
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* 난이도 */}
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-medium text-gray-700">
                        난이도
                      </td>
                      {selectedTools.map((tool) => (
                        <td key={tool.id} className="py-4 px-4">
                          <span className="text-gray-900">
                            {tool.difficulty === "beginner"
                              ? "⭐ 초급"
                              : tool.difficulty === "intermediate"
                              ? "⭐⭐ 중급"
                              : "⭐⭐⭐ 고급"}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* 인기도 */}
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-medium text-gray-700">
                        인기도
                      </td>
                      {selectedTools.map((tool) => (
                        <td key={tool.id} className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                              <div
                                className="bg-primary-500 h-2 rounded-full"
                                style={{ width: `${tool.popularity * 10}%` }}
                              />
                            </div>
                            <span className="text-gray-900">
                              {tool.popularity}/10
                            </span>
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* 주요 기능 */}
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-medium text-gray-700 align-top">
                        주요 기능
                      </td>
                      {selectedTools.map((tool) => (
                        <td key={tool.id} className="py-4 px-4">
                          <ul className="space-y-1">
                            {tool.features.slice(0, 4).map((feature, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-700 flex items-start gap-2"
                              >
                                <span className="text-primary-500 mt-1">✓</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    {/* 장점 */}
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-medium text-gray-700 align-top">
                        장점
                      </td>
                      {selectedTools.map((tool) => (
                        <td key={tool.id} className="py-4 px-4">
                          <ul className="space-y-1">
                            {tool.pros.slice(0, 3).map((pro, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-700 flex items-start gap-2"
                              >
                                <span className="text-green-500">+</span>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    {/* 단점 */}
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-medium text-gray-700 align-top">
                        단점
                      </td>
                      {selectedTools.map((tool) => (
                        <td key={tool.id} className="py-4 px-4">
                          <ul className="space-y-1">
                            {tool.cons.slice(0, 3).map((con, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-700 flex items-start gap-2"
                              >
                                <span className="text-red-500">-</span>
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    {/* 웹사이트 */}
                    <tr>
                      <td className="py-4 px-4 font-medium text-gray-700">
                        바로가기
                      </td>
                      {selectedTools.map((tool) => (
                        <td key={tool.id} className="py-4 px-4">
                          <div className="space-y-2">
                            <a
                              href={tool.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button variant="primary" size="sm" fullWidth>
                                웹사이트 →
                              </Button>
                            </a>
                            <Link href={`/tools/${tool.id}`}>
                              <Button variant="outline" size="sm" fullWidth>
                                상세 정보
                              </Button>
                            </Link>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Add Tools */}
        {selectedTools.length < 4 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              도구 추가하기 (최대 4개)
            </h2>

            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="도구 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Tools List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.slice(0, 12).map((tool) => (
                <Card
                  key={tool.id}
                  padding="md"
                  className="cursor-pointer"
                  onClick={() => handleAddTool(tool)}
                  hover
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                      {tool.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {tool.tagline}
                      </p>
                      <div className="mt-2">
                        <Badge
                          variant={
                            tool.pricing.tier === "free" ? "success" : "primary"
                          }
                          size="sm"
                        >
                          {tool.pricing.tier === "free" ? "무료" : "유료"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {selectedTools.length === 0 && (
          <Card padding="lg" className="text-center">
            <div className="py-12">
              <div className="text-6xl mb-4">⚖️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                도구를 선택해주세요
              </h3>
              <p className="text-gray-600 mb-6">
                비교하고 싶은 AI 도구를 최대 4개까지 선택할 수 있습니다
              </p>
              <Link href="/tools">
                <Button variant="primary" size="lg">
                  도구 둘러보기
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

