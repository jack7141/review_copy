import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          홈으로 돌아가기
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-8">이용약관</h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">1. 서비스 소개</h2>
            <p>
              리뷰투카피는 고객 후기를 기반으로 마케팅 문서(랜딩페이지, 광고 카피, FAQ, 세일즈 DM)를 
              AI를 통해 자동 생성하는 서비스입니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">2. 이용자 책임</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>생성된 콘텐츠는 참고용이며, 사용 전 반드시 사실 관계를 확인해야 합니다.</li>
              <li>과대광고, 허위광고 등 관련 법규 위반에 대한 책임은 이용자에게 있습니다.</li>
              <li>의료, 금융 등 규제 업종의 경우 해당 업종 광고 규정을 준수해야 합니다.</li>
              <li>타인의 후기를 무단으로 사용하지 않아야 합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">3. 서비스 제한</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>무료 체험은 일 3회로 제한됩니다.</li>
              <li>서비스 남용 시 이용이 제한될 수 있습니다.</li>
              <li>불법적인 목적의 사용은 금지됩니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">4. 면책 조항</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>AI가 생성한 콘텐츠의 정확성을 보장하지 않습니다.</li>
              <li>생성된 콘텐츠 사용으로 인한 법적 분쟁에 대해 책임지지 않습니다.</li>
              <li>서비스 장애로 인한 손실에 대해 책임지지 않습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">5. 지적재산권</h2>
            <p>
              생성된 콘텐츠의 저작권은 이용자에게 있습니다. 
              단, 서비스 개선을 위해 익명화된 형태로 활용될 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">6. 약관 변경</h2>
            <p>
              본 약관은 서비스 정책에 따라 변경될 수 있으며, 
              변경 시 서비스 내 공지를 통해 안내됩니다.
            </p>
          </section>

          <p className="text-sm text-muted-foreground/70 pt-8">
            시행일: 2024년 1월 1일
          </p>
        </div>
      </div>
    </main>
  );
}
