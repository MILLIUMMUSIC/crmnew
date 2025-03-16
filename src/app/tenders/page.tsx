"use client";

import { useEffect, useState, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { TendersTable } from "@/components/tenders-table";
import { tenders as allTenders } from "@/data/tenders";
import { Tender } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/date-utils";
import { TenderStatusBadge } from "@/components/tender-status-badge";
import { AdvancedFilters } from "@/components/advanced-filters";
import { Button } from "@/components/ui/button";
import { FileDown, Filter } from "lucide-react";
import { motion } from "framer-motion";

interface FilterValue {
  search?: string | Date | null;
  status?: string | Date | null;
  federalLaw?: string | Date | null;
  etp?: string | Date | null;
  location?: string | Date | null;
  purchaseMethod?: string | Date | null;
  participationRestriction?: string | Date | null;
  dateFrom?: string | Date | null;
  dateTo?: string | Date | null;
  minPrice?: string | Date | null;
  maxPrice?: string | Date | null;
  industry?: string | Date | null;
}

export default function TendersPage() {
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [viewTender, setViewTender] = useState<Tender | null>(null);
  const [tenders, setTenders] = useState<Tender[]>(allTenders);
  const [showFilters, setShowFilters] = useState(true);
  const [activeFilters, setActiveFilters] = useState<FilterValue>({});
  const filterRef = useRef<HTMLDivElement>(null);
  const [filterHeight, setFilterHeight] = useState<number | "auto">("auto");

  // Measure filter height when it becomes visible
  useEffect(() => {
    if (showFilters && filterRef.current) {
      const height = filterRef.current.scrollHeight;
      setFilterHeight(height);
    }
  }, [showFilters]);

  // Apply tab filtering
  const tabTenders = selectedTab === "all"
    ? tenders
    : tenders.filter(tender => tender.status === selectedTab);

  // Handle filter changes
  const handleFilterChange = (filters: Record<string, string | Date | null>) => {
    setActiveFilters(filters as FilterValue);

    let filteredTenders = [...allTenders];

    // Apply filters
    if (filters.search && typeof filters.search === 'string') {
      const searchTerm = filters.search.toLowerCase();
      filteredTenders = filteredTenders.filter(tender =>
        tender.number.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.status && typeof filters.status === 'string' && filters.status !== "all") {
      filteredTenders = filteredTenders.filter(tender =>
        tender.status === filters.status
      );
    }

    if (filters.federalLaw && typeof filters.federalLaw === 'string' && filters.federalLaw !== "all") {
      filteredTenders = filteredTenders.filter(tender =>
        tender.federalLaw === filters.federalLaw
      );
    }

    if (filters.etp && typeof filters.etp === 'string' && filters.etp !== "all") {
      filteredTenders = filteredTenders.filter(tender =>
        tender.etp === filters.etp
      );
    }

    if (filters.location && typeof filters.location === 'string' && filters.location !== "all") {
      filteredTenders = filteredTenders.filter(tender =>
        tender.location === filters.location
      );
    }

    if (filters.purchaseMethod && typeof filters.purchaseMethod === 'string' && filters.purchaseMethod !== "all") {
      filteredTenders = filteredTenders.filter(tender =>
        tender.purchaseMethod === filters.purchaseMethod
      );
    }

    if (filters.participationRestriction && typeof filters.participationRestriction === 'string' && filters.participationRestriction !== "all") {
      filteredTenders = filteredTenders.filter(tender =>
        tender.participationRestriction === filters.participationRestriction
      );
    }

    if (filters.dateFrom) {
      const fromDate = filters.dateFrom instanceof Date
        ? filters.dateFrom
        : new Date(filters.dateFrom as string);

      filteredTenders = filteredTenders.filter(tender =>
        new Date(tender.publicationDate) >= fromDate
      );
    }

    if (filters.dateTo) {
      const toDate = filters.dateTo instanceof Date
        ? filters.dateTo
        : new Date(filters.dateTo as string);

      filteredTenders = filteredTenders.filter(tender =>
        new Date(tender.publicationDate) <= toDate
      );
    }

    if (filters.minPrice && typeof filters.minPrice === 'string') {
      const min = parseFloat(filters.minPrice);
      if (!isNaN(min)) {
        filteredTenders = filteredTenders.filter(tender =>
          tender.startPrice >= min
        );
      }
    }

    if (filters.maxPrice && typeof filters.maxPrice === 'string') {
      const max = parseFloat(filters.maxPrice);
      if (!isNaN(max)) {
        filteredTenders = filteredTenders.filter(tender =>
          tender.startPrice <= max
        );
      }
    }

    if (filters.industry && typeof filters.industry === 'string' && filters.industry !== "all") {
      filteredTenders = filteredTenders.filter(tender =>
        tender.industry === filters.industry
      );
    }

    setTenders(filteredTenders);
  };

  // Handle export to Excel (placeholder)
  const handleExport = () => {
    alert("Экспорт данных в Excel будет реализован в следующей версии.");
  };

  return (
    <>
      <Navbar user={{ name: "User", company: "Company" }} />

      <main className="container-fluid py-4">
        <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg elevation-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Тендеры</h1>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border-primary/30 hover:bg-primary/10"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Скрыть фильтры" : "Показать фильтры"}
            </Button>

            <Button
              variant="outline"
              onClick={handleExport}
              className="flex items-center gap-2 border-primary/30 hover:bg-primary/10"
            >
              <FileDown className="h-4 w-4" />
              Экспорт
            </Button>
          </div>
        </div>

        <motion.div
          className="surface-secondary border rounded-lg overflow-hidden mb-4"
          initial={{ height: 0, opacity: 0, marginBottom: 0 }}
          animate={{
            height: showFilters ? "auto" : 0,
            opacity: showFilters ? 1 : 0,
            marginBottom: showFilters ? 16 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
            duration: 0.2,
          }}
          style={{ transformOrigin: "top" }}
        >
          <div ref={filterRef}>
            <AdvancedFilters onFilterChange={handleFilterChange} />
          </div>
        </motion.div>

        <div className="surface-primary border rounded-lg p-4 elevation-1">
          <Tabs
            defaultValue="all"
            className="w-full"
            value={selectedTab}
            onValueChange={setSelectedTab}
          >
            <TabsList className="mb-4 bg-primary/10 p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Все</TabsTrigger>
              <TabsTrigger value="Приём заявок" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Приём заявок</TabsTrigger>
              <TabsTrigger value="Заявка готова" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Заявка готова</TabsTrigger>
              <TabsTrigger value="Не участвуем" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Не участвуем</TabsTrigger>
              <TabsTrigger value="Заявка подана" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Заявка подана</TabsTrigger>
              <TabsTrigger value="ПОБЕДА" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">ПОБЕДА</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-0">
              <TendersTable tenders={tabTenders} onViewTender={setViewTender} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Dialog open={!!viewTender} onOpenChange={(open) => !open && setViewTender(null)}>
        {viewTender && (
          <DialogContent className="sm:max-w-[600px] elevation-3">
            <DialogHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5 -mx-6 -mt-6 p-6 rounded-t-lg border-b">
              <DialogTitle className="text-xl text-secondary">
                Тендер #{viewTender.number}
              </DialogTitle>
              <div className="mt-2 flex items-center gap-2">
                <TenderStatusBadge status={viewTender.status} />
                <span className="text-sm text-muted-foreground">
                  Опубликовано: {formatDate(viewTender.publicationDate)}
                </span>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none text-secondary">Организация</p>
                <p className="text-sm text-muted-foreground">{viewTender.organization}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium leading-none text-secondary">Начальная цена</p>
                <p className="text-sm text-muted-foreground">
                  {viewTender.startPrice === 0
                    ? "—"
                    : `${viewTender.startPrice.toLocaleString('ru-RU')} ${viewTender.currency}`}
                </p>
              </div>

              {viewTender.completionDate && (
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none text-secondary">Дата завершения</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(viewTender.completionDate)}
                  </p>
                </div>
              )}

              {viewTender.location && (
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none text-secondary">Местоположение</p>
                  <p className="text-sm text-muted-foreground">{viewTender.location}</p>
                </div>
              )}

              {viewTender.percentage !== undefined && viewTender.percentage > 0 && (
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none text-secondary">Процент</p>
                  <p className="text-sm text-muted-foreground">{viewTender.percentage}%</p>
                </div>
              )}

              {viewTender.federalLaw && (
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none text-secondary">Федеральный закон</p>
                  <p className="text-sm text-muted-foreground">{viewTender.federalLaw}</p>
                </div>
              )}

              {viewTender.etp && (
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none text-secondary">Торговая площадка</p>
                  <p className="text-sm text-muted-foreground">{viewTender.etp}</p>
                </div>
              )}

              {viewTender.purchaseMethod && (
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none text-secondary">Способ закупки</p>
                  <p className="text-sm text-muted-foreground">{viewTender.purchaseMethod}</p>
                </div>
              )}
            </div>

            {viewTender.title && (
              <div className="space-y-1 bg-secondary/5 p-3 rounded-md">
                <p className="text-sm font-medium leading-none text-secondary">Название</p>
                <p className="text-sm text-muted-foreground">{viewTender.title}</p>
              </div>
            )}

            {viewTender.description && (
              <div className="space-y-1 mt-2 bg-secondary/5 p-3 rounded-md">
                <p className="text-sm font-medium leading-none text-secondary">Описание</p>
                <p className="text-sm text-muted-foreground">{viewTender.description}</p>
              </div>
            )}
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
