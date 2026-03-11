"use client";

import { Quote, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sampleReviews = [
  "체계적인 커리큘럼 덕분에 3개월 만에 매출이 2배가 됐어요",
  "처음엔 반신반의했는데 진짜 효과가 있었습니다",
  "1:1 피드백이 정말 도움이 많이 됐어요",
  "다른 곳과 비교할 수 없을 정도로 퀄리티가 달라요",
  "바쁜 직장인도 충분히 따라갈 수 있었어요",
];

const generatedCopy = {
  headline: "3개월 만에 매출 2배, 비결은 체계적인 시스템입니다",
  citation1: '[후기 #1: "체계적인 커리큘럼 덕분에 3개월 만에 매출이 2배가 됐어요"]',
  benefit: "바쁜 분들도 쉽게 따라오실 수 있도록 설계했습니다",
  citation2: '[후기 #5: "바쁜 직장인도 충분히 따라갈 수 있었어요"]',
  social: "처음엔 망설이셨던 분들도 결과를 보고 만족하셨습니다",
  citation3: '[후기 #2: "처음엔 반신반의했는데 진짜 효과가 있었습니다"]',
};

export function ExampleSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 rounded-full">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            변환 예시
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
            이렇게 변환됩니다
          </h2>
          <p className="text-muted-foreground text-lg">
            실제 후기가 근거 있는 마케팅 카피로 변환되는 과정
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr,auto,1fr] gap-4 items-center">
          {/* Input: Reviews */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                <CardTitle className="text-sm font-medium text-muted-foreground">입력: 고객 후기</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {sampleReviews.map((review, index) => (
                <div key={index} className="flex items-start gap-2.5 text-sm">
                  <span className="text-accent font-mono text-xs shrink-0 mt-0.5">#{index + 1}</span>
                  <span className="text-foreground">{review}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Arrow */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-accent" />
            </div>
          </div>

          {/* Output: Generated Copy */}
          <Card className="border-accent/30 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <CardTitle className="text-sm font-medium text-accent">출력: 랜딩페이지 카피</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {generatedCopy.headline}
                </h3>
                <p className="text-xs flex items-start gap-1.5 text-accent/90 bg-accent/5 px-2.5 py-1.5 rounded-lg">
                  <Quote className="w-3 h-3 mt-0.5 shrink-0" />
                  <span>{generatedCopy.citation1}</span>
                </p>
              </div>

              <div className="border-t border-border pt-3">
                <p className="text-sm text-foreground mb-2">{generatedCopy.benefit}</p>
                <p className="text-xs flex items-start gap-1.5 text-accent/90 bg-accent/5 px-2.5 py-1.5 rounded-lg">
                  <Quote className="w-3 h-3 mt-0.5 shrink-0" />
                  <span>{generatedCopy.citation2}</span>
                </p>
              </div>

              <div className="border-t border-border pt-3">
                <p className="text-sm text-foreground mb-2">{generatedCopy.social}</p>
                <p className="text-xs flex items-start gap-1.5 text-accent/90 bg-accent/5 px-2.5 py-1.5 rounded-lg">
                  <Quote className="w-3 h-3 mt-0.5 shrink-0" />
                  <span>{generatedCopy.citation3}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
