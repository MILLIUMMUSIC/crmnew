"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Plus, X, Search, Eye, HelpCircle, Link, ArrowDown, ArrowUp, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

// Типы данных для тендеров
interface TenderItem {
  id: string;
  number: string;
  title: string;
  type: string;
  status: string;
  date: string;
  endDate: string;
  region: string;
  price: number;
  currency: string;
  organization: string;
  details?: string;
  customer?: string;
  specialist?: string;
  contactInfo?: string;
  nmck?: string;
  law?: string;
  platform?: string;
  link?: string;
  noticeNumber?: string;
  category?: string;
  implementationPlace?: string;
  conditions?: string;
}

// Тестовые данные для тендеров
const tenderItems: TenderItem[] = [
  {
    id: "1",
    number: "00123456789",
    title: "Выполнение работ по текущему ремонту и содержанию линий уличного освещения",
    type: "Запрос цен товаров, работ, услуг",
    status: "Подача заявок",
    date: "15.03.2025",
    endDate: "29.03.2025 10:00 МСК (14 дней)",
    region: "Москва Город",
    price: 512244.00,
    currency: "РУБ",
    organization: "МКОУ СОШ № 13 С. АПАНАСЕНКОВСКОЕ",
    customer: "ГЛАВНАЯ ВОЕННАЯ ПРОКУРАТУРА (7704128867/770401001)",
    specialist: "специалист отдела Рябочкин П.А.",
    contactInfo: "Рябочкин П.А.7-495-6936032ic@gvp.rsnet.ru",
    law: "ФЗ 44",
    platform: "zakupki.gov.ru",
    link: "zakupki.gov.ru",
    noticeNumber: "01731000176250000005",
    category: "Оргтехника"
  },
  // ... existing code ... <keep other tenders>
];

export default function TenderSearchClient() {
  const [selectedTender, setSelectedTender] = useState<TenderItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Текущие");

  // Функция форматирования цены (мемоизирована)
  const formatPrice = useCallback((price: number) => {
    return price.toLocaleString('ru-RU');
  }, []);

  // Фильтрация тендеров на основе поискового запроса
  const filteredTenders = useMemo(() => {
    return tenderItems.filter(tender => {
      if (searchTerm && !tender.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !tender.number.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      if (filterStatus !== "Текущие" && tender.status !== filterStatus) {
        return false;
      }

      return true;
    });
  }, [searchTerm, filterStatus]);

  // Обработчик для изменения поискового запроса
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Обработчик для открытия просмотра деталей тендера
  const handleViewTender = useCallback((tender: TenderItem) => {
    setSelectedTender(tender);
  }, []);

  // Компонент таблицы тендеров (отдельно для улучшения производительности)
  const TenderTable = useCallback(() => (
    <Table className="w-full border-collapse">
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead className="text-sm font-semibold w-[16rem]">Закупка</TableHead>
          <TableHead className="text-sm font-semibold text-right">Регион</TableHead>
          <TableHead className="text-sm font-semibold text-right w-[8rem]">Цена</TableHead>
          <TableHead className="text-sm font-semibold w-[3rem]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTenders.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-4">
              Нет тендеров, соответствующих выбранным фильтрам
            </TableCell>
          </TableRow>
        ) : (
          filteredTenders.map((tender) => (
            <TableRow
              key={tender.id}
              className="group hover:bg-muted/50 border-t border-border"
            >
              <TableCell className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1 rounded text-[10px]">
                        {tender.type}
                      </span>
                      <span>{tender.date}</span>
                      <span>{tender.number}</span>
                    </div>
                    <div
                      className="font-medium text-sm hover:text-primary cursor-pointer mb-1"
                      onClick={() => handleViewTender(tender)}
                    >
                      {tender.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {tender.endDate}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right p-3">
                <div className="text-sm">{tender.region}</div>
              </TableCell>
              <TableCell className="text-right p-3">
                <div className="font-semibold text-sm">
                  {formatPrice(tender.price)} {tender.currency}
                </div>
              </TableCell>
              <TableCell className="p-3">
                <div className="flex justify-end items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewTender(tender)}
                    title="Просмотр деталей"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  ), [filteredTenders, formatPrice, handleViewTender]);

  return (
    <>
      <Navbar user={{ name: "User", company: "Company" }} />

      <main className="container-fluid py-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center mb-4 bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg elevation-1">
            <h1 className="text-3xl font-bold tracking-tight text-primary">Поиск тендеров</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Левая колонка с фильтрами */}
            <div className="bg-card p-4 rounded-lg border border-border elevation-1 lg:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Фильтр поиска новых закупок</h2>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <HelpCircle className="h-5 w-5 text-primary/70" />
                </Button>
              </div>

              {/* Секция поиска по ключевым словам */}
              <div className="mb-4">
                <div className="text-sm mb-2">Ключевые слова</div>
                <Input
                  placeholder="Введите ключевые слова"
                  className="w-full border-input"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              {/* Секция исключения */}
              <div className="mb-4">
                <div className="text-sm mb-2">Исключить</div>
                <Input placeholder="Слова для исключения" className="w-full border-input" />
              </div>

              {/* Секция выбора этапа */}
              <div className="mb-4">
                <div className="text-sm mb-2">Этап</div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите этап" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все этапы</SelectItem>
                    <SelectItem value="active">Активные</SelectItem>
                    <SelectItem value="completed">Завершенные</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Секция выбора статуса */}
              <div className="mb-4">
                <div className="text-sm mb-2">Статус</div>
                <Select defaultValue={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Текущие">Текущие</SelectItem>
                    <SelectItem value="Завершенные">Завершенные</SelectItem>
                    <SelectItem value="Отмененные">Отмененные</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Секция выбора типа */}
              <div className="mb-4">
                <div className="text-sm mb-2">Тип</div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="44">44-ФЗ</SelectItem>
                    <SelectItem value="223">223-ФЗ</SelectItem>
                    <SelectItem value="small">Закупка малого объема</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Секция выбора региона */}
              <div className="mb-4">
                <div className="text-sm mb-2">Регион</div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите регион" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все регионы</SelectItem>
                    <SelectItem value="moscow">Москва</SelectItem>
                    <SelectItem value="spb">Санкт-Петербург</SelectItem>
                    <SelectItem value="krasnodar">Краснодарский край</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Секция выбора ОКПД2 */}
              <div className="mb-4">
                <div className="text-sm mb-2">ОКПД2</div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите ОКПД2" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Секция выбора площадки */}
              <div className="mb-4">
                <div className="text-sm mb-2">Площадка</div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите площадку" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все площадки</SelectItem>
                    <SelectItem value="sberbank">Сбербанк-АСТ</SelectItem>
                    <SelectItem value="roseltorg">Росэлторг</SelectItem>
                    <SelectItem value="rtc">РТС-тендер</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Секция ограничений */}
              <div className="mb-4">
                <div className="text-sm mb-2">Ограничения</div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите ограничения" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все</SelectItem>
                    <SelectItem value="smp">СМП</SelectItem>
                    <SelectItem value="socially">Социально ориентированные</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Секция периода публикации */}
              <div className="mb-4">
                <div className="text-sm mb-2">Публикация</div>
                <div className="flex flex-col space-y-2">
                  <div className="relative flex h-9 w-full rounded-md border border-input">
                    <div className="flex items-center justify-center px-3 text-xs text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                    </div>
                    <Input
                      className="border-0 w-full h-9"
                      type="date"
                      placeholder="От"
                    />
                  </div>
                  <div className="relative flex h-9 w-full rounded-md border border-input">
                    <div className="flex items-center justify-center px-3 text-xs text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                    </div>
                    <Input
                      className="border-0 w-full h-9"
                      type="date"
                      placeholder="До"
                    />
                  </div>
                </div>
              </div>

              {/* Секция НМЦК */}
              <div className="mb-4">
                <div className="flex items-start space-x-2">
                  <div className="w-1/2">
                    <div className="text-sm mb-2">НМЦК от</div>
                    <Input placeholder="0" className="w-full border-input" />
                  </div>
                  <div className="w-1/2">
                    <div className="text-sm mb-2">НМЦК до</div>
                    <Input placeholder="999 999 999" className="w-full border-input" />
                  </div>
                </div>
              </div>

              {/* Секция выбора "без цены" */}
              <div className="mb-4">
                <div className="text-sm mb-2">Без цены</div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Нет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">Нет</SelectItem>
                    <SelectItem value="yes">Да</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Кнопки применения фильтров */}
              <div className="flex flex-col space-y-2 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">Применить</Button>
                  <Button variant="outline" className="border-amber-400 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950">Очистить</Button>
                </div>
                <Button variant="outline" className="border-blue-400 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950">
                  Сохранить
                </Button>
              </div>
            </div>

            {/* Правая колонка со списком тендеров */}
            <div className="lg:col-span-4">
              <div className="bg-card p-4 rounded-lg border border-border elevation-1 overflow-x-auto">
                <TenderTable />

                <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                  <div>В списке: {filteredTenders.length}</div>
                  <div>Всего найдено: 172 770</div>
                </div>

                <div className="flex justify-center mt-4">
                  <Button variant="outline" className="text-primary">
                    <Download className="h-4 w-4 mr-2" />
                    Загрузить ещё...
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Диалоговое окно для просмотра деталей тендера */}
      <Dialog open={!!selectedTender} onOpenChange={(open) => !open && setSelectedTender(null)}>
        {selectedTender && (
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] elevation-3 flex flex-col">
            <DialogHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5 -mx-6 -mt-6 p-6 rounded-t-lg border-b">
              <DialogTitle className="text-xl text-secondary line-clamp-2">
                {selectedTender.title}
              </DialogTitle>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                  {selectedTender.type}
                </Badge>
              </div>
            </DialogHeader>

            <div className="py-4 overflow-y-auto flex-1">
              {/* Заказчик информация */}
              <div className="mb-2">
                <p className="text-sm font-medium text-muted-foreground">Заказчик</p>
                <p className="text-sm">{selectedTender.customer || selectedTender.organization}</p>
                {selectedTender.specialist && (
                  <p className="text-sm text-muted-foreground">{selectedTender.specialist} {selectedTender.contactInfo?.split(selectedTender.specialist)[1] || ""}</p>
                )}
              </div>

              {/* Таблица с данными о тендере */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">НМЦК</span>
                  <span>{selectedTender.nmck || formatPrice(selectedTender.price) + " " + selectedTender.currency}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">ОЗ</span>
                  <span>-</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">ОИК</span>
                  <span>-</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">ОГО</span>
                  <span>{selectedTender.region}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Тип процедуры</span>
                  <span className="text-right">{selectedTender.type}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Регион</span>
                  <span>{selectedTender.region}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Закон</span>
                  <span>{selectedTender.law || "ФЗ 44"}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Площадка</span>
                  <span>
                    {selectedTender.platform && (
                      <a href="#" className="text-blue-500 hover:underline">{selectedTender.platform}</a>
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Статус</span>
                  <span>{selectedTender.status}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Ссылка</span>
                  <span>
                    {selectedTender.link && (
                      <a href="#" className="text-blue-500 hover:underline">{selectedTender.link}</a>
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Начало подачи заявок(Мск)</span>
                  <span>{selectedTender.date}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Номер извещения</span>
                  <span className="flex items-center">
                    {selectedTender.noticeNumber || selectedTender.number}
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground">
                        <path d="M5 2V1H10V2H5ZM4.75 0C4.33579 0 4 0.335786 4 0.75V1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H11V0.75C11 0.335786 10.6642 0 10.25 0H4.75ZM3 2.5C3 2.22386 3.22386 2 3.5 2H4V2.25C4 2.66421 4.33579 3 4.75 3H10.25C10.6642 3 11 2.66421 11 2.25V2H11.5C11.7761 2 12 2.22386 12 2.5V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM5 5H10V6H5V5ZM5 7H10V8H5V7ZM5 9H8V10H5V9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </Button>
                  </span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Окончание подачи заявок(Мск)</span>
                  <span>{selectedTender.endDate.split(' ')[0]} {selectedTender.endDate.split(' ')[1]}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Категории</span>
                  <span>{selectedTender.category || "-"}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Проведение(Мск)</span>
                  <span>01.01.0001 02:31</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Место исполнения</span>
                  <span>{selectedTender.implementationPlace || "-"}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Итоги(Мск)</span>
                  <span>01.01.0001</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Условия</span>
                  <span>{selectedTender.conditions || "-"}</span>
                </div>
              </div>

              {/* Табы для лотов, документации и требований */}
              <div className="mt-2">
                <Tabs defaultValue="lots" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 text-xs md:text-sm">
                    <TabsTrigger value="lots">ЛОТЫ</TabsTrigger>
                    <TabsTrigger value="docs">ДОКУМЕНТАЦИЯ</TabsTrigger>
                    <TabsTrigger value="requirements">ТРЕБОВАНИЯ И ОГРАНИЧЕНИЯ</TabsTrigger>
                  </TabsList>
                  <TabsContent value="lots" className="mt-2 overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="whitespace-nowrap">Наименование</TableHead>
                          <TableHead className="text-right whitespace-nowrap">Кол-во</TableHead>
                          <TableHead className="text-right whitespace-nowrap">Цена</TableHead>
                          <TableHead className="text-right whitespace-nowrap">Сумма</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Сканер ручной штрихкодовый</TableCell>
                          <TableCell className="text-right">73 шт</TableCell>
                          <TableCell className="text-right">0,00</TableCell>
                          <TableCell className="text-right">0,00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Сканер поточный</TableCell>
                          <TableCell className="text-right">10 шт</TableCell>
                          <TableCell className="text-right">0,00</TableCell>
                          <TableCell className="text-right">0,00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Многофункциональное устройство, тип 1</TableCell>
                          <TableCell className="text-right">1 шт</TableCell>
                          <TableCell className="text-right">0,00</TableCell>
                          <TableCell className="text-right">0,00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TabsContent>
                  <TabsContent value="docs" className="mt-2">
                    <div className="text-sm">
                      Документация по тендеру будет доступна после загрузки с площадки.
                    </div>
                  </TabsContent>
                  <TabsContent value="requirements" className="mt-2">
                    <div className="text-sm">
                      Информация о требованиях, преимуществах и ограничениях будет доступна после загрузки с площадки.
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="flex justify-between mt-4 pt-4 border-t border-border">
              <Button variant="outline" className="text-primary border-primary/30 hover:bg-primary/10">
                <Link className="h-4 w-4 mr-2" />
                Открыть на площадке
              </Button>
              <div className="flex space-x-2">
                <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
                  Не интересует
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Добавить в CRM
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
