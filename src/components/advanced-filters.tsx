"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { FilterX, Search, CheckCheck, RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface AdvancedFiltersProps {
  onFilterChange: (filters: Record<string, string | Date | null>) => void;
}

export function AdvancedFilters({ onFilterChange }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<Record<string, string | Date | null>>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (key: string, value: string | Date | null) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  // Date selection handler that properly handles undefined values
  const handleDateSelect = (key: string) => (date: Date | undefined) => {
    handleFilterChange(key, date || null);
  };

  return (
    <div className="p-4">
      <div className="pb-3 mb-3 border-b border-secondary/20">
        <h2 className="text-xl font-medium text-secondary">Расширенные фильтры</h2>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <Button
          variant="outline"
          className="border-secondary/20 hover:bg-secondary/5 text-secondary"
          onClick={handleClearFilters}
        >
          <RefreshCw className="mr-1 h-4 w-4" />
          Очистить
        </Button>
        <Button
          variant="default"
          className="bg-green-600 hover:bg-green-700"
          onClick={handleApplyFilters}
        >
          <CheckCheck className="mr-1 h-4 w-4" />
          Применить
        </Button>
        <Button
          variant="default"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Сохранить
        </Button>
        <Button
          variant="outline"
          className="border-blue-500/30 hover:bg-blue-500/10 text-blue-500"
        >
          Настройки
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
        {/* Статус */}
        <div className="space-y-2">
          <Label htmlFor="status" className="text-secondary">Статус</Label>
          <Select
            value={typeof filters.status === 'string' ? filters.status : ''}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger id="status" className="border-secondary/20 focus:ring-secondary">
              <SelectValue placeholder="Выберите статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="Приём заявок">Приём заявок</SelectItem>
              <SelectItem value="Заявка готова">Заявка готова</SelectItem>
              <SelectItem value="Не участвуем">Не участвуем</SelectItem>
              <SelectItem value="Заявка подана">Заявка подана</SelectItem>
              <SelectItem value="Заявка возвращена оператором ЭП">Заявка возвращена оператором ЭП</SelectItem>
              <SelectItem value="Заявка принята">Заявка принята</SelectItem>
              <SelectItem value="Ждём итогов">Ждём итогов</SelectItem>
              <SelectItem value="ПРОИГРАЛИ">ПРОИГРАЛИ</SelectItem>
              <SelectItem value="ПОБЕДА">ПОБЕДА</SelectItem>
              <SelectItem value="Отменено">Отменено</SelectItem>
              <SelectItem value="Отклонили">Отклонили</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Организация */}
        <div className="space-y-2">
          <Label htmlFor="organization" className="text-secondary">Организация</Label>
          <Select
            value={typeof filters.organization === 'string' ? filters.organization : ''}
            onValueChange={(value) => handleFilterChange("organization", value)}
          >
            <SelectTrigger id="organization" className="border-secondary/20 focus:ring-secondary">
              <SelectValue placeholder="Выберите организацию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все организации</SelectItem>
              <SelectItem value="ООО «Технопром»">ООО «Технопром»</SelectItem>
              <SelectItem value="АО «Газпром»">АО «Газпром»</SelectItem>
              <SelectItem value="ФГБОУ ВО «МГУ»">ФГБОУ ВО «МГУ»</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Владелец */}
        <div className="space-y-2">
          <Label htmlFor="owner" className="text-secondary">Владелец</Label>
          <Select
            value={typeof filters.owner === 'string' ? filters.owner : ''}
            onValueChange={(value) => handleFilterChange("owner", value)}
          >
            <SelectTrigger id="owner" className="border-secondary/20 focus:ring-secondary">
              <SelectValue placeholder="Выберите владельца" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все владельцы</SelectItem>
              <SelectItem value="Мои">Мои</SelectItem>
              <SelectItem value="Ромазанова О.">Ромазанова О.</SelectItem>
              <SelectItem value="Ткаченко А.А.">Ткаченко А.А.</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ГОЗ */}
        <div className="space-y-2">
          <Label htmlFor="goz" className="text-secondary">ГОЗ</Label>
          <Select
            value={typeof filters.goz === 'string' ? filters.goz : ''}
            onValueChange={(value) => handleFilterChange("goz", value)}
          >
            <SelectTrigger id="goz" className="border-secondary/20 focus:ring-secondary">
              <SelectValue placeholder="Выберите ГОЗ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="ГОЗ">ГОЗ</SelectItem>
              <SelectItem value="не ГОЗ">не ГОЗ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ФАС */}
        <div className="space-y-2">
          <Label htmlFor="fas" className="text-secondary">ФАС</Label>
          <Select
            value={typeof filters.fas === 'string' ? filters.fas : ''}
            onValueChange={(value) => handleFilterChange("fas", value)}
          >
            <SelectTrigger id="fas" className="border-secondary/20 focus:ring-secondary">
              <SelectValue placeholder="Выберите ФАС" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="44-ФЗ">44-ФЗ</SelectItem>
              <SelectItem value="223-ФЗ">223-ФЗ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Фактические итоги месяц */}
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Label className="text-secondary">Фактические итоги месяц</Label>
            <span className="text-blue-500">Текущий</span>
          </div>
          <div className="flex gap-1">
            <div className="relative flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-secondary/20 hover:bg-secondary/5 pl-2"
                  >
                    <CalendarIcon className="h-4 w-4 opacity-50 mr-1" />
                    __.__.__
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.factResultsDateStart instanceof Date ? filters.factResultsDateStart : undefined}
                    onSelect={handleDateSelect("factResultsDateStart")}
                    initialFocus
                    className="rounded-md border border-secondary/20"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="relative flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-secondary/20 hover:bg-secondary/5 pl-2"
                  >
                    <CalendarIcon className="h-4 w-4 opacity-50 mr-1" />
                    __.__.__
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.factResultsDateEnd instanceof Date ? filters.factResultsDateEnd : undefined}
                    onSelect={handleDateSelect("factResultsDateEnd")}
                    initialFocus
                    className="rounded-md border border-secondary/20"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Статус контракта */}
        <div className="space-y-2">
          <Label htmlFor="contractStatus" className="text-secondary">Статус контракта</Label>
          <Select
            value={typeof filters.contractStatus === 'string' ? filters.contractStatus : ''}
            onValueChange={(value) => handleFilterChange("contractStatus", value)}
          >
            <SelectTrigger id="contractStatus" className="border-secondary/20 focus:ring-secondary">
              <SelectValue placeholder="Статус контракта" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="Подписан">Подписан</SelectItem>
              <SelectItem value="На согласовании">На согласовании</SelectItem>
              <SelectItem value="Отклонен">Отклонен</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Статус заявки */}
        <div className="space-y-2">
          <Label htmlFor="applicationStatus" className="text-secondary">Статус заявки</Label>
          <Select
            value={typeof filters.applicationStatus === 'string' ? filters.applicationStatus : ''}
            onValueChange={(value) => handleFilterChange("applicationStatus", value)}
          >
            <SelectTrigger id="applicationStatus" className="border-secondary/20 focus:ring-secondary">
              <SelectValue placeholder="Статус заявки" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="Принята">Принята</SelectItem>
              <SelectItem value="Отклонена">Отклонена</SelectItem>
              <SelectItem value="На рассмотрении">На рассмотрении</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* СМП */}
        <div className="space-y-2">
          <Label htmlFor="smp" className="text-secondary">СМП</Label>
          <Select
            value={typeof filters.smp === 'string' ? filters.smp : ''}
            onValueChange={(value) => handleFilterChange("smp", value)}
          >
            <SelectTrigger id="smp" className="border-secondary/20 focus:ring-secondary">
              <SelectValue placeholder="СМП" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="СМП">СМП</SelectItem>
              <SelectItem value="Не СМП">Не СМП</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Неопределенный объем */}
        <div className="space-y-2">
          <Label htmlFor="undefinedVolume" className="text-secondary">Неопределенный объем</Label>
          <Select
            value={typeof filters.undefinedVolume === 'string' ? filters.undefinedVolume : ''}
            onValueChange={(value) => handleFilterChange("undefinedVolume", value)}
          >
            <SelectTrigger id="undefinedVolume" className="border-secondary/20 focus:ring-secondary">
              <SelectValue placeholder="Выберите" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="Да">Да</SelectItem>
              <SelectItem value="Нет">Нет</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Доступность товара */}
        <div className="space-y-2">
          <Label htmlFor="productAvailability" className="text-secondary">Доступность товара</Label>
          <Select
            value={typeof filters.productAvailability === 'string' ? filters.productAvailability : ''}
            onValueChange={(value) => handleFilterChange("productAvailability", value)}
          >
            <SelectTrigger id="productAvailability" className="border-secondary/20 focus:ring-secondary">
              <SelectValue placeholder="Выберите" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="В наличии">В наличии</SelectItem>
              <SelectItem value="Под заказ">Под заказ</SelectItem>
              <SelectItem value="Нет в наличии">Нет в наличии</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Причина поражения */}
        <div className="space-y-2">
          <Label htmlFor="lossReason" className="text-secondary">Причина поражения</Label>
          <Select
            value={typeof filters.lossReason === 'string' ? filters.lossReason : ''}
            onValueChange={(value) => handleFilterChange("lossReason", value)}
          >
            <SelectTrigger id="lossReason" className="border-secondary/20 focus:ring-secondary">
              <SelectValue placeholder="Выберите" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="Высокая цена">Высокая цена</SelectItem>
              <SelectItem value="Не соответствие ТЗ">Не соответствие ТЗ</SelectItem>
              <SelectItem value="Отсутствие опыта">Отсутствие опыта</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Статус ОЗ */}
        <div className="space-y-2">
          <Label htmlFor="ozStatus" className="text-secondary">Статус ОЗ</Label>
          <Select
            value={typeof filters.ozStatus === 'string' ? filters.ozStatus : ''}
            onValueChange={(value) => handleFilterChange("ozStatus", value)}
          >
            <SelectTrigger id="ozStatus" className="border-secondary/20 focus:ring-secondary">
              <SelectValue placeholder="Выберите" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="Активен">Активен</SelectItem>
              <SelectItem value="Завершен">Завершен</SelectItem>
              <SelectItem value="Отменен">Отменен</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Метки */}
        <div className="space-y-2">
          <Label htmlFor="tags" className="text-secondary">Метки</Label>
          <Select
            value={typeof filters.tags === 'string' ? filters.tags : ''}
            onValueChange={(value) => handleFilterChange("tags", value)}
          >
            <SelectTrigger id="tags" className="border-secondary/20 focus:ring-secondary">
              <SelectValue placeholder="Выберите" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="Важно">Важно</SelectItem>
              <SelectItem value="Срочно">Срочно</SelectItem>
              <SelectItem value="В работе">В работе</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Следующий шаг месяц */}
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Label className="text-secondary">Следующий шаг месяц</Label>
            <span className="text-blue-500">Текущий</span>
          </div>
          <div className="flex gap-1">
            <div className="relative flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-secondary/20 hover:bg-secondary/5 pl-2"
                  >
                    <CalendarIcon className="h-4 w-4 opacity-50 mr-1" />
                    __.__.__
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.nextStepDateStart instanceof Date ? filters.nextStepDateStart : undefined}
                    onSelect={handleDateSelect("nextStepDateStart")}
                    initialFocus
                    className="rounded-md border border-secondary/20"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="relative flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-secondary/20 hover:bg-secondary/5 pl-2"
                  >
                    <CalendarIcon className="h-4 w-4 opacity-50 mr-1" />
                    __.__.__
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.nextStepDateEnd instanceof Date ? filters.nextStepDateEnd : undefined}
                    onSelect={handleDateSelect("nextStepDateEnd")}
                    initialFocus
                    className="rounded-md border border-secondary/20"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
