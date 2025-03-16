"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, Plus, X, Eye } from "lucide-react";
import { tasks } from "@/data/tasks";

export default function TasksPage() {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    "Новая",
    "В работе",
    "На паузе",
    "На проверке",
    "В ожидании",
    "Переоткрыта"
  ]);
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [viewTask, setViewTask] = useState<typeof tasks[0] | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const [filterHeight, setFilterHeight] = useState<number | "auto">("auto");

  // Measure filter height when it becomes visible
  useEffect(() => {
    if (showFilter && filterRef.current) {
      const height = filterRef.current.scrollHeight;
      setFilterHeight(height);
    }
  }, [showFilter]);

  const filteredTasks = tasks.filter(task =>
    selectedStatuses.includes(task.status)
  );

  const handleSelectAllStatuses = (checked: boolean) => {
    if (checked) {
      setSelectedStatuses(Object.keys(statusCounts));
    } else {
      setSelectedStatuses([]);
    }
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    if (checked) {
      setSelectedStatuses([...selectedStatuses, status]);
    } else {
      setSelectedStatuses(selectedStatuses.filter(s => s !== status));
    }
  };

  const statusCounts: Record<string, number> = {
    "Новая": tasks.filter(task => task.status === "Новая").length,
    "В работе": tasks.filter(task => task.status === "В работе").length,
    "На паузе": tasks.filter(task => task.status === "На паузе").length,
    "На проверке": tasks.filter(task => task.status === "На проверке").length,
    "В ожидании": tasks.filter(task => task.status === "В ожидании").length,
    "Переоткрыта": tasks.filter(task => task.status === "Переоткрыта").length,
    "Завершена": tasks.filter(task => task.status === "Завершена").length,
    "Отклонена": tasks.filter(task => task.status === "Отклонена").length,
    "Отменена": tasks.filter(task => task.status === "Отменена").length,
    "Архивирована": tasks.filter(task => task.status === "Архивирована").length
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Новая":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900";
      case "В работе":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-900";
      case "На паузе":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900";
      case "На проверке":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-900";
      case "В ожидании":
        return "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-900";
      case "Переоткрыта":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900";
      case "Завершена":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
      case "Отклонена":
        return "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-900";
      case "Отменена":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
      case "Архивирована":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  // Add a function to get styling for important tasks
  const getImportanceStyling = (important: boolean) => {
    if (important) {
      return "border-l-4 border-l-orange-500 dark:border-l-orange-400";
    }
    return "";
  };

  return (
    <>
      <Navbar user={{ name: "User", company: "Company" }} />

      <main className="container-fluid py-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg elevation-1">
            <h1 className="text-3xl font-bold tracking-tight text-primary">Задачи</h1>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 border-primary/30 hover:bg-primary/10"
              >
                {showFilter ? "Скрыть фильтр" : "Показать фильтр"}
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-primary/30 hover:bg-primary/10"
              >
                <Plus className="h-4 w-4" />
                Добавить
              </Button>
            </div>
          </div>

          <motion.div
            className="bg-card rounded-lg border border-border elevation-1 overflow-hidden"
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            animate={{
              height: showFilter ? "auto" : 0,
              opacity: showFilter ? 1 : 0,
              marginBottom: showFilter ? 16 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              duration: 0.2,
            }}
            style={{ transformOrigin: "top" }}
          >
            <div ref={filterRef} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* №  */}
                <div className="space-y-2">
                  <div className="text-sm">№</div>
                  <Input className="border-input" />
                </div>

                {/* Автор */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Автор</span>
                    <span className="text-blue-500 dark:text-blue-400">мои</span>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        <span>Выберите автора</span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <div className="p-2 bg-popover border-border">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="all-authors" />
                            <label htmlFor="all-authors" className="text-sm">
                              Выбрать все
                            </label>
                          </div>
                          {["Терёхин М.Д.", "Лазарев М.Б.", "Трубицын Р.М.", "Федосеев Л.Д."].map(author => (
                            <div key={author} className="flex items-center space-x-2">
                              <Checkbox id={`author-${author}`} />
                              <label htmlFor={`author-${author}`} className="text-sm">
                                {author}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Статус */}
                <div className="space-y-2">
                  <div className="text-sm">Статус</div>
                  <Popover open={isStatusFilterOpen} onOpenChange={setIsStatusFilterOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        <span>Выбрано: {selectedStatuses.length}</span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-0" align="start">
                      <div className="p-2 bg-popover border-border">
                        <div className="relative mb-3">
                          <Input
                            placeholder="Поиск"
                            className="pl-2"
                          />
                        </div>

                        <div className="border-t border-b border-border py-2 mb-2">
                          <div className="flex items-center space-x-2 mb-2">
                            <Checkbox
                              id="select-all-statuses"
                              checked={selectedStatuses.length === Object.keys(statusCounts).length}
                              onCheckedChange={handleSelectAllStatuses}
                            />
                            <label htmlFor="select-all-statuses" className="text-sm">
                              Выбрать все
                            </label>
                          </div>
                        </div>

                        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                          {Object.entries(statusCounts).map(([status, count]) => (
                            <div key={status} className="flex items-center space-x-2">
                              <Checkbox
                                id={`status-${status}`}
                                checked={selectedStatuses.includes(status)}
                                onCheckedChange={(checked) => handleStatusChange(status, checked === true)}
                              />
                              <label htmlFor={`status-${status}`} className="text-sm flex-1">
                                {status}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Создана */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Создана</span>
                    <div className="flex items-center text-blue-500 dark:text-blue-400">
                      <ChevronLeft className="h-4 w-4" />
                      <span>текущий</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1"
                        >
                          <CalendarIcon className="h-4 w-4 mr-2 opacity-50" />
                          <span>__.__.__</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          className="border border-border"
                        />
                      </PopoverContent>
                    </Popover>
                    <span className="text-muted-foreground">-</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1"
                        >
                          <CalendarIcon className="h-4 w-4 mr-2 opacity-50" />
                          <span>__.__.__</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          className="border border-border"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Применить</Button>
                <Button variant="destructive">Очистить</Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Сохранить</Button>
                <Button variant="outline" className="text-blue-500 dark:text-blue-400 border-blue-500 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950">Настройки</Button>
              </div>

              <div className="flex mt-4 gap-2">
                <Button
                  variant="outline"
                  className="border-border hover:bg-muted"
                >
                  В работе
                </Button>
                <Button
                  variant="outline"
                  className="border-border hover:bg-muted"
                >
                  Я автор
                </Button>
                <Button
                  variant="outline"
                  className="border-border hover:bg-muted"
                >
                  Я исполнитель
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="bg-card rounded-lg border border-border elevation-1">
            <div className="overflow-x-auto">
              <Table className="responsive-table">
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[70px]">№</TableHead>
                    <TableHead className="w-[120px]">Автор</TableHead>
                    <TableHead className="w-[120px]">Создана</TableHead>
                    <TableHead className="w-[120px]">Решить до</TableHead>
                    <TableHead className="w-[120px]">Статус</TableHead>
                    <TableHead className="w-[120px]">Уведомления</TableHead>
                    <TableHead className="w-[120px]">Дата решения</TableHead>
                    <TableHead className="w-[150px]">Исполнитель</TableHead>
                    <TableHead>Заголовок</TableHead>
                    <TableHead className="w-[150px]">Ссылка на тендер</TableHead>
                    <TableHead className="w-[80px]">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={12} className="text-center py-4">
                        Нет задач, соответствующих выбранным фильтрам
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTasks.map(task => (
                      <TableRow
                        key={task.id}
                        className={`hover:bg-muted/50 ${task.important ? 'bg-orange-50 dark:bg-orange-950/20' : ''} ${getImportanceStyling(task.important)}`}
                      >
                        <TableCell>{task.number}</TableCell>
                        <TableCell>{task.author}</TableCell>
                        <TableCell>{task.createdDate}</TableCell>
                        <TableCell className="text-red-500 dark:text-red-400">{task.dueDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusBadgeColor(task.status)}
                          >
                            {task.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{task.notifications ? "Да" : "Нет"}</TableCell>
                        <TableCell>
                          {task.resolutionDate || "—"}
                        </TableCell>
                        <TableCell>{task.executor}</TableCell>
                        <TableCell>
                          {task.important && (
                            <span className="inline-flex items-center mr-1 text-orange-500 dark:text-orange-400">🔥</span>
                          )}
                          {task.title}
                        </TableCell>
                        <TableCell>
                          {task.tenderLink && (
                            <a
                              href="#"
                              className="text-blue-500 dark:text-blue-400 hover:underline"
                            >
                              {task.tenderLink}
                            </a>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setViewTask(task)}
                            title="Просмотр деталей"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>

      {viewTask && (
        <Dialog open={!!viewTask} onOpenChange={() => setViewTask(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5 -mx-6 -mt-6 p-6 rounded-t-lg border-b">
              <DialogTitle className={`text-xl flex items-center text-secondary ${viewTask.important ? 'text-orange-500 dark:text-orange-400' : ''}`}>
                {viewTask.important && <span className="inline-flex items-center mr-2">🔥</span>}
                Задача #{viewTask.number}: {viewTask.title}
              </DialogTitle>
              <div className="mt-2 flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={getStatusBadgeColor(viewTask.status)}
                >
                  {viewTask.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Создана: {viewTask.createdDate}
                </span>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none text-secondary">Автор</p>
                <p className="text-sm text-muted-foreground">{viewTask.author}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none text-secondary">Исполнитель</p>
                <p className="text-sm text-muted-foreground">{viewTask.executor}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none text-secondary">Решить до</p>
                <p className="text-sm text-red-500 dark:text-red-400">
                  {viewTask.dueDate}
                </p>
              </div>
              {viewTask.resolutionDate && (
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none text-secondary">Дата решения</p>
                  <p className="text-sm text-muted-foreground">
                    {viewTask.resolutionDate}
                  </p>
                </div>
              )}
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none text-secondary">Уведомления</p>
                <p className="text-sm text-muted-foreground">{viewTask.notifications ? "Да" : "Нет"}</p>
              </div>
            </div>

            <div className="space-y-1 bg-secondary/5 p-3 rounded-md">
              <p className="text-sm font-medium leading-none text-secondary">Заголовок</p>
              <p className="text-sm text-muted-foreground">{viewTask.title}</p>
            </div>

            {viewTask.tenderLink && (
              <div className="space-y-1 mt-2 bg-secondary/5 p-3 rounded-md">
                <p className="text-sm font-medium leading-none text-secondary">Ссылка на тендер</p>
                <a
                  href="#"
                  className="text-sm text-blue-500 dark:text-blue-400 hover:underline"
                >
                  {viewTask.tenderLink}
                </a>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
