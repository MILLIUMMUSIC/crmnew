export type TenderStatus =
  | "Приём заявок"
  | "Заявка готова"
  | "Не участвуем"
  | "Заявка подана"
  | "Заявка возвращена оператором ЭП"
  | "Заявка принята"
  | "Ждём итогов"
  | "ПРОИГРАЛИ"
  | "ПОБЕДА"
  | "Отменено"
  | "Отклонили";

export interface Tender {
  id: string;
  number: string;
  organization: string;
  title?: string;
  description?: string;
  status: TenderStatus;
  publicationDate: string;
  completionDate?: string;
  startPrice: number;
  finalPrice?: number;
  currency: string;
  percentage?: number;
  location?: string;
  winner?: string;
  // Additional fields based on the screenshot
  etp?: string; // Electronic Trading Platform
  purchaseCode?: string;
  purchaseMethod?: string;
  purchaseType?: string;
  responsiblePerson?: string;
  deliveryAddress?: string;
  deliveryDate?: string;
  procedureStatus?: string;
  documentationLink?: string;
  federalLaw?: string; // e.g., 44-ФЗ, 223-ФЗ
  industry?: string;
  region?: string;
  phase?: string; // Current phase of the tender
  lastUpdated?: string;
  guarantee?: number; // Guarantee amount
  contractType?: string;
  participationRestriction?: string; // e.g., SME participation
}

export interface User {
  id?: string;
  name: string;
  company?: string;
  role?: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  options?: FilterOption[];
  type: 'select' | 'date' | 'text' | 'number';
}
