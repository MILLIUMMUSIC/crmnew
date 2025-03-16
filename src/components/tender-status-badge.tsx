import { cn } from "@/lib/utils";
import { TenderStatus } from "@/types";
import { Badge } from "@/components/ui/badge";

interface TenderStatusBadgeProps {
  status: TenderStatus;
  className?: string;
}

export function TenderStatusBadge({ status, className }: TenderStatusBadgeProps) {
  const getStatusColor = (status: TenderStatus) => {
    switch (status) {
      case "Приём заявок":
        return "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-50";
      case "Заявка готова":
        return "bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-50";
      case "Не участвуем":
        return "bg-indigo-50 text-indigo-800 border-indigo-300 hover:bg-indigo-50";
      case "Заявка подана":
        return "bg-blue-500 text-white border-blue-700 hover:bg-blue-600";
      case "Заявка возвращена оператором ЭП":
        return "bg-rose-200 text-rose-800 border-rose-300 hover:bg-rose-200";
      case "Заявка принята":
        return "bg-green-100 text-green-800 border-green-300 hover:bg-green-100";
      case "Ждём итогов":
        return "bg-violet-50 text-violet-800 border-violet-300 hover:bg-violet-50";
      case "ПРОИГРАЛИ":
        return "bg-black text-white border-gray-700 hover:bg-gray-900";
      case "ПОБЕДА":
        return "bg-green-600 text-white border-green-800 hover:bg-green-700";
      case "Отменено":
        return "bg-purple-200 text-purple-800 border-purple-400 hover:bg-purple-200";
      case "Отклонили":
        return "bg-amber-700 text-white border-amber-900 hover:bg-amber-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-100";
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(getStatusColor(status), className)}
    >
      {status}
    </Badge>
  );
}
