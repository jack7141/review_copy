import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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

        <h1 className="text-3xl font-bold text-foreground mb-8">개인정보처리방침</h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">1. 수집하는 정보</h2>
            <p>
              리뷰투카피는 서비스 제공을 위해 최소한의 정보만 처리합니다.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>입력된 후기 텍스트 (문서 생성을 위해 일시적으로 처리)</li>
              <li>서비스 이용 기록 (오류 해결 및 서비스 개선 목적)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">2. 정보의 이용 목적</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>고객 후기 기반 마케팅 문서 생성</li>
              <li>서비스 품질 개선 및 오류 해결</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">3. 정보의 보관 및 파기</h2>
            <p>
              입력된 후기 텍스트는 문서 생성 후 즉시 삭제되며, 서버에 별도로 저장되지 않습니다.
              서비스 이용 기록은 30일간 보관 후 자동 삭제됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">4. 제3자 제공</h2>
            <p>
              리뷰투카피는 사용자 정보를 제3자에게 제공하지 않습니다.
              단, AI 문서 생성을 위해 외부 AI 서비스(Anthropic Claude)에 
              후기 텍스트가 일시적으로 전송됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">5. 문의</h2>
            <p>
              개인정보 관련 문의는 서비스 내 문의 기능을 통해 연락해주세요.
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
