import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Hudanalys
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/#hur-det-fungerar"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Hur det fungerar
          </Link>
          <Link
            href="/analysera"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Analysera
          </Link>
        </nav>
      </div>
    </header>
  );
}
