"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusStatistics } from "@/components/status-statistics";
import { statusStatisticsData } from "@/data/status-statistics";
import { BarChart4, TruckIcon, Users, ShoppingCart, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-6">
        <h1 className="text-3xl font-bold mb-6">Отчеты</h1>

        <Tabs defaultValue="status" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto w-full">
            <TabsTrigger value="logistics" className="flex items-center gap-2 py-3">
              <TruckIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Логистика</span>
            </TabsTrigger>
            <TabsTrigger value="profitability" className="flex items-center gap-2 py-3">
              <BarChart4 className="h-4 w-4" />
              <span className="hidden sm:inline">Прибыльность по категориям</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2 py-3">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Активность пользователей</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2 py-3">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Статистика по товарам</span>
            </TabsTrigger>
            <TabsTrigger value="status" className="flex items-center gap-2 py-3">
              <PieChart className="h-4 w-4" />
              <span className="hidden sm:inline">Статистика по статусам</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="logistics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Логистика</CardTitle>
                <CardDescription>Отчеты по логистике и доставке.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-80">
                  <p className="text-muted-foreground text-center">
                    Информация по логистике будет отображаться здесь.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profitability" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Прибыльность по категориям</CardTitle>
                <CardDescription>Анализ прибыльности по различным категориям.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-80">
                  <p className="text-muted-foreground text-center">
                    Информация по прибыльности категорий будет отображаться здесь.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Активность пользователей</CardTitle>
                <CardDescription>Статистика активности пользователей в системе.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-80">
                  <p className="text-muted-foreground text-center">
                    Информация по активности пользователей будет отображаться здесь.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Статистика по товарам</CardTitle>
                <CardDescription>Данные о популярности и продажах товаров.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-80">
                  <p className="text-muted-foreground text-center">
                    Информация по статистике товаров будет отображаться здесь.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="status" className="space-y-4">
            <StatusStatistics data={statusStatisticsData} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
