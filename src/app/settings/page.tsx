"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone, Moon, Sun, Save } from "lucide-react";

export default function SettingsPage() {
  const [displayMode, setDisplayMode] = useState<"desktop" | "mobile">("desktop");
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedDisplayMode = localStorage.getItem("displayMode") as "desktop" | "mobile";
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system";

    if (savedDisplayMode) {
      setDisplayMode(savedDisplayMode);
      document.documentElement.setAttribute("data-display-mode", savedDisplayMode);
    }

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Handle display mode change
  const handleDisplayModeChange = (checked: boolean) => {
    const newMode = checked ? "mobile" : "desktop";
    setDisplayMode(newMode);
    localStorage.setItem("displayMode", newMode);
    document.documentElement.setAttribute("data-display-mode", newMode);

    // Add a class to the root element for responsive styling
    if (newMode === "mobile") {
      document.documentElement.classList.add("force-mobile");
    } else {
      document.documentElement.classList.remove("force-mobile");
    }
  };

  // Handle theme change
  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Apply theme directly
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.classList.toggle("dark", systemTheme === "dark");
    } else {
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  };

  // Handle save settings
  const handleSaveSettings = () => {
    toast.success("Настройки сохранены", {
      description: "Ваши настройки были успешно сохранены",
    });
  };

  return (
    <>
      <Navbar user={{ name: "User", company: "Company" }} />

      <main className="container-fluid py-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight mb-6 text-primary">Настройки</h1>

          <Tabs defaultValue="display" className="w-full">
            <TabsList className="mb-4 bg-primary/10 p-1">
              <TabsTrigger value="display" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Отображение
              </TabsTrigger>
              <TabsTrigger value="account" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Аккаунт
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Уведомления
              </TabsTrigger>
            </TabsList>

            <TabsContent value="display" className="space-y-4">
              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle>Настройки отображения</CardTitle>
                  <CardDescription>
                    Настройте внешний вид приложения и режим отображения
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-primary/10">
                          {displayMode === "desktop" ? (
                            <Monitor className="h-5 w-5 text-primary" />
                          ) : (
                            <Smartphone className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <Label htmlFor="display-mode" className="text-base">
                            Режим отображения
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {displayMode === "desktop"
                              ? "Настольный режим (полный интерфейс)"
                              : "Мобильный режим (адаптивный интерфейс)"}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="display-mode"
                        checked={displayMode === "mobile"}
                        onCheckedChange={handleDisplayModeChange}
                      />
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-base mb-2 block">Тема</Label>
                      <div className="flex space-x-2">
                        <Button
                          variant={theme === "light" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleThemeChange("light")}
                          className="flex items-center gap-2"
                        >
                          <Sun className="h-4 w-4" />
                          Светлая
                        </Button>
                        <Button
                          variant={theme === "dark" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleThemeChange("dark")}
                          className="flex items-center gap-2"
                        >
                          <Moon className="h-4 w-4" />
                          Темная
                        </Button>
                        <Button
                          variant={theme === "system" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleThemeChange("system")}
                          className="flex items-center gap-2"
                        >
                          <span className="relative">
                            <Sun className="h-4 w-4" />
                            <Moon className="h-4 w-4 absolute top-0 left-0 transform scale-0 dark:scale-100 transition-transform" />
                          </span>
                          Системная
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full sm:w-auto" onClick={handleSaveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Сохранить настройки
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle>Информация аккаунта</CardTitle>
                  <CardDescription>
                    Управление данными вашего аккаунта
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Эта функциональность будет доступна в следующих версиях приложения.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle>Настройки уведомлений</CardTitle>
                  <CardDescription>
                    Управление уведомлениями и оповещениями
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Эта функциональность будет доступна в следующих версиях приложения.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
