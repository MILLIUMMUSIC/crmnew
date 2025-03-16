"use client";

import React, { memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface TaskItem {
  id: string;
  number: string;
  author: string;
  createdDate: string;
  dueDate: string;
  status: string;
  notifications: boolean;
  resolutionDate?: string;
  important: boolean;
  executor: string;
  title: string;
  tenderLink?: string;
}

interface OptimizedTaskTableProps {
  tasks: TaskItem[];
  getStatusBadgeColor: (status: string) => string;
  onViewTask: (task: TaskItem) => void;
}

function OptimizedTaskTable({ tasks, getStatusBadgeColor, onViewTask }: OptimizedTaskTableProps) {
  if (tasks.length === 0) {
    return (
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
            <TableHead className="w-[120px]">Важно</TableHead>
            <TableHead className="w-[150px]">Исполнитель</TableHead>
            <TableHead>Заголовок</TableHead>
            <TableHead className="w-[150px]">Ссылка на тендер</TableHead>
            <TableHead className="w-[80px]">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={12} className="text-center py-4">
              Нет задач, соответствующих выбранным фильтрам
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
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
          <TableHead className="w-[120px]">Важно</TableHead>
          <TableHead className="w-[150px]">Исполнитель</TableHead>
          <TableHead>Заголовок</TableHead>
          <TableHead className="w-[150px]">Ссылка на тендер</TableHead>
          <TableHead className="w-[80px]">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map(task => (
          <TableRow
            key={task.id}
            className="hover:bg-muted/50"
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
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onViewTask(task)}
                title="Просмотр деталей"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default memo(OptimizedTaskTable);
