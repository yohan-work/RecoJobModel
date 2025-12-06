import { notFound } from "next/navigation";
import Link from "next/link";
import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getRoleById, getAllRoles } from "@/data/categories";
import { getToolsByRole } from "@/data/ai-tools";
import type { RoleType } from "@/types";

export function generateStaticParams() {
  return getAllRoles().map((role) => ({
    role: role.id,
  }));
}

export default function RoleDetailPage({
  params,
}: {
  params: { role: string };
}) {
  const role = getRoleById(params.role as RoleType);

  if (!role) {
    notFound();
  }

  const tools = getToolsByRole(role.id);
  const essentialTools = tools.filter((tool) =>
    role.essentialTools.includes(tool.id)
  );
  const recommendedTools = tools.filter(
    (tool) => !role.essentialTools.includes(tool.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary-500">
            홈
          </Link>
          <span className="mx-2">/</span>
          <Link href="/roles" className="hover:text-primary-500">
            직군
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{role.name}</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-4">{role.icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {role.name}를 위한 AI 도구
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            {role.description}
          </p>
          <div className="flex gap-3 justify-center">
            <Badge variant="primary" size="lg">
              총 {tools.length}개 도구
            </Badge>
            <Badge variant="secondary" size="lg">
              필수 {essentialTools.length}개
            </Badge>
          </div>
        </div>

        {/* Essential Tools */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ⭐ 필수 도구 {essentialTools.length}종
            </h2>
            <p className="text-gray-600">
              {role.name}라면 반드시 알아야 할 핵심 도구들입니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {essentialTools.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.id}`}>
                <Card
                  hover
                  padding="lg"
                  className="h-full border-2 border-primary-200 bg-primary-50/30"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        {tool.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <Badge
                          variant={
                            tool.pricing.tier === "free"
                              ? "success"
                              : "primary"
                          }
                          size="sm"
                        >
                          {tool.pricing.tier === "free" ? "무료" : "프리미엄"}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {tool.tagline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                        난이도:{" "}
                        {tool.difficulty === "beginner"
                          ? "⭐ 초급"
                          : tool.difficulty === "intermediate"
                          ? "⭐⭐ 중급"
                          : "⭐⭐⭐ 고급"}
                      </div>
                      <div className="text-sm font-medium text-primary-600">
                        자세히 보기 →
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recommended Tools */}
        {recommendedTools.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                💡 추천 도구 {recommendedTools.length}종
              </h2>
              <p className="text-gray-600">
                더 나은 업무 효율을 위한 추가 도구들입니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedTools.map((tool) => (
                <Link key={tool.id} href={`/tools/${tool.id}`}>
                  <Card hover padding="lg" className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center text-white font-bold">
                          {tool.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base">
                            {tool.name}
                          </CardTitle>
                          <div className="flex gap-1 mt-1">
                            <Badge
                              variant={
                                tool.pricing.tier === "free"
                                  ? "success"
                                  : "gray"
                              }
                              size="sm"
                            >
                              {tool.pricing.tier === "free"
                                ? "무료"
                                : tool.pricing.startingPrice
                                ? `$${tool.pricing.startingPrice}/월~`
                                : "유료"}
                            </Badge>
                            {tool.trending && (
                              <Badge variant="secondary" size="sm">
                                🔥
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <CardDescription className="line-clamp-2 text-sm">
                        {tool.tagline}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-500">
                        인기도: {tool.popularity}/10
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card padding="lg" className="bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              더 많은 도구를 찾고 계신가요?
            </h3>
            <p className="text-gray-600 mb-6">
              모든 AI 도구를 탐색하고 비교해보세요
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/tools">
                <Button variant="primary" size="lg">
                  모든 도구 보기
                </Button>
              </Link>
              <Link href="/compare">
                <Button variant="outline" size="lg">
                  도구 비교하기
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

