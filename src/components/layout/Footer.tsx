import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 브랜드 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg" />
              <span className="text-xl font-bold text-gray-900">
                AI Tools Hub
              </span>
            </div>
            <p className="text-gray-600 text-sm max-w-sm">
              다양한 직군을 위한 AI 도구를 찾고, 비교하고, 학습하세요.
              실무에 바로 적용 가능한 120개 이상의 AI 도구를 소개합니다.
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">탐색</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tools"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  도구 탐색
                </Link>
              </li>
              <li>
                <Link
                  href="/roles"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  직군별 추천
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  도구 비교
                </Link>
              </li>
              <li>
                <Link
                  href="/use-cases"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  사용 사례
                </Link>
              </li>
            </ul>
          </div>

          {/* 직군 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">직군</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/roles/designer"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  디자이너
                </Link>
              </li>
              <li>
                <Link
                  href="/roles/pm"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  PM
                </Link>
              </li>
              <li>
                <Link
                  href="/roles/marketer"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  마케터
                </Link>
              </li>
              <li>
                <Link
                  href="/roles/developer"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  개발자
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} AI Tools Hub. 학습 및 스터디 목적으로 제작되었습니다.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
              >
                개인정보처리방침
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
              >
                이용약관
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

