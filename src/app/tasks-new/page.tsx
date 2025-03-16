"use client";

import { useState } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { tasks } from "@/data/tasks";

export default function TasksPage() {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
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

  const handleTaskSelect = (taskId: string) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleSelectAllTasks = () => {
    if (selectedTasks.length === filteredTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(filteredTasks.map(task => task.id));
    }
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

          {showFilter && (
            <div className="bg-card p-4 rounded-lg border border-border elevation-1">
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Решить до */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Решить до</span>
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

                {/* Дата решения */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Дата решения</span>
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

                {/* Исполнитель */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Исполнитель</span>
                    <span className="text-blue-500 dark:text-blue-400">мои</span>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        <span>Выберите исполнителя</span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <div className="p-2 bg-popover border-border">
                        <div className="space-y-2">
                          {["Лазарев М.Б.", "Лысов А.А.", "Мудрецов А.С.", "Федосеев Л.Д."].map(executor => (
                            <div key={executor} className="flex items-center space-x-2">
                              <Checkbox id={`executor-${executor}`} />
                              <label htmlFor={`executor-${executor}`} className="text-sm">
                                {executor}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* ЭД */}
                <div className="space-y-2">
                  <div className="text-sm">ЭД</div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        <span>Выберите ЭД</span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <div className="p-2 bg-popover border-border">
                        <div className="space-y-2">
                          {["Документ 1", "Документ 2", "Документ 3"].map(doc => (
                            <div key={doc} className="flex items-center space-x-2">
                              <Checkbox id={`doc-${doc}`} />
                              <label htmlFor={`doc-${doc}`} className="text-sm">
                                {doc}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Важно */}
                <div className="space-y-2">
                  <div className="text-sm">Важно</div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        <span>Выберите важность</span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <div className="p-2 bg-popover border-border">
                        <div className="space-y-2">
                          {["Высокая", "Средняя", "Низкая"].map(importance => (
                            <div key={importance} className="flex items-center space-x-2">
                              <Checkbox id={`importance-${importance}`} />
                              <label htmlFor={`importance-${importance}`} className="text-sm">
                                {importance}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
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
          )}

          <div className="bg-card rounded-lg border border-border elevation-1">
            <div className="overflow-x-auto">
              <Table className="responsive-table">
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedTasks.length > 0 && selectedTasks.length === filteredTasks.length}
                        onCheckedChange={handleSelectAllTasks}
                      />
                    </TableHead>
                    <TableHead className="w-[70px]">№</TableHead>
                    <TableHead className="w-[120px]">Автор</TableHead>
                    <TableHead className="w-[120px]">Создана</TableHead>
                    <TableHead className="w-[120px]">Решить до</TableHead>
                    <TableHead className="w-[120px]">Статус</TableHead>
                    <TableHead className="w-[120px]">Уведомления</TableHead>
                    <TableHead className="w-[120px]">Дата решения</TableHead>
                    <TableHead className="w-[120px]">Важно</TableHead>
                    <TableHead className="w-[150px]">Исполнитель</TableHead>
                    <TableHead>Заголовок</TableHead>
                    <TableHead className="w-[150px]">Ссылка на тендер</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={11} className="text-center py-4">
                        Нет задач, соответствующих выбранным фильтрам
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTasks.map(task => (
                      <TableRow
                        key={task.id}
                        className="hover:bg-muted/50"
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedTasks.includes(task.id)}
                            onCheckedChange={() => handleTaskSelect(task.id)}
                          />
                        </TableCell>
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
                        <TableCell>
                          {task.important && (
                            <div className="text-orange-500 dark:text-orange-400">🔥</div>
                          )}
                        </TableCell>
                        <TableCell>{task.executor}</TableCell>
                        <TableCell>{task.title}</TableCell>
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
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
