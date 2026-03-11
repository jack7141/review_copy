"use client";

import { HelpCircle, AlertTriangle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    question: "후기는 몇 개 이상 필요한가요?",
    answer: "최소 3개 이상의 후기가 필요하며, 10개 이상일 때 더 풍부하고 다양한 카피가 생성됩니다. 20개 이상이면 최적의 결과를 얻을 수 있습니다.",
  },
  {
    question: "어떤 형식의 후기를 넣어야 하나요?",
    answer: "한 줄에 하나씩, 고객의 실제 후기를 그대로 복사해서 붙여넣으시면 됩니다. 네이버 리뷰, 카카오톡 메시지, 설문 응답 등 어떤 형식이든 가능합니다.",
  },
  {
    question: "생성된 문서를 바로 사용해도 되나요?",
    answer: "생성된 콘텐츠는 초안으로 활용하시고, 반드시 사실 관계를 확인한 후 사용해주세요. 특히 수치나 효과에 대한 표현은 과대광고가 되지 않도록 검토가 필요합니다.",
  },
  {
    question: "의료/건강 관련 서비스도 사용할 수 있나요?",
    answer: "네, 사용 가능합니다. 다만 의료 광고 규정에 따라 '효과 보장', '완치' 등의 표현은 금칙어로 설정하시는 것을 권장합니다.",
  },
  {
    question: "무료 체험의 제한은 무엇인가요?",
    answer: "하루 3회까지 문서를 생성할 수 있습니다. 모든 문서 유형(랜딩/광고/FAQ/DM)을 이용하실 수 있으며, 별도 회원가입 없이 바로 사용 가능합니다.",
  },
  {
    question: "Pro 버전은 언제 출시되나요?",
    answer: "현재 개발 중이며, 곧 출시 예정입니다. 무제한 생성, 팀 협업, API 연동 등의 기능이 포함될 예정입니다.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 rounded-full">
            <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
            자주 묻는 질문
          </h2>
          <p className="text-muted-foreground text-lg">
            궁금한 점이 있으신가요?
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-xl px-5 data-[state=open]:border-accent/30 data-[state=open]:shadow-sm transition-all"
            >
              <AccordionTrigger className="text-left text-foreground hover:no-underline py-4 text-[15px]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Card className="mt-10 border-chart-4/30 bg-chart-4/5">
          <CardContent className="pt-5 flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-chart-4/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-chart-4" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                안전하게 사용하세요
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                AI가 생성한 콘텐츠는 항상 사실 확인이 필요합니다. 특히 효과, 수치, 보장 등의 표현은 
                관련 법규(표시광고법 등)를 준수하여 수정 후 사용해주세요.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
