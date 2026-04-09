"use client";

import { MobileMenuButton } from "./sidebar";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onMobileMenuOpen?: () => void;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  onMobileMenuOpen 
}: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4 mb-6">
      <div className="flex-1">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-slate-300 mt-1">{subtitle}</p>}
      </div>
      {onMobileMenuOpen && <MobileMenuButton onOpen={onMobileMenuOpen} />}
    </header>
  );
}
