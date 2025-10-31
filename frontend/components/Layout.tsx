import Link from "next/link";
import { ReactNode } from "react";

type LayoutProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/simulator", label: "What-If Simulator" },
  { href: "/learn", label: "Learn" },
  { href: "/community", label: "Community" }
];

export const Layout = ({ title = "MoSave", description, children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-[-240px] h-[520px] rounded-[50%] bg-[radial-gradient(circle_farthest-corner_at_10%_20%,rgba(49,76,255,0.25),transparent_65%)] blur-[90px]" />
      <div className="pointer-events-none absolute inset-x-[-30%] bottom-[-280px] h-[520px] rounded-[60%] bg-[radial-gradient(circle_farthest-corner_at_70%_70%,rgba(255,140,26,0.18),transparent_70%)] blur-[120px]" />
      <header className="sticky top-0 z-20 border-b border-white/40 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-400 text-base font-semibold text-white shadow-lg shadow-primary-500/40">
              Mo
            </span>
            <span className="text-xl font-semibold text-slate-900">MoSave</span>
          </Link>
          <nav className="hidden rounded-full border border-white/60 bg-white/50 px-4 py-2 text-sm font-medium text-slate-600 shadow-lg shadow-slate-200/40 md:flex md:items-center md:gap-5">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-primary-600">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/dashboard"
            className="hidden rounded-full bg-gradient-to-r from-primary-500 via-primary-500 to-primary-400 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-500/40 transition hover:shadow-xl hover:shadow-primary-500/30 md:inline-flex"
          >
            Launch App
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-500 shadow"
            aria-label="Open navigation"
          >
            ☰
          </button>
        </div>
      </header>
      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pb-16 pt-12 md:pt-16">
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary-100 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-primary-500 shadow-sm">
            Guided by AI • Built for independence
          </div>
          <h1 className="text-3xl font-bold text-slate-900 md:text-5xl">{title}</h1>
          {description ? <p className="max-w-2xl text-base text-slate-600 md:text-lg">{description}</p> : null}
        </div>
        {children}
      </main>
      <footer className="relative z-10 border-t border-white/40 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} MoSave. Empowering financial independence.</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-primary-600">
              About
            </Link>
            <Link href="/community" className="hover:text-primary-600">
              Community
            </Link>
            <Link href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary-600">
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
