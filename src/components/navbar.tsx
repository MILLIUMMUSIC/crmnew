"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Settings, User, Menu, Search } from "lucide-react";

interface NavbarProps {
  user?: {
    name: string;
    company?: string;
  };
}

export function Navbar({ user }: NavbarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Check if we are in mobile mode from localStorage or viewport
  useEffect(() => {
    const checkMobileMode = () => {
      const displayMode = localStorage.getItem("displayMode");
      const isMobileViewport = window.innerWidth < 640;
      setIsMobile(displayMode === "mobile" || isMobileViewport);
    };

    checkMobileMode();
    window.addEventListener("resize", checkMobileMode);

    // Listen for changes in display mode
    const handleStorageChange = () => {
      checkMobileMode();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("resize", checkMobileMode);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur elevation-1">
      <div className="container-fluid flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden border-primary/30 hover:bg-primary/10">
                <Menu className="h-5 w-5 text-primary" />
                <span className="sr-only">Открыть меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-4 py-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold text-primary"
                >
                  Главная
                </Link>
                <Link
                  href="/tenders"
                  className="flex items-center gap-2 text-lg font-semibold text-primary"
                >
                  Тендеры
                </Link>
                <Link
                  href="/tender-search"
                  className="flex items-center gap-2 text-lg font-semibold text-primary"
                >
                  Поиск тендеров
                </Link>
                <Link
                  href="/tasks"
                  className="flex items-center gap-2 text-lg font-semibold text-primary"
                >
                  Задачи
                </Link>
                <Link
                  href="/reports"
                  className="flex items-center gap-2 text-lg font-semibold text-primary"
                >
                  Отчеты
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 text-lg font-semibold text-primary"
                >
                  Настройки
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M8.5 12a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
              <path d="M8.5 17a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
              <path d="M10 12h6" />
              <path d="M10 17h6" />
            </svg>
            <span className="font-bold text-primary hidden sm:inline">CRMTORGI</span>
          </Link>
          <nav className="hidden lg:flex lg:gap-4 xl:gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Главная
            </Link>
            <Link
              href="/tenders"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Тендеры
            </Link>
            <Link
              href="/tender-search"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Поиск тендеров
            </Link>
            <Link
              href="/tasks"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Задачи
            </Link>
            <Link
              href="/reports"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Отчеты
            </Link>
            <Link
              href="/settings"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Настройки
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile Search Button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden border-primary/30 hover:bg-primary/10"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5 text-primary" />
            <span className="sr-only">Поиск</span>
          </Button>

          {/* Desktop Search */}
          <div className={`${isSearchOpen ? 'flex absolute left-0 top-full w-full p-2 bg-background z-50 border-b elevation-1' : 'hidden'} md:static md:flex md:bg-transparent md:border-0 md:p-0 md:w-auto md:shadow-none`}>
            <Input
              type="search"
              placeholder="Поиск..."
              className="h-9 w-full md:w-[250px] lg:w-[300px] border-primary/30 focus-visible:ring-primary"
            />
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Settings Link - Hide on Mobile */}
          {!isMobile && (
            <Link href="/settings">
              <Button variant="outline" size="icon" className="relative h-9 w-9 border-primary/30 hover:bg-primary/10 hidden md:flex">
                <Settings className="h-5 w-5 text-primary" />
                <span className="sr-only">Настройки</span>
              </Button>
            </Link>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative h-9 w-9 border-primary/30 hover:bg-primary/10">
                {user ? (
                  <span className="flex h-full w-full items-center justify-center font-semibold bg-primary text-primary-foreground rounded-full">
                    {user.name.charAt(0)}
                  </span>
                ) : (
                  <User className="h-5 w-5 text-primary" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="elevation-1">
              {user ? (
                <>
                  <div className="px-2 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-sm">
                    <div className="text-sm font-medium text-primary">{user.name}</div>
                    {user.company && (
                      <div className="text-xs text-muted-foreground">
                        {user.company}
                      </div>
                    )}
                  </div>
                  <DropdownMenuItem asChild className="hover:bg-primary/5 focus:bg-primary/10">
                    <Link href="/settings">Настройки</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-primary/5 focus:bg-primary/10">Выйти</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem className="hover:bg-primary/5 focus:bg-primary/10">Войти</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-primary/5 focus:bg-primary/10">Регистрация</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
