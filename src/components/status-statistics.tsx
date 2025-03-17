"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusChart } from "@/components/status-chart";
import { StatusStatisticsData } from "@/types/report";
import { statusColors } from "@/data/status-statistics";

interface StatusStatisticsProps {
  data: StatusStatisticsData;
}

export function StatusStatistics({ data }: StatusStatisticsProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [selectedGroup, setSelectedGroup] = useState<string>(data.groups[0].title);

  // Format currency amounts
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'decimal',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Format percentages
  const formatPercentage = (percentage: number) => {
    return percentage.toFixed(2);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex justify-center">Статистика по статусам</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {/* Date Filter */}
          <div className="flex flex-wrap justify-between items-center gap-2 p-4 border rounded-md bg-muted/20">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Дата добавления:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[180px] flex justify-between items-center"
                  >
                    {selectedDate ? format(selectedDate, "dd.MM.yyyy") : "Выберите дату"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[180px] flex justify-between items-center"
                  >
                    {endDate ? format(endDate, "dd.MM.yyyy") : "Выберите дату"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <Select defaultValue="">
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Владелец" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все владельцы</SelectItem>
                  <SelectItem value="user1">Пользователь 1</SelectItem>
                  <SelectItem value="user2">Пользователь 2</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="">
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Организация" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все организации</SelectItem>
                  <SelectItem value="org1">Организация 1</SelectItem>
                  <SelectItem value="org2">Организация 2</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="">
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Тип тендера" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все типы</SelectItem>
                  <SelectItem value="type1">Тип 1</SelectItem>
                  <SelectItem value="type2">Тип 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="default">Применить</Button>
              <Button variant="outline">Очистить</Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            {/* Pie Chart */}
            <div className="flex-none w-full md:w-[300px] flex justify-center">
              {data.groups.map((group) => (
                <StatusChart
                  key={group.title}
                  group={group}
                  selectedGroup={selectedGroup}
                />
              ))}
            </div>

            {/* Status Tables */}
            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {data.groups.map((group) => (
                  <div key={group.title} className="space-y-2">
                    <div
                      className={cn(
                        "text-base font-medium p-2 rounded cursor-pointer hover:bg-muted/50 transition-colors",
                        selectedGroup === group.title ? "bg-muted" : ""
                      )}
                      onClick={() => setSelectedGroup(group.title)}
                    >
                      <div className="flex justify-between">
                        <span>{group.title}</span>
                        <span className="text-sm">Всего: {formatAmount(group.total.amount)} ₽</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Статус</span>
                        <div className="flex space-x-4">
                          <span className="text-right w-28">Сумма</span>
                          <span className="text-right w-8">%</span>
                          <span className="text-right w-8">К-во</span>
                          <span className="text-right w-8">%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {group.items.map((item) => (
                        <div key={item.status} className="flex justify-between py-1 text-sm hover:bg-muted/20 px-2 rounded">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-sm"
                              style={{ backgroundColor: statusColors[item.status] || '#ccc' }}
                            ></div>
                            <span>{item.status}</span>
                          </div>
                          <div className="flex space-x-4">
                            <span className="text-right w-28">{formatAmount(item.amount)} ₽</span>
                            <span className="text-right w-8">{formatPercentage(item.percentage)}%</span>
                            <span className="text-right w-8">{item.count}</span>
                            <span className="text-right w-8">{((item.count / group.total.count) * 100).toFixed(2)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
