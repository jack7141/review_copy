"use client";

import { useState } from "react";
import { Check, Copy, Download, FileText, MessageSquare, HelpCircle, Send, Quote, Sparkles, AlertTriangle, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const documentTypes = [
  { id: "landing", label: "Landing", fullLabel: "랜딩페이지", icon: FileText },
  { id: "ad", label: "Ads", fullLabel: "광고 카피", icon: MessageSquare },
  { id: "faq", label: "FAQ", fullLabel: "FAQ", icon: HelpCircle },
  { id: "dm", label: "DM", fullLabel: "세일즈 DM", icon: Send },
];

interface GeneratorOutputProps {
  outputs: Record<string, string>;
  activeTab: string;
  setActiveTab: (value: string) => void;
  isGenerating: boolean;
  generatingType: string | null;
}

export function GeneratorOutput({
  outputs,
  activeTab,
  setActiveTab,
  isGenerating,
  generatingType,
}: GeneratorOutputProps) {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const handleCopy = async (type: string) => {
    await navigator.clipboard.writeText(outputs[type]);
    setCopiedTab(type);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleCopyAll = async () => {
    const allContent = documentTypes
      .map((type) => {
        if (!outputs[type.id]) return null;
        return `=== ${type.fullLabel} ===\n\n${outputs[type.id]}`;
      })
      .filter(Boolean)
      .join("\n\n\n");
    
    await navigator.clipboard.writeText(allContent);
    setCopiedTab("all");
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleDownload = (type: string) => {
    const docType = documentTypes.find((d) => d.id === type);
    const blob = new Blob([outputs[type]], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${docType?.fullLabel || type}_${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatContent = (text: string) => {
    // Split by lines for better formatting
    const lines = text.split("\n");
    
    return lines.map((line, lineIndex) => {
      // Check for section headers
      if (line.startsWith("## 📊") || line.startsWith("## 블록") || line.startsWith("## 메타") || line.startsWith("## 배너") || line.startsWith("## 네이버") || line.startsWith("## 숏폼") || line.startsWith("## 첫") || line.startsWith("## 팔로업") || line.startsWith("## 문의") || line.startsWith("## FAQ") || line.startsWith("## 🛡️")) {
        return (
          <div key={lineIndex} className="flex items-center gap-2 mt-6 mb-3 pb-2 border-b border-border">
            <BarChart3 className="w-4 h-4 text-accent" />
            <span className="font-semibold text-foreground">{line.replace(/^##\s*/, "").replace(/📊|🛡️/g, "").trim()}</span>
          </div>
        );
      }
      
      // Check for risk warnings
      if (line.startsWith("## ⚠️") || line.includes("⚠️")) {
        return (
          <div key={lineIndex} className="flex items-start gap-2 mt-6 mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <span className="text-amber-800 font-medium">{line.replace(/^##\s*/, "").replace("⚠️", "").trim()}</span>
          </div>
        );
      }
      
      // Check for warning content lines
      if (line.startsWith("- **사용 주의") || line.startsWith("- **대체 권장") || line.startsWith("- **피해야") || line.startsWith("- **권장 전송") || line.startsWith("- **심의 주의") || line.startsWith("- **스팸")) {
        return (
          <div key={lineIndex} className="text-amber-700 text-sm pl-6 py-1">
            {line}
          </div>
        );
      }
      
      // Horizontal rules
      if (line.trim() === "---") {
        return <hr key={lineIndex} className="my-4 border-border" />;
      }
      
      // Empty lines
      if (line.trim() === "") {
        return <div key={lineIndex} className="h-2" />;
      }
      
      // Process inline elements
      const parts = line.split(/(\[후기 #\d+(?::.*?)?\]|→\s*근거:|→\s*핵심 근거:)/g);
      
      return (
        <div key={lineIndex} className="py-0.5">
          {parts.map((part, partIndex) => {
            // Evidence citations
            if (part.match(/^\[후기 #\d+/)) {
              return (
                <Badge 
                  key={partIndex} 
                  variant="secondary" 
                  className="inline-flex items-center gap-1 bg-accent/15 text-accent border-accent/30 mx-1 font-normal"
                >
                  <Quote className="w-3 h-3" />
                  {part}
                </Badge>
              );
            }
            // Arrow indicators
            if (part.match(/^→\s*(근거|핵심 근거):/)) {
              return (
                <span key={partIndex} className="text-muted-foreground text-sm">
                  {part}
                </span>
              );
            }
            // Regular text - handle markdown-like formatting
            let formattedPart = part;
            
            // Bold text
            if (formattedPart.includes("**")) {
              const boldParts = formattedPart.split(/\*\*(.*?)\*\*/g);
              return boldParts.map((bp, bpIndex) => {
                if (bpIndex % 2 === 1) {
                  return <strong key={`${partIndex}-${bpIndex}`} className="font-semibold text-foreground">{bp}</strong>;
                }
                return <span key={`${partIndex}-${bpIndex}`}>{bp}</span>;
              });
            }
            
            return <span key={partIndex}>{formattedPart}</span>;
          })}
        </div>
      );
    });
  };

  const hasAnyOutput = Object.values(outputs).some((o) => o.length > 0);

  return (
    <Card className="overflow-hidden flex flex-col min-h-[600px] shadow-sm border border-border bg-card">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
        {/* Tabs Header */}
        <div className="border-b border-border px-4 pt-3 pb-0 flex items-center justify-between bg-muted/50">
          <TabsList className="bg-transparent h-auto p-0 gap-1">
            {documentTypes.map((type) => (
              <TabsTrigger
                key={type.id}
                value={type.id}
                className="data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm px-4 py-2 rounded-t-lg rounded-b-none text-sm border-b-2 border-transparent data-[state=active]:border-accent"
              >
                <type.icon className="w-4 h-4 mr-2" />
                {type.label}
                {outputs[type.id] && (
                  <div className="w-1.5 h-1.5 rounded-full bg-accent ml-2" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {hasAnyOutput && (
            <Button variant="outline" size="sm" onClick={handleCopyAll} className="rounded-full text-xs">
              {copiedTab === "all" ? (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  복사됨
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 mr-1" />
                  전체 복사
                </>
              )}
            </Button>
          )}
        </div>

        {/* Tab Content */}
        {documentTypes.map((type) => (
          <TabsContent key={type.id} value={type.id} className="flex-1 m-0 data-[state=inactive]:hidden">
            {outputs[type.id] ? (
              <div className="flex flex-col h-full">
                {/* Actions */}
                <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-normal">
                      {type.fullLabel}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      채널별 규격 적용됨
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(type.id)} className="h-7 text-xs">
                      {copiedTab === type.id ? (
                        <>
                          <Check className="w-3 h-3 mr-1" />
                          복사됨
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          복사
                        </>
                      )}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDownload(type.id)} className="h-7 text-xs">
                      <Download className="w-3 h-3 mr-1" />
                      저장
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <ScrollArea className="flex-1 px-5 py-4">
                  <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
                    {formatContent(outputs[type.id])}
                    {isGenerating && generatingType === type.id && (
                      <span className="inline-block w-1.5 h-5 bg-accent rounded-sm animate-pulse ml-1" />
                    )}
                  </div>
                </ScrollArea>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  {isGenerating && generatingType === type.id ? (
                    <Sparkles className="w-8 h-8 text-accent animate-pulse" />
                  ) : (
                    <type.icon className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <h4 className="text-foreground font-semibold mb-2">{type.fullLabel}</h4>
                <p className="text-muted-foreground text-sm max-w-[250px]">
                  {isGenerating && generatingType === type.id 
                    ? "AI가 후기를 분석하고 있습니다..."
                    : "왼쪽에서 후기를 입력하고 생성 버튼을 눌러주세요"
                  }
                </p>
                {!isGenerating && (
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <Badge variant="outline" className="text-xs">근거 포함</Badge>
                    <Badge variant="outline" className="text-xs">채널 규격</Badge>
                    <Badge variant="outline" className="text-xs">리스크 체크</Badge>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}
