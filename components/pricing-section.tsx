import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "무료 체험",
    price: "0",
    description: "서비스를 먼저 체험해보세요",
    features: [
      "일 3회 문서 생성",
      "모든 문서 유형 이용",
      "근거 후기 자동 인용",
      "결과 복사 및 저장",
    ],
    cta: "무료로 시작하기",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "준비중",
    description: "더 많은 기능이 곧 출시됩니다",
    features: [
      "무제한 문서 생성",
      "톤 & 스타일 커스터마이징",
      "여러 제품 관리",
      "팀 협업 기능",
      "API 연동",
    ],
    cta: "출시 알림 받기",
    highlighted: true,
    comingSoon: true,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 rounded-full">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            요금제
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
            심플한 요금제
          </h2>
          <p className="text-muted-foreground text-lg">
            지금은 무료로 체험하고, 만족하면 Pro를 기다려주세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.highlighted ? "border-accent shadow-md" : ""
              }`}
            >
              {plan.highlighted && (
                <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-accent">
                  Coming Soon
                </Badge>
              )}
              
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="pt-2">
                  {plan.price === "준비중" ? (
                    <span className="text-2xl font-bold text-muted-foreground">
                      {plan.price}
                    </span>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">원</span>
                    </div>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2.5">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.highlighted ? "bg-muted" : "bg-accent/10"}`}>
                        <Check className={`w-3 h-3 ${plan.highlighted ? "text-muted-foreground" : "text-accent"}`} />
                      </div>
                      <span className={plan.comingSoon ? "text-muted-foreground" : "text-foreground"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full rounded-lg"
                  variant={plan.highlighted ? "outline" : "default"}
                  disabled={plan.comingSoon}
                  asChild={!plan.comingSoon}
                >
                  {plan.comingSoon ? (
                    <span>{plan.cta}</span>
                  ) : (
                    <Link href="/app">
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
