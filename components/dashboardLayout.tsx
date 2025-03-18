"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { Button } from "@/components/ui/button";
import { ClipboardList, LogOut, Menu, UserCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { navigation } from "@/constant/nav";
import { UserRole } from "@/constant/root";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const isManager = user?.role === UserRole.MANAGER;

  const filteredNavigation = navigation.filter((item) => {
    if (isManager && item.hideForManager) return false;
    if (!isManager && item.showForManagerOnly) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-background p-6 md:flex">
        <div className="flex items-center gap-2 py-3">
          <ClipboardList className="h-6 w-6" />
          <h2 className="text-xl font-bold">Bug Tracker</h2>
        </div>

        <Separator className="my-4" />

        <nav className="flex-1 space-y-2">
          {filteredNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="space-y-4">
          <Separator />
          <div className="flex items-center gap-3 py-2">
            <UserCircle className="h-8 w-8" />
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {user?.role}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="fixed top-0 bottom-0 right-0 z-10 md:hidden">
        <div className=" ">
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="p-0" size="icon">
                <Menu className="h-5 w-5`" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-64 flex-col p-0">
              <nav className="flex-1 space-y-2 p-6">
                {filteredNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="space-y-4 p-6">
                <Separator />
                <div className="flex items-center gap-3 py-2">
                  <UserCircle className="h-8 w-8" />
                  <div>
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {user?.role}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="min-h-screen overflow-y-auto p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
