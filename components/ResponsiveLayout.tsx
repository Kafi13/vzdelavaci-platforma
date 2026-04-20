"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import SidebarNav from "@/components/SidebarNav";
import LogoutButton from "@/components/LogoutButton";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ResponsiveLayout({
  children,
  userEmail,
  isAdmin,
}: {
  children: React.ReactNode;
  userEmail?: string;
  isAdmin: boolean;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const isAuthPage =
    pathname.startsWith('/login') ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/update-password');

  if (isAuthPage) {
    return <div className="min-h-screen bg-slate-950">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-md p-2 text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Otevřít menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <Link href="/" className="ml-4 font-semibold tracking-wide text-slate-900">Studijní Portál</Link>
      </header>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800 bg-slate-950 px-6 py-8 text-slate-100 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-10 shrink-0">
          <Link href="/" className="block hover:opacity-80 transition-opacity">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Platforma</p>
            <p className="mt-2 text-lg font-semibold tracking-wide">Studijní Portál</p>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden transition-colors"
            aria-label="Zavřít menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto pr-1 custom-scrollbar">
          <SidebarNav isAdmin={isAdmin} />
        </div>
        <div className="mt-6 shrink-0 pt-6">
          {userEmail ? (
            <div className="border-t border-slate-800 pt-4">
              <p className="text-xs text-slate-400 truncate px-3">Přihlášen jako:</p>
              <p className="text-sm font-medium text-slate-200 truncate px-3 mb-2">{userEmail}</p>
              <LogoutButton />
            </div>
          ) : (
            <div className="text-xs text-slate-500 px-3">
              Aktualizace obsahu v režimu editace.
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-h-screen px-4 pt-20 pb-12 sm:px-10 lg:ml-64 lg:pt-12 transition-all duration-300">
        <div className="mx-auto w-full max-w-5xl">
          {children}
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
}
