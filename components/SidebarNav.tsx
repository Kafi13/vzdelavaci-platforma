"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
  { href: "/uvod", label: "Uvod" },
  {
    href: "/gen-ai",
    label: "Gen AI",
    subItems: [
      {
        href: "/gen-ai",
        label: "Vzdělávací sekce",
        subItems: [
          { href: "/gen-ai-1", label: "1. Jak správně promptovat" },
          { href: "/gen-ai-2", label: "2. AI Act" },
        ],
      },
    ],
  },
  {
    href: "/ml",
    label: "ML",
    subItems: [
      {
        href: "/ml",
        label: "Vzdělávací sekce",
        subItems: [
          { href: "/ml-1", label: "1. AI revoluce v materiálovém inženýrství" },
          { href: "/ml-2", label: "2. Data a featurizace" },
          { href: "/ml-3", label: "3. Příprava dat pro AI v materiálech" },
          { href: "/ml-4", label: "4. Trénink a validace modelů" },
          { href: "/ml-5", label: "5. Základní modely a explorace dat" },
          { href: "/ml-6", label: "6. Ansámblové metody a XAI" },
          { href: "/ml-7", label: "7. Pokročilé techniky a nasazení klasického ML" },
          { href: "/ml-8", label: "8. Úvod do neuronových sítí a hlubokého učení" },
          { href: "/ml-9", label: "9. Konvoluční sítě a augmentace dat" },
          { href: "/ml-10", label: "10. GNN pro materiálové simulace a MLIPs" },
          { href: "/ml-11", label: "11. Sekvenční data, RNN a Transformery" },
          { href: "/ml-12", label: "12. PINNs a kvantifikace nejistoty" },
          { href: "/ml-13", label: "13. Inverzní návrh a generativní AI" },
        ],
      },
    ],
  },
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
          { href: "/quantum-6", label: "6. Kvantové a hybridní algoritmy" },
          { href: "/quantum-7", label: "7. Kvantové strojové učení (QML)" },
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
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const isItemActive = (item: NavItem): boolean =>
    pathname === item.href || item.subItems?.some((subItem) => isItemActive(subItem)) || false;

  useEffect(() => {
    const nextExpanded: Record<string, boolean> = {};

    const collectExpanded = (item: NavItem) => {
      if (item.subItems && isItemActive(item)) {
        nextExpanded[item.href] = true;
      }

      item.subItems?.forEach(collectExpanded);
    };

    items.forEach(collectExpanded);
    setExpandedItems((current) => ({ ...nextExpanded, ...current }));
  }, [pathname, isAdmin]);

  const toggleExpanded = (href: string) => {
    setExpandedItems((current) => ({
      ...current,
      [href]: !current[href],
    }));
  };

  const renderItem = (item: NavItem, depth = 0) => {
    const isActive = pathname === item.href;
    const hasActiveSub = item.subItems?.some((subItem) => isItemActive(subItem)) || false;
    const showSubs = Boolean(item.subItems && expandedItems[item.href]);
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
        <div className="flex items-center gap-1">
          <Link
            href={item.href}
            className={`min-w-0 flex-1 rounded-md px-3 py-2 transition ${childItemClasses}`}
          >
            <span className="block truncate">{item.label}</span>
          </Link>

          {item.subItems && (
            <button
              type="button"
              onClick={() => toggleExpanded(item.href)}
              aria-label={showSubs ? `Sbalit ${item.label}` : `Rozbalit ${item.label}`}
              aria-expanded={showSubs}
              className={`shrink-0 rounded-md p-2 transition ${
                depth === 0
                  ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                  : "text-slate-500 hover:bg-slate-800/50 hover:text-slate-200"
              }`}
            >
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${showSubs ? "rotate-0" : "-rotate-90"}`}
              />
            </button>
          )}
        </div>

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
