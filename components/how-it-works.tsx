import Link from "next/link";
import { ClipboardPaste, FileOutput, MousePointerClick, Quote, FileText, Megaphone, HelpCircle, MessageSquare, ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    icon: ClipboardPaste,
    title: "후기 붙여넣기",
    description: "수집한 고객 후기를 복사해서 붙여넣으세요",
    color: "bg-chart-2/10 text-chart-2",
  },
  {
    icon: MousePointerClick,
    title: "문서 유형 선택",
    description: "필요한 문서 유형을 선택하세요",
    color: "bg-chart-3/10 text-chart-3",
  },
  {
    icon: FileOutput,
    title: "근거 포함 생성",
    description: "실제 후기 인용이 달린 문서 완성",
    color: "bg-accent/10 text-accent",
  },
];

const benefits = [
  {
    icon: Shield,
    stat: "100%",
    label: "근거 기반",
    desc: "모든 주장에 실제 후기",
  },
  {
    icon: FileText,
    stat: "4종",
    label: "문서 유형",
    desc: "랜딩/광고/FAQ/DM",
  },
  {
    icon: Clock,
    stat: "30초",
    label: "생성 시간",
    desc: "붙여넣기부터 완성까지",
  },
];

const documentTypes = [
  {
    id: "landing",
    icon: FileText,
    title: "랜딩페이지",
    description: "헤드라인, 혜택 섹션, CTA 문구 생성",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    id: "ad",
    icon: Megaphone,
    title: "광고 카피",
    description: "SNS 광고, 검색 광고, 숏폼 훅 생성",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    id: "faq",
    icon: HelpCircle,
    title: "FAQ",
    description: "자주 묻는 질문과 후기 기반 답변",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    id: "dm",
    icon: MessageSquare,
    title: "세일즈 DM",
    description: "첫 연락, 팔로업, 클로징 메시지",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4 rounded-full">
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            차별점
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
            왜 근거 포함이 중요한가요?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty">
            일반 카피 생성기는 그럴듯한 문장만 만들어줍니다.
            리뷰투카피는 <span className="text-foreground font-medium">실제 고객 목소리</span>를 근거로 달아줍니다.
          </p>
        </div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          <Card className="bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                <CardDescription>일반 카피 생성기</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground mb-2">
                {"\"저희 서비스로 매출이 크게 상승합니다\""}
              </p>
              <p className="text-sm text-muted-foreground">
                근거 없음. 믿기 어려움.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-accent/50 bg-accent/5">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <CardDescription className="text-accent font-medium">리뷰투카피</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground mb-2">
                {"\"저희 서비스로 매출이 크게 상승합니다\""}
              </p>
              <p className="text-sm text-accent flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5" />
                {"[후기 #12: \"진짜 3개월 만에 매출 180% 올랐어요\"]"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Steps */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">3단계로 끝</h3>
          <p className="text-muted-foreground">복잡한 설정 없이 바로 시작하세요</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="pt-6">
                <div className="absolute -top-1 -left-1 w-8 h-8 rounded-br-xl bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-4`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg mb-2">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center py-6">
              <CardContent className="p-0">
                <benefit.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-accent mb-0.5">{benefit.stat}</div>
                <div className="text-foreground font-medium text-sm">{benefit.label}</div>
                <div className="text-muted-foreground text-xs">{benefit.desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Document Types CTA */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">어떤 문서가 필요하세요?</h3>
          <p className="text-muted-foreground">클릭하면 바로 생성기로 이동합니다</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {documentTypes.map((doc) => (
            <Link
              key={doc.id}
              href={`/app?type=${doc.id}`}
              className="group"
            >
              <Card className="h-full hover:border-accent/50 hover:shadow-md transition-all group-hover:-translate-y-0.5">
                <CardContent className="pt-5">
                  <div className={`w-10 h-10 rounded-xl ${doc.bgColor} flex items-center justify-center mb-3`}>
                    <doc.icon className={`w-5 h-5 ${doc.color}`} />
                  </div>
                  <CardTitle className="text-base mb-1 flex items-center gap-1.5">
                    {doc.title}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </CardTitle>
                  <CardDescription className="text-xs">{doc.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button size="lg" asChild className="rounded-full px-8 shadow-md">
            <Link href="/app">
              전체 문서 생성기로 이동
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
