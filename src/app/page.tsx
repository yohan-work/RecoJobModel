import Link from "next/link";
import Button from "@/components/ui/Button";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { getAllRoles } from "@/data/categories";
import { getPopularTools, getTrendingTools } from "@/data/ai-tools";

export default function Home() {
  const roles = getAllRoles();
  const popularTools = getPopularTools(6);
  const trendingTools = getTrendingTools().slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="primary" size="md" className="mb-6">
            {popularTools.length}개 이상의 AI 도구
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            당신의 업무를 위한
            <br />
            <span className="text-primary-500">최적의 AI 도구</span>를 찾으세요
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            PM, 마케터, 디자이너, 개발자 등 모든 직군을 위한
            <br />
            AI 도구 추천 및 비교 플랫폼
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools">
              <Button variant="primary" size="lg">
                도구 탐색하기
              </Button>
            </Link>
            <Link href="/roles">
              <Button variant="outline" size="lg">
                직군별 추천 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Tools Section */}
      {trendingTools.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  🔥 지금 뜨는 AI 도구
                </h2>
                <p className="text-gray-600">
                  최근 인기가 급상승하고 있는 도구들을 확인하세요
                </p>
              </div>
              <Link href="/tools?filter=trending">
                <Button variant="ghost" size="sm">
                  전체 보기 →
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingTools.map((tool) => (
                <Link key={tool.id} href={`/tools/${tool.id}`}>
                  <Card hover padding="md" className="h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="secondary" size="sm">
                          인기 급상승
                        </Badge>
                        <span className="text-2xl">⭐</span>
                      </div>
                      <CardTitle className="text-lg mb-2">
                        {tool.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {tool.tagline}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {tool.category.slice(0, 2).map((cat) => (
                          <Badge key={cat} variant="gray" size="sm">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Tools Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              인기 AI 도구
            </h2>
            <p className="text-gray-600">
              가장 많은 사람들이 사용하는 검증된 도구들
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.id}`}>
                <Card hover padding="lg" className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center text-white font-bold">
                          {tool.name.charAt(0)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
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
                              : "유료"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {tool.tagline}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {tool.roles.slice(0, 3).map((role) => (
                          <Badge key={role} variant="gray" size="sm">
                            {
                              roles
                                .find((r) => r.id === role)
                                ?.name.split(" ")[0]
                            }
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          인기도: {tool.popularity}/10
                        </span>
                        <span className="text-primary-500 font-medium">
                          자세히 →
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/tools">
              <Button variant="primary" size="lg">
                모든 도구 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              왜 AI Tools Hub인가요?
            </h2>
            <p className="text-gray-600">
              실무에 바로 적용 가능한 AI 도구를 쉽게 찾고 비교하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hover padding="lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <CardTitle>직군별 맞춤 추천</CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  PM, 마케터, 디자이너 등 직군별로 최적화된 AI 도구를
                  추천받으세요
                </p>
              </CardHeader>
            </Card>

            <Card hover padding="lg">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <CardTitle>도구 비교</CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  여러 AI 도구를 동시에 비교하고 가장 적합한 도구를 선택하세요
                </p>
              </CardHeader>
            </Card>

            <Card hover padding="lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <CardTitle>실무 사용 사례</CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  실제 업무에서 어떻게 활용하는지 구체적인 사례를 확인하세요
                </p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              직군별 추천
            </h2>
            <p className="text-gray-600">
              당신의 직군에 맞는 AI 도구를 찾아보세요
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {roles.map((role) => (
              <Link key={role.id} href={`/roles/${role.id}`}>
                <Card hover padding="md" className="text-center cursor-pointer">
                  <CardContent>
                    <div className="text-4xl mb-3">{role.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {role.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {role.toolCount}개 도구
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-500 to-secondary-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-white/90 mb-8">
            업무 생산성을 2-3배 향상시킬 AI 도구를 찾아보세요
          </p>
          <Link href="/tools">
            <Button
              variant="secondary"
              size="lg"
              className="!bg-white !text-primary-600 hover:!bg-gray-50 shadow-xl border-2 border-white hover:shadow-2xl transition-all"
            >
              무료로 시작하기
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
