export interface StatusStatItem {
  status: string;
  amount: number;
  count: number;
  percentage: number;
}

export interface StatusStatGroup {
  title: string; // e.g. "(ЗА 44-ФЗ)"
  items: StatusStatItem[];
  total: {
    amount: number;
    count: number;
  };
}

export interface StatusStatisticsData {
  groups: StatusStatGroup[];
}

export type ChartColors = {
  [key: string]: string;
};
