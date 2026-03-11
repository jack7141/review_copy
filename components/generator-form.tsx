"use client";

import { FileText, MessageSquare, HelpCircle, Send, Heart, Shield, Crown, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

const documentTypes = [
  { id: "landing", label: "랜딩페이지", icon: FileText },
  { id: "ad", label: "광고 카피", icon: MessageSquare },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "dm", label: "세일즈 DM", icon: Send },
];

const tones = [
  { id: "friendly", label: "친근함", icon: Heart, desc: "편안하고 따뜻한 톤" },
  { id: "trustworthy", label: "신뢰감", icon: Shield, desc: "전문적이고 믿음직한 톤" },
  { id: "premium", label: "프리미엄", icon: Crown, desc: "고급스럽고 세련된 톤" },
] as const;

interface GeneratorFormProps {
  productName: string;
  setProductName: (value: string) => void;
  targetCustomer: string;
  setTargetCustomer: (value: string) => void;
  tone: "friendly" | "trustworthy" | "premium";
  setTone: (value: "friendly" | "trustworthy" | "premium") => void;
  bannedWords: string;
  setBannedWords: (value: string) => void;
  reviews: string[];
  setReviews: (value: string[]) => void;
  onGenerate: (type: string) => void;
  isGenerating: boolean;
  generatingType: string | null;
}

export function GeneratorForm({
  productName,
  setProductName,
  targetCustomer,
  setTargetCustomer,
  tone,
  setTone,
  bannedWords,
  setBannedWords,
  reviews,
  setReviews,
  onGenerate,
  isGenerating,
  generatingType,
}: GeneratorFormProps) {
  const validReviewCount = reviews.filter((r) => r.trim()).length;

  const handleReviewChange = (index: number, value: string) => {
    const newReviews = [...reviews];
    newReviews[index] = value;
    setReviews(newReviews);
  };

  const addReview = () => {
    setReviews([...reviews, ""]);
  };

  const removeReview = (index: number) => {
    if (reviews.length <= 1) return;
    const newReviews = reviews.filter((_, i) => i !== index);
    setReviews(newReviews);
  };

  const addMultipleReviews = () => {
    setReviews([...reviews, "", "", "", "", ""]);
  };

  return (
    <Card className="lg:sticky lg:top-20 shadow-sm border border-border bg-card">
      <CardHeader className="pb-4 border-b border-border">
        <CardTitle className="text-lg text-card-foreground">입력 정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Product Name */}
        <div className="space-y-2">
          <Label htmlFor="productName">제품/서비스명</Label>
          <Input
            id="productName"
            placeholder="예: OO 코칭 프로그램"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        {/* Target Customer */}
        <div className="space-y-2">
          <Label htmlFor="targetCustomer">타겟 고객</Label>
          <Input
            id="targetCustomer"
            placeholder="예: 매출 고민 있는 1인 사업자"
            value={targetCustomer}
            onChange={(e) => setTargetCustomer(e.target.value)}
          />
        </div>

        {/* Tone Selection */}
        <div className="space-y-2">
          <Label>톤 선택</Label>
          <div className="grid grid-cols-3 gap-2">
            {tones.map((t) => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                  tone === t.id
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <t.icon className={`w-4 h-4 ${tone === t.id ? "text-accent" : "text-muted-foreground"}`} />
                <span className={`text-xs font-medium ${tone === t.id ? "text-foreground" : "text-muted-foreground"}`}>
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Banned Words */}
        <div className="space-y-2">
          <Label htmlFor="bannedWords">
            금칙어 <span className="text-muted-foreground font-normal">(선택)</span>
          </Label>
          <Input
            id="bannedWords"
            placeholder="예: 보장, 100%, 무조건"
            value={bannedWords}
            onChange={(e) => setBannedWords(e.target.value)}
          />
        </div>

        {/* Reviews */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>고객 후기</Label>
            <Badge 
              variant={validReviewCount >= 3 ? "default" : "secondary"}
              className={`rounded-full ${validReviewCount >= 3 ? "bg-accent text-accent-foreground" : ""}`}
            >
              {validReviewCount}개 입력됨
            </Badge>
          </div>

          <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
            {reviews.map((review, index) => (
              <div key={index} className="flex items-start gap-2 group">
                <div className="flex items-center justify-center w-6 h-9 text-xs text-muted-foreground font-medium shrink-0">
                  {index + 1}
                </div>
                <Textarea
                  placeholder={`후기 ${index + 1}번을 입력하세요`}
                  value={review}
                  onChange={(e) => handleReviewChange(index, e.target.value)}
                  className="flex-1 min-h-[36px] h-9 py-2 resize-none text-sm"
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "36px";
                    target.style.height = target.scrollHeight + "px";
                  }}
                />
                <button
                  onClick={() => removeReview(index)}
                  disabled={reviews.length <= 1}
                  className="w-8 h-9 flex items-center justify-center text-muted-foreground hover:text-destructive rounded-md hover:bg-destructive/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={addReview}
              className="flex-1 rounded-lg"
            >
              <Plus className="w-4 h-4 mr-1" />
              1개 추가
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={addMultipleReviews}
              className="flex-1 rounded-lg"
            >
              <Plus className="w-4 h-4 mr-1" />
              5개 추가
            </Button>
          </div>

          {validReviewCount > 0 && validReviewCount < 3 && (
            <p className="text-xs text-chart-3">
              최소 3개 이상의 후기가 필요합니다
            </p>
          )}
        </div>

        {/* Generate Buttons */}
        <div className="space-y-3 pt-2">
          <Label className="text-muted-foreground">문서별 개별 생성</Label>
          <div className="grid grid-cols-2 gap-2">
            {documentTypes.map((type) => (
              <Button
                key={type.id}
                variant="outline"
                size="sm"
                onClick={() => onGenerate(type.id)}
                disabled={isGenerating || validReviewCount < 3}
                className="justify-start rounded-lg"
              >
                {isGenerating && generatingType === type.id ? (
                  <Spinner className="w-4 h-4 mr-2" />
                ) : (
                  <type.icon className="w-4 h-4 mr-2" />
                )}
                {type.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
