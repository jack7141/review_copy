"use client";

import Link from "next/link";
import { ArrowRight, Quote, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium rounded-full">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 text-accent" />
          강사 / 코치 / 컨설턴트를 위한 AI 도구
        </Badge>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5 text-balance tracking-tight">
          후기 20개로
          <br />
          <span className="text-accent">매출 문서</span>를 뽑아내세요
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed text-pretty">
          랜딩페이지, 광고, FAQ, 세일즈 DM을 
          <span className="text-foreground font-medium"> 근거 후기 포함</span>으로 자동 생성.
          신뢰도 높은 카피로 전환율을 올리세요.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Button size="lg" asChild className="rounded-full px-6 shadow-md hover:shadow-lg transition-shadow">
            <Link href="/app">
              무료로 시작하기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="rounded-full px-6">
            <Link href="#how-it-works">
              작동 방식 보기
            </Link>
          </Button>
        </div>

        {/* Sample Output Preview */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute -inset-3 bg-gradient-to-r from-accent/10 via-chart-2/10 to-accent/10 rounded-3xl blur-2xl" />
          <div className="relative bg-card border border-border rounded-2xl p-5 text-left shadow-sm">
            <div className="flex items-center gap-1.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-chart-3/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-chart-4/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  3개월 만에 매출 2배, 그 비결은 시스템화였습니다
                </h3>
                <p className="text-muted-foreground text-sm flex items-start gap-2 bg-accent/5 rounded-lg px-3 py-2">
                  <Quote className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                  <span className="text-accent/90">
                    {"[후기 #3: \"체계적인 시스템 덕분에 3개월 만에 매출이 2배로 뛰었어요\"]"}
                  </span>
                </p>
              </div>
              
              <div className="border-t border-border pt-4">
                <p className="text-foreground mb-2">
                  <span className="font-medium">핵심 혜택:</span> 1:1 맞춤 피드백으로 빠른 성장
                </p>
                <p className="text-muted-foreground text-sm flex items-start gap-2 bg-accent/5 rounded-lg px-3 py-2">
                  <Quote className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                  <span className="text-accent/90">
                    {"[후기 #7: \"매주 피드백 받으면서 성장 속도가 확 달라졌습니다\"]"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="flex -space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 text-chart-4 fill-chart-4" />
            ))}
          </div>
          <span>이미 300+ 강사, 코치가 사용 중</span>
        </div>
      </div>
    </section>
  );
}
