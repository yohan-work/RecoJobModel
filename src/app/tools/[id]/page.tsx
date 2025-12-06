import { notFound } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { getToolById, aiTools } from "@/data/ai-tools";
import { getRoleById, getCategoryById } from "@/data/categories";

export function generateStaticParams() {
  return aiTools.map((tool) => ({
    id: tool.id,
  }));
}

export default function ToolDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const tool = getToolById(params.id);

  if (!tool) {
    notFound();
  }

  // 관련 도구 (같은 카테고리)
  const relatedTools = aiTools
    .filter(
      (t) =>
        t.id !== tool.id &&
        t.category.some((cat) => tool.category.includes(cat))
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary-500">
            홈
          </Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-primary-500">
            도구
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{tool.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card padding="lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shrink-0">
                  {tool.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {tool.name}
                    </h1>
                    {tool.trending && (
                      <Badge variant="secondary" size="md">
                        🔥 인기 급상승
                      </Badge>
                    )}
                  </div>
                  <p className="text-xl text-gray-600 mb-4">{tool.tagline}</p>
                  <div className="flex flex-wrap gap-2">
                    {tool.category.map((cat) => (
                      <Badge key={cat} variant="primary" size="md">
                        {getCategoryById(cat).icon} {getCategoryById(cat).name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{tool.description}</p>

              <div className="flex gap-3">
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="lg">
                    웹사이트 방문 →
                  </Button>
                </a>
                <Link href={`/compare?tools=${tool.id}`}>
                  <Button variant="outline" size="lg">
                    비교하기
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Features */}
            <Card padding="lg">
              <CardHeader>
                <CardTitle>주요 기능</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card padding="lg">
                <CardHeader>
                  <CardTitle className="text-green-700">👍 장점</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tool.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500">+</span>
                        <span className="text-gray-700 text-sm">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card padding="lg">
                <CardHeader>
                  <CardTitle className="text-red-700">👎 단점</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tool.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-500">-</span>
                        <span className="text-gray-700 text-sm">{con}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Use Cases */}
            <Card padding="lg">
              <CardHeader>
                <CardTitle>실무 사용 사례</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tool.useCases.map((useCase, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <p className="text-gray-700">{useCase}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <Card padding="lg">
                <CardHeader>
                  <CardTitle>비슷한 도구</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {relatedTools.map((relTool) => (
                      <Link key={relTool.id} href={`/tools/${relTool.id}`}>
                        <div className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {relTool.name}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {relTool.tagline}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card padding="lg">
              <CardHeader>
                <CardTitle>가격 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">티어</span>
                    <div className="mt-1">
                      <Badge
                        variant={
                          tool.pricing.tier === "free"
                            ? "success"
                            : tool.pricing.tier === "freemium"
                            ? "primary"
                            : "gray"
                        }
                        size="lg"
                      >
                        {tool.pricing.tier === "free"
                          ? "완전 무료"
                          : tool.pricing.tier === "freemium"
                          ? "프리미엄"
                          : tool.pricing.tier === "paid"
                          ? "유료"
                          : "엔터프라이즈"}
                      </Badge>
                    </div>
                  </div>

                  {tool.pricing.free && (
                    <div>
                      <span className="text-sm text-gray-600">무료 플랜</span>
                      <p className="text-gray-900 font-medium mt-1">
                        {tool.pricing.free}
                      </p>
                    </div>
                  )}

                  {tool.pricing.paid && (
                    <div>
                      <span className="text-sm text-gray-600">유료 플랜</span>
                      <p className="text-gray-900 font-medium mt-1">
                        {tool.pricing.paid}
                      </p>
                    </div>
                  )}

                  {tool.pricing.startingPrice && (
                    <div>
                      <span className="text-sm text-gray-600">시작 가격</span>
                      <p className="text-2xl font-bold text-primary-600 mt-1">
                        ${tool.pricing.startingPrice}
                        <span className="text-sm text-gray-600 font-normal">
                          /월
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card padding="lg">
              <CardHeader>
                <CardTitle>상세 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">난이도</span>
                    <p className="text-gray-900 font-medium mt-1">
                      {tool.difficulty === "beginner"
                        ? "⭐ 초급 (쉬움)"
                        : tool.difficulty === "intermediate"
                        ? "⭐⭐ 중급"
                        : "⭐⭐⭐ 고급 (어려움)"}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600">인기도</span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${tool.popularity * 10}%` }}
                        />
                      </div>
                      <span className="text-gray-900 font-medium">
                        {tool.popularity}/10
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600 block mb-2">
                      추천 직군
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {tool.roles.map((role) => (
                        <Link key={role} href={`/roles/${role}`}>
                          <Badge variant="gray" size="sm">
                            {getRoleById(role).icon} {getRoleById(role).name}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card padding="lg" className="bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200">
              <CardHeader>
                <CardTitle>지금 시작하세요</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">
                  {tool.name}으로 업무 생산성을 향상시켜보세요.
                </p>
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="primary" size="md" fullWidth>
                    무료로 시작하기 →
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

