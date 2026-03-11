"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GeneratorForm } from "@/components/generator-form";
import { GeneratorOutput } from "@/components/generator-output";

// evidence must be first for UX — it's the "insight layer" before docs
const validTypes = ["evidence", "landing", "ad", "faq", "dm"];
const INITIAL_REVIEWS = ["", "", "", "", ""];

function AppContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const initialTab = validTypes.includes(typeParam || "") ? typeParam! : "evidence";

  const [productName, setProductName] = useState("");
  const [targetCustomer, setTargetCustomer] = useState("");
  const [tone, setTone] = useState<"friendly" | "trustworthy" | "premium">("friendly");
  const [bannedWords, setBannedWords] = useState("");
  const [evidenceStrength, setEvidenceStrength] = useState<"conservative" | "balanced" | "aggressive">("conservative");
  const [reviews, setReviews] = useState<string[]>(INITIAL_REVIEWS);

  const [outputs, setOutputs] = useState<Record<string, string>>({
    evidence: "",
    landing: "",
    ad: "",
    faq: "",
    dm: "",
  });
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingType, setGeneratingType] = useState<string | null>(null);

  useEffect(() => {
    if (typeParam && validTypes.includes(typeParam)) {
      setActiveTab(typeParam);
    }
  }, [typeParam]);

  const reviewCount = reviews.filter((r) => r.trim()).length;

  const handleGenerate = async (type: string) => {
    const validReviews = reviews.filter((r) => r.trim());
    if (validReviews.length < 3) return;

    setIsGenerating(true);
    setGeneratingType(type);
    setActiveTab(type);
    setOutputs((prev) => ({ ...prev, [type]: "" }));

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviews: validReviews.join("\n"),
          documentType: type,
          productName,
          targetCustomer,
          tone,
          bannedWords,
          evidenceStrength,
        }),
      });

      if (!response.ok) throw new Error("Generation failed");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          setOutputs((prev) => ({ ...prev, [type]: prev[type] + chunk }));
        }
      }
    } catch (error) {
      console.error("Generation error:", error);
    } finally {
      setIsGenerating(false);
      setGeneratingType(null);
    }
  };

  // Evidence Map first, then the rest
  const handleGenerateAll = async () => {
    const types = ["evidence", "landing", "ad", "faq", "dm"];
    for (const type of types) {
      await handleGenerate(type);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">홈으로</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-accent-foreground" />
              </div>
              <span className="font-bold text-foreground">리뷰투카피</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Badge
              variant={reviewCount >= 3 ? "default" : "secondary"}
              className="rounded-full text-xs"
            >
              후기 {reviewCount}개
            </Badge>
            <Button
              onClick={handleGenerateAll}
              disabled={isGenerating || reviewCount < 3}
              size="sm"
              className="rounded-full px-4"
            >
              <Sparkles className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">전체 생성</span>
              <span className="sm:hidden">생성</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Form */}
          <div className="w-full lg:w-[380px] lg:shrink-0">
            <GeneratorForm
              productName={productName}
              setProductName={setProductName}
              targetCustomer={targetCustomer}
              setTargetCustomer={setTargetCustomer}
              tone={tone}
              setTone={setTone}
              bannedWords={bannedWords}
              setBannedWords={setBannedWords}
              evidenceStrength={evidenceStrength}
              setEvidenceStrength={setEvidenceStrength}
              reviews={reviews}
              setReviews={setReviews}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              generatingType={generatingType}
            />
          </div>

          {/* Right: Output */}
          <div className="w-full lg:flex-1 min-w-0">
            <GeneratorOutput
              outputs={outputs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isGenerating={isGenerating}
              generatingType={generatingType}
            />
          </div>
        </div>
      </div>

      {/* Safety Note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
        <p className="text-xs text-muted-foreground text-center">
          * 생성된 콘텐츠는 반드시 사실 확인 후 사용해주세요.
        </p>
      </div>
    </main>
  );
}

export default function AppPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    }>
      <AppContent />
    </Suspense>
  );
}
