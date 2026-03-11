import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-10 px-4 border-t border-border bg-muted/20">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-chart-2 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-accent-foreground" />
            </div>
            <span className="font-bold text-foreground">리뷰투카피</span>
          </div>

          <nav className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              이용약관
            </Link>
          </nav>

          <p className="text-sm text-muted-foreground">
            2024 리뷰투카피
          </p>
        </div>
      </div>
    </footer>
  );
}
