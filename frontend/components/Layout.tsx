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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/">
            <span className="flex items-center gap-3 text-2xl font-semibold text-primary-600">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">Mo</span>
              MoSave
            </span>
          </Link>
          <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-primary-600">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/dashboard"
            className="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-glow hover:bg-primary-600"
          >
            Launch App
          </Link>
        </div>
      </header>
      <main className="mx-auto flex max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{title}</h1>
          {description ? <p className="mt-3 max-w-2xl text-slate-600">{description}</p> : null}
        </div>
        {children}
      </main>
      <footer className="border-t border-slate-100 bg-white/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} MoSave. Empowering financial independence.</p>
          <div className="flex gap-4">
            <Link href="/about">About</Link>
            <Link href="/community">Community</Link>
            <Link href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
