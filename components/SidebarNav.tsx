"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
  { href: "/uvod", label: "Uvod" },
  { href: "/gen-ai", label: "Gen AI" },
  { href: "/ml", label: "ML" },
  {
    href: "/quantum",
    label: "Quantum",
    subItems: [
      {
        href: "/quantum",
        label: "Vzdělávací sekce",
        subItems: [
          { href: "/quantum-1", label: "1. Úvod do kvantových technologií" },
          { href: "/quantum-2", label: "2. Kvantové materiály" },
          { href: "/quantum-3", label: "3. Kvantová senzorika a metrologie" },
          { href: "/quantum-4", label: "4. Komunikace a bezpečnost" },
          { href: "/quantum-5", label: "5. Kvantové výpočty a simulace" },
          { href: "/quantum-6", label: "6. Kvantové strojové učení (QML)" },
        ],
      },
      { href: "/quantum-practice", label: "Procvičování" },
      { href: "/test", label: "Závěrečná zkouška" },
    ],
  },
];

export default function SidebarNav({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const items = isAdmin
    ? [...navItems, { href: "/admin/results", label: "Administrace" }]
    : navItems;

  const isItemActive = (item: NavItem): boolean =>
    pathname === item.href || item.subItems?.some((subItem) => isItemActive(subItem)) || false;

  const renderItem = (item: NavItem, depth = 0) => {
    const isActive = pathname === item.href;
    const hasActiveSub = item.subItems?.some((subItem) => isItemActive(subItem)) || false;
    const showSubs = Boolean(item.subItems && (isActive || hasActiveSub));
    const itemClasses =
      depth === 0
        ? isActive || hasActiveSub
          ? "bg-indigo-600 text-white font-medium"
          : "text-slate-200 hover:bg-slate-800 hover:text-white"
        : isActive || hasActiveSub
          ? "bg-indigo-500/20 text-indigo-300 font-medium"
          : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200";
    const childWrapperClasses =
      depth === 0
        ? "mt-1 ml-4 flex flex-col space-y-0.5 border-l border-slate-700 pl-3"
        : "mt-1 ml-3 flex flex-col space-y-0.5 border-l border-slate-800 pl-3";
    const childItemClasses =
      depth === 0
        ? isActive
          ? `${itemClasses} border-l-2 border-indigo-400 -ml-[13px] pl-[11px]`
          : itemClasses
        : itemClasses;

    return (
      <div key={`${depth}-${item.href}`}>
        <Link
          href={item.href}
          className={`flex items-center justify-between rounded-md px-3 py-2 transition ${childItemClasses}`}
        >
          <span>{item.label}</span>
          {item.subItems && (
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${showSubs ? "rotate-0" : "-rotate-90"}`}
            />
          )}
        </Link>

        {showSubs && item.subItems && (
          <div className={childWrapperClasses}>
            {item.subItems.map((subItem) => renderItem(subItem, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="space-y-1 text-sm">
      {items.map((item) => renderItem(item))}
    </nav>
  );
}
