"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  Briefcase,
  Calendar,
  BookOpen,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  user?: { email?: string; full_name?: string };
  onSignOut?: () => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export function MobileMenuButton({ 
  onOpen 
}: { 
  onOpen: () => void 
}) {
  return (
    <button
      onClick={onOpen}
      className="lg:hidden rounded-lg bg-slate-800/80 p-2 hover:bg-slate-700 border border-slate-700"
    >
      <Menu className="h-6 w-6 text-white" />
    </button>
  );
}

export default function Sidebar({ user, onSignOut, isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [localMobileOpen, setLocalMobileOpen] = useState(false);
  
  // Use provided state or fall back to local state
  const mobileOpen = isMobileOpen !== undefined ? isMobileOpen : localMobileOpen;
  const setMobileOpen = setIsMobileOpen || setLocalMobileOpen;

  const menuItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Home",
    },
    {
      href: "/universities",
      label: "Universități",
      icon: GraduationCap,
      description: "Search & explore",
    },
    {
      href: "/activities",
      label: "Activități",
      icon: Briefcase,
      description: "CV opportunities",
    },
    {
      href: "/calendar",
      label: "Calendar",
      icon: Calendar,
      description: "Plan & organize",
    },
    {
      href: "/exercises",
      label: "Exerciții",
      icon: BookOpen,
      description: "Practice",
    },
    {
      href: "/mentoring",
      label: "Mentorat",
      icon: Users,
      description: "Connect",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:fixed lg:left-0 lg:top-0 lg:z-30 lg:flex lg:h-screen lg:flex-col lg:border-r lg:border-slate-700/50 lg:bg-slate-900/80 lg:backdrop-blur-xl lg:transition-all lg:duration-300 ${
          isCollapsed ? "lg:w-20" : "lg:w-64"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between border-b border-slate-700/50 px-6 py-4">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/puff_logo_gradient-removebg-preview.png"
                alt="PUF logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="font-bold text-white">PlanFuture</span>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="rounded-lg p-1.5 hover:bg-slate-800"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 text-slate-400" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-slate-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.label : ""}
                className={`group relative flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-sky-500/20 to-fuchsia-500/20 text-white shadow-lg shadow-sky-500/10"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{item.label}</p>
                    <p className="truncate text-xs opacity-75">{item.description}</p>
                  </div>
                )}
                {active && !isCollapsed && (
                  <div className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-l-lg bg-gradient-to-b from-sky-400 to-fuchsia-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-slate-700/50 px-3 py-4 space-y-2">
          {user && !isCollapsed && (
            <div className="rounded-lg bg-slate-800/50 px-4 py-3">
              <p className="truncate text-xs font-medium text-slate-300">
                {user.full_name || user.email || "User"}
              </p>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>
          )}
          {onSignOut && (
            <button
              onClick={onSignOut}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-slate-400 hover:bg-red-900/20 hover:text-red-300 transition-all"
              title={isCollapsed ? "Sign Out" : ""}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">Sign Out</span>}
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Menu Toggle (passed to header) */}

      {/* Mobile Drawer Modal */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Sidebar */}
          <aside className="fixed left-0 top-0 z-50 h-screen w-64 flex-col border-r border-slate-700/50 bg-slate-900/95 backdrop-blur-xl flex lg:hidden">
            {/* Header with Close Button */}
            <div className="flex items-center justify-between border-b border-slate-700/50 px-6 py-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/puff_logo_gradient-removebg-preview.png"
                  alt="PUF logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
                <span className="font-bold text-white">PlanFuture</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-1.5 hover:bg-slate-800"
              >
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group relative flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-sky-500/20 to-fuchsia-500/20 text-white shadow-lg shadow-sky-500/10"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{item.label}</p>
                      <p className="truncate text-xs opacity-75">{item.description}</p>
                    </div>
                    {active && (
                      <div className="h-6 w-1 rounded-l-lg bg-gradient-to-b from-sky-400 to-fuchsia-400" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* User Section */}
            <div className="border-t border-slate-700/50 px-3 py-4 space-y-2">
              {user && (
                <div className="rounded-lg bg-slate-800/50 px-4 py-3">
                  <p className="truncate text-xs font-medium text-slate-300">
                    {user.full_name || user.email || "User"}
                  </p>
                  <p className="truncate text-xs text-slate-500">{user.email}</p>
                </div>
              )}
              {onSignOut && (
                <button
                  onClick={onSignOut}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-slate-400 hover:bg-red-900/20 hover:text-red-300 transition-all"
                >
                  <LogOut className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              )}
            </div>
          </aside>
        </>
      )}

      {/* Safe spacer for mobile (no overlap) */}
      <div className="h-2 lg:hidden" />
    </>
  );
}
