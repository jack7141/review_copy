import { GraduationCap, Stethoscope, Building2, Store, Laptop, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const useCases = [
  {
    icon: GraduationCap,
    title: "강사 / 코치",
    description: "수강생 후기로 신규 모집 콘텐츠를 빠르게 만드세요",
    examples: ["온라인 강의", "1:1 코칭", "그룹 프로그램"],
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    icon: Stethoscope,
    title: "병원 / 시술",
    description: "환자 후기 기반 신뢰도 높은 마케팅 콘텐츠 생성",
    examples: ["피부과", "치과", "성형외과"],
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    icon: Building2,
    title: "B2B 에이전시",
    description: "클라이언트 성공 사례를 케이스 스터디로 변환",
    examples: ["마케팅 대행", "개발 에이전시", "컨설팅"],
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Store,
    title: "로컬 비즈니스",
    description: "네이버, 구글 리뷰로 지역 광고 카피 제작",
    examples: ["레스토랑", "헬스장", "뷰티샵"],
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    icon: Laptop,
    title: "SaaS / 앱",
    description: "사용자 피드백으로 제품 페이지 최적화",
    examples: ["B2B SaaS", "모바일 앱", "웹 서비스"],
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 rounded-full">
            <Users className="w-3.5 h-3.5 mr-1.5" />
            사용 사례
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
            이런 분들이 사용합니다
          </h2>
          <p className="text-muted-foreground text-lg">
            후기가 많은 업종일수록 효과가 극대화됩니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((useCase, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className={`w-10 h-10 rounded-xl ${useCase.bgColor} flex items-center justify-center mb-3`}>
                  <useCase.icon className={`w-5 h-5 ${useCase.color}`} />
                </div>
                <CardTitle className="text-lg">{useCase.title}</CardTitle>
                <CardDescription className="text-sm">
                  {useCase.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1.5">
                  {useCase.examples.map((example, i) => (
                    <Badge key={i} variant="secondary" className="text-xs rounded-md font-normal">
                      {example}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
