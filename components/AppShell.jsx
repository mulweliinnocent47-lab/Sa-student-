import Link from "next/link";
import { BookOpen, FileText, MessageSquareText, Settings, Sparkles } from "lucide-react";

const NAV = [
  { href: "/", label: "Dashboard", icon: Sparkles },
  { href: "/papers", label: "Papers", icon: FileText },
  { href: "/notes", label: "Notes", icon: BookOpen },
  { href: "/practice", label: "Practice AI", icon: MessageSquareText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-hero text-primary-foreground shadow-soft">
              <Sparkles className="size-4" />
            </span>
            <span className="text-base font-bold tracking-tight">SA Student</span>
          </Link>
          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <Icon className="size-4" />{label}
              </Link>
            ))}
          </nav>
          <span className="ml-auto rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground md:ml-3">
            Free plan
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 md:pb-16">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur md:hidden">
        <div className="grid grid-cols-5">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground">
              <Icon className="size-5" />{label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
