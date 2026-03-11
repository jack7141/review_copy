"use client";

import { Quote, TrendingUp, Star, ShieldCheck, AlertTriangle, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EvidenceMapProps {
    content: string;
    isGenerating: boolean;
}

// Parse sections from plain text output
function parseSections(text: string) {
    const sections: Record<string, string> = {};

    // Split by ## headers
    const parts = text.split(/\n(?=## )/);
    for (const part of parts) {
        const firstLine = part.split("\n")[0].trim();
        if (firstLine.includes("반복 포인트") || firstLine.includes("TOP5") && firstLine.includes("반복")) {
            sections.recurring = part;
        } else if (firstLine.includes("베스트 문장") || firstLine.includes("TOP10")) {
            sections.best = part;
        } else if (firstLine.includes("반박") || firstLine.includes("Objection")) {
            sections.objection = part;
        } else if (firstLine.includes("리스크") || firstLine.includes("주의")) {
            sections.risk = part;
        }
    }
    return sections;
}

// Render recurring points section
function RecurringPoints({ content }: { content: string }) {
    const lines = content.split("\n").filter(Boolean);
    const points: Array<{ title: string; count: string; quotes: string[] }> = [];
    let current: { title: string; count: string; quotes: string[] } | null = null;

    for (const line of lines) {
        if (line.match(/^\*\*\d+\./)) {
            if (current) points.push(current);
            const titleMatch = line.match(/^\*\*\d+\.\s+(.+?)\*\*(?:\s*—\s*언급 횟수:\s*(.+))?/);
            current = {
                title: titleMatch?.[1] || line.replace(/\*\*/g, "").replace(/^\d+\.\s*/, ""),
                count: titleMatch?.[2] || "",
                quotes: [],
            };
        } else if (line.startsWith("→") && current) {
            const quote = line.replace(/^→\s*"?/, "").replace(/"?\s*\[.*?\]$/, "").trim();
            if (quote) current.quotes.push(quote);
        }
    }
    if (current) points.push(current);

    if (points.length === 0) {
        // Fallback: render raw
        return (
            <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {content}
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {points.map((point, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold shrink-0">
                            {i + 1}
                        </div>
                        <span className="font-semibold text-foreground text-sm">{point.title}</span>
                        {point.count && (
                            <Badge variant="secondary" className="rounded-full text-xs ml-auto">
                                {point.count}
                            </Badge>
                        )}
                    </div>
                    {point.quotes.length > 0 && (
                        <div className="space-y-2 pl-8">
                            {point.quotes.map((q, j) => (
                                <div key={j} className="flex items-start gap-2 bg-accent/5 rounded-lg px-3 py-2">
                                    <Quote className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                                    <span className="text-sm text-accent/90 italic">{q}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

// Render best sentences section
function BestSentences({ content }: { content: string }) {
    const lines = content.split("\n").filter(Boolean);
    const sentences: Array<{ text: string; ref: string }> = [];

    for (const line of lines) {
        if (line.match(/^\d+\./)) {
            const match = line.match(/^\d+\.\s+"?(.+?)"?\s+—\s+(후기.+)/);
            if (match) {
                sentences.push({ text: match[1], ref: match[2] });
            } else {
                const text = line.replace(/^\d+\.\s*/, "").replace(/^"/, "").replace(/"$/, "").trim();
                if (text.length > 3) sentences.push({ text, ref: "" });
            }
        }
    }

    if (sentences.length === 0) {
        return <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{content}</div>;
    }

    return (
        <div className="space-y-2">
            {sentences.map((s, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-3 hover:border-accent/40 transition-colors">
                    <Star className="w-4 h-4 text-chart-4 fill-chart-4 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground font-medium italic">"{s.text}"</p>
                        {s.ref && (
                            <p className="text-xs text-muted-foreground mt-1">{s.ref}</p>
                        )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5 opacity-0 group-hover:opacity-100" />
                </div>
            ))}
        </div>
    );
}

// Render objection section
function ObjectionHandling({ content }: { content: string }) {
    const lines = content.split("\n").filter(Boolean);
    const objections: Array<{ q: string; a: string }> = [];
    let current: { q: string; a: string } | null = null;

    for (const line of lines) {
        if (line.startsWith("**반박")) {
            if (current) objections.push(current);
            const q = line.replace(/^\*\*반박\s*\d*:\s*"?/, "").replace(/"?\*\*$/, "").trim();
            current = { q, a: "" };
        } else if (line.startsWith("→ 대응:") && current) {
            current.a = line.replace(/^→ 대응:\s*/, "").trim();
        }
    }
    if (current) objections.push(current);

    if (objections.length === 0) {
        return <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{content}</div>;
    }

    return (
        <div className="space-y-3">
            {objections.map((obj, i) => (
                <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="bg-muted/50 px-4 py-2.5 flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-chart-2 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-foreground">"{obj.q}"</span>
                    </div>
                    {obj.a && (
                        <div className="px-4 py-3 flex items-start gap-2">
                            <Quote className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                            <span className="text-sm text-accent/90 italic">{obj.a}</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

// Risk banner (shown at top)
function RiskBanner({ content }: { content: string }) {
    const lines = content.split("\n").filter((l) => l.startsWith("- **"));
    if (lines.length === 0) return null;

    return (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 mb-4">
            <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-semibold text-amber-800">사용 전 확인이 필요한 표현</span>
            </div>
            <div className="space-y-1.5 pl-6">
                {lines.map((line, i) => {
                    const match = line.match(/- \*\*(.+?)\*\*(?:.*→\s*\*\*권장 대체\*\*:\s*(.+))?/);
                    return (
                        <div key={i} className="text-xs text-amber-700">
                            {match ? (
                                <>
                                    <span className="font-medium">"{match[1]}"</span>
                                    {match[2] && <span className="text-amber-600"> → {match[2]}</span>}
                                </>
                            ) : (
                                line.replace(/- \*\*/g, "").replace(/\*\*/g, "")
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export function EvidenceMap({ content, isGenerating }: EvidenceMapProps) {
    if (!content && !isGenerating) return null;

    if (!content && isGenerating) {
        return (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent animate-pulse" />
                </div>
                <p className="text-sm text-muted-foreground">후기에서 증거를 추출하고 있습니다...</p>
            </div>
        );
    }

    const sections = parseSections(content);

    return (
        <div className="space-y-6 px-5 py-4">
            {/* Risk Banner — always at top */}
            {sections.risk && <RiskBanner content={sections.risk} />}

            {/* Recurring Points */}
            {sections.recurring && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-accent" />
                        <h3 className="font-semibold text-foreground text-sm">반복 포인트 TOP5</h3>
                    </div>
                    <RecurringPoints content={sections.recurring} />
                </div>
            )}

            {/* Best Sentences */}
            {sections.best && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 text-chart-4" />
                        <h3 className="font-semibold text-foreground text-sm">즉시 쓸 수 있는 베스트 문장 TOP10</h3>
                    </div>
                    <BestSentences content={sections.best} />
                </div>
            )}

            {/* Objection Handling */}
            {sections.objection && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <ShieldCheck className="w-4 h-4 text-chart-2" />
                        <h3 className="font-semibold text-foreground text-sm">예상 반박 & 대응 TOP5</h3>
                    </div>
                    <ObjectionHandling content={sections.objection} />
                </div>
            )}

            {/* Fallback: raw content if parsing failed */}
            {!sections.recurring && !sections.best && !sections.objection && (
                <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                    {content}
                    {isGenerating && <span className="inline-block w-1.5 h-5 bg-accent rounded-sm animate-pulse ml-1" />}
                </div>
            )}

            {isGenerating && content && (
                <span className="inline-block w-1.5 h-5 bg-accent rounded-sm animate-pulse ml-1" />
            )}
        </div>
    );
}
