"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-chart-2 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-accent-foreground" />
          </div>
          <span className="font-bold text-foreground text-lg">리뷰투카피</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link 
            href="#how-it-works" 
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            작동 방식
          </Link>
          <Link 
            href="#use-cases" 
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            사용 사례
          </Link>
          <Link 
            href="#pricing" 
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            요금제
          </Link>
        </nav>

        <Button asChild size="sm" className="rounded-full px-4 shadow-sm">
          <Link href="/app">
            시작하기
          </Link>
        </Button>
      </div>
    </header>
  );
}
