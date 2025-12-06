import Link from "next/link";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { getAllRoles } from "@/data/categories";

export default function RolesPage() {
  const roles = getAllRoles();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            직군별 AI 도구 추천
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            당신의 직군에 최적화된 AI 도구를 찾아보세요. 각 직군별로 엄선된
            필수 도구와 추천 도구를 제공합니다.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Link key={role.id} href={`/roles/${role.id}`}>
              <Card hover padding="lg" className="h-full">
                <CardHeader>
                  <div className="text-6xl mb-4 text-center">{role.icon}</div>
                  <CardTitle className="text-center text-2xl">
                    {role.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center mb-4">
                    {role.description}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="primary" size="md">
                      {role.toolCount}개 도구
                    </Badge>
                    <Badge variant="secondary" size="md">
                      필수 {role.essentialTools.length}개
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

