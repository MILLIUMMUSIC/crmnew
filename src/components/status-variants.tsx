"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusVariantsProps {
  className?: string;
  onStatusSelect?: (status: string) => void;
  selectedStatus?: string;
}

export function StatusVariants({ className, onStatusSelect, selectedStatus }: StatusVariantsProps) {
  const statuses = [
    { id: "reception", label: "Приём заявок", color: "bg-amber-50 text-amber-800 border-amber-300" },
    { id: "explanation", label: "На разъяснении", color: "bg-pink-50 text-pink-800 border-pink-300" },
    { id: "notParticipating", label: "Не участвуем", color: "bg-indigo-50 text-indigo-800 border-indigo-300", hasCheck: true },
    { id: "ready", label: "Заявка готова", color: "bg-blue-50 text-blue-800 border-blue-300" },
    { id: "submitted", label: "Заявка подана", color: "bg-blue-500 text-white border-blue-700" },
    { id: "waitingResultsPos", label: "Ждём итогов +", color: "bg-violet-50 text-violet-800 border-violet-300" },
    { id: "waitingResultsNeg", label: "Ждём итогов -", color: "bg-slate-200 text-slate-800 border-slate-400" },
    { id: "lost", label: "ПРОИГРАЛИ", color: "bg-black text-white border-gray-700", hasCheck: true },
    { id: "win", label: "ПОБЕДА", color: "bg-green-600 text-white border-green-800", hasCheck: true },
    { id: "cancelled", label: "Отменено", color: "bg-purple-200 text-purple-800 border-purple-400" },
    { id: "rejected", label: "Отклонили", color: "bg-amber-700 text-white border-amber-900" },
    { id: "withdrawn", label: "Заявка отозвана", color: "bg-pink-200 text-pink-800 border-pink-400" },
  ];

  return (
    <div className={cn("bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 w-64", className)}>
      <h3 className="font-semibold text-lg mb-4">Варианты статусов</h3>
      <div className="flex flex-col space-y-2">
        {statuses.map((status) => (
          <button
            key={status.id}
            className={cn(
              "rounded px-3 py-1.5 text-left font-medium border flex items-center justify-between",
              status.color,
              selectedStatus === status.id && "ring-2 ring-offset-1",
            )}
            onClick={() => onStatusSelect?.(status.id)}
          >
            {status.label}
            {status.hasCheck && <Check className="h-4 w-4" />}
          </button>
        ))}
      </div>
    </div>
  );
}
