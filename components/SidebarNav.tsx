"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  subItems?: { href: string; label: string }[];
}

const navItems: NavItem[] = [
  { href: "/uvod", label: "Uvod" },
  { href: "/gen-ai", label: "Gen AI" },
  { href: "/ml", label: "ML" },
  {
    href: "/quantum",
    label: "Quantum",
    subItems: [
      { href: "/quantum-1", label: "1. Základní koncepty" },
      { href: "/quantum-2", label: "2. Hardware a materiály" },
      { href: "/quantum-3", label: "3. Senzorika a metrologie" },
      { href: "/quantum-4", label: "4. Komunikace a bezpečnost" },
      { href: "/quantum-5", label: "5. Výpočty a simulace" },
      { href: "/quantum-6", label: "6. Strojové učení (QML)" },
    ],
  },
  { href: "/quantum-practice", label: "🧠 Procvičování (všechny otázky)" },
  { href: "/test", label: "🎯 Závěrečná zkouška" },
];

export default function SidebarNav({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const items = isAdmin
    ? [...navItems, { href: "/admin/results", label: "Administrace" }]
    : navItems;

  const isQuantumSection = pathname?.startsWith("/quantum");

  return (
    <nav className="space-y-1 text-sm">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const hasActiveSub = item.subItems?.some((s) => pathname === s.href);
        const showSubs = item.subItems && (isActive || hasActiveSub || (item.href === "/quantum" && isQuantumSection));

        return (
          <div key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center justify-between rounded-md px-3 py-2 transition
                ${isActive || hasActiveSub
                  ? "bg-indigo-600 text-white font-medium"
                  : "text-slate-200 hover:bg-slate-800 hover:text-white"
                }`}
            >
              <span>{item.label}</span>
              {item.subItems && (
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${showSubs ? "rotate-0" : "-rotate-90"}`}
                />
              )}
            </Link>

            {showSubs && item.subItems && (
              <div className="mt-1 flex flex-col space-y-0.5 border-l border-slate-700 ml-4 pl-3">
                {item.subItems.map((subItem) => {
                  const isSubActive = pathname === subItem.href;
                  return (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={`block rounded-md px-2 py-1.5 text-xs transition
                        ${isSubActive
                          ? "bg-indigo-500/20 text-indigo-300 font-medium border-l-2 border-indigo-400 -ml-[13px] pl-[11px]"
                          : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                        }`}
                    >
                      {subItem.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
