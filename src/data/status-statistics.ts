import { StatusStatisticsData, ChartColors } from "@/types/report";

export const statusColors: ChartColors = {
  "Не участвуем": "#9966cc",
  "ПРОИГРАЛИ": "#6c5dd3",
  "Заявка готова": "#4d7eff",
  "Отменено": "#ff3d71",
  "ПОБЕДА": "#2ecc71",
  "Прием заявок": "#ff9f43",
  "Отклонили": "#8c6239",
  "На разъяснении": "#ff6b81",
  "Заявка подана": "#3498db",
  "Ждем итоги -": "#aaaaaa",
  "Ждем итоги +": "#ff7f50"
};

export const statusStatisticsData: StatusStatisticsData = {
  groups: [
    {
      title: "(ЗА 44-ФЗ)",
      total: {
        amount: 235118571.19,
        count: 304
      },
      items: [
        {
          status: "Не участвуем",
          amount: 101471598.43,
          count: 65,
          percentage: 43.16
        },
        {
          status: "ПРОИГРАЛИ",
          amount: 52095807.09,
          count: 81,
          percentage: 22.16
        },
        {
          status: "Заявка готова",
          amount: 17235840.24,
          count: 49,
          percentage: 7.33
        },
        {
          status: "Отменено",
          amount: 16038432.27,
          count: 21,
          percentage: 6.82
        },
        {
          status: "ПОБЕДА",
          amount: 11896638.03,
          count: 22,
          percentage: 5.06
        },
        {
          status: "Прием заявок",
          amount: 10874891.37,
          count: 27,
          percentage: 4.63
        },
        {
          status: "Отклонили",
          amount: 9516011.84,
          count: 10,
          percentage: 4.05
        },
        {
          status: "На разъяснении",
          amount: 7505009.38,
          count: 7,
          percentage: 3.19
        },
        {
          status: "Заявка подана",
          amount: 5290678.38,
          count: 8,
          percentage: 2.25
        },
        {
          status: "Ждем итоги -",
          amount: 2450091.64,
          count: 12,
          percentage: 1.04
        },
        {
          status: "Ждем итоги +",
          amount: 743572.52,
          count: 2,
          percentage: 0.32
        }
      ]
    },
    {
      title: "(ЗА 223-ФЗ)",
      total: {
        amount: 78223491.91,
        count: 41
      },
      items: [
        {
          status: "Не участвуем",
          amount: 42569459.36,
          count: 14,
          percentage: 54.42
        },
        {
          status: "Отклонили",
          amount: 8101944.61,
          count: 4,
          percentage: 10.36
        },
        {
          status: "ПРОИГРАЛИ",
          amount: 6208400.78,
          count: 6,
          percentage: 7.94
        },
        {
          status: "Заявка готова",
          amount: 4841070.48,
          count: 1,
          percentage: 6.19
        },
        {
          status: "Прием заявок",
          amount: 4209647.48,
          count: 2,
          percentage: 5.38
        },
        {
          status: "На разъяснении",
          amount: 4162196.00,
          count: 1,
          percentage: 5.32
        },
        {
          status: "ПОБЕДА",
          amount: 2992296.65,
          count: 4,
          percentage: 3.83
        },
        {
          status: "Отменено",
          amount: 1946450.99,
          count: 2,
          percentage: 2.49
        },
        {
          status: "Ждем итоги -",
          amount: 1731004.55,
          count: 2,
          percentage: 2.21
        },
        {
          status: "Заявка подана",
          amount: 1461021.00,
          count: 2,
          percentage: 1.87
        }
      ]
    },
    {
      title: "(ЗК 44-ФЗ)",
      total: {
        amount: 69058271.94,
        count: 57
      },
      items: [
        {
          status: "Не участвуем",
          amount: 42124345.82,
          count: 17,
          percentage: 61.00
        },
        {
          status: "Отклонили",
          amount: 9361228.32,
          count: 5,
          percentage: 13.56
        },
        {
          status: "ПРОИГРАЛИ",
          amount: 8337750.77,
          count: 15,
          percentage: 12.07
        },
        {
          status: "Прием заявок",
          amount: 3454576.99,
          count: 7,
          percentage: 5.00
        },
        {
          status: "Заявка готова",
          amount: 2549432.32,
          count: 5,
          percentage: 3.69
        },
        {
          status: "ПОБЕДА",
          amount: 1752778.72,
          count: 5,
          percentage: 2.54
        },
        {
          status: "Отменено",
          amount: 803250.00,
          count: 1,
          percentage: 1.16
        },
        {
          status: "Ждем итоги",
          amount: 674909.00,
          count: 2,
          percentage: 0.98
        }
      ]
    },
    {
      title: "(ЗК 223-ФЗ)",
      total: {
        amount: 67680610.76,
        count: 53
      },
      items: [
        {
          status: "Не участвуем",
          amount: 40244663.78,
          count: 26,
          percentage: 59.46
        },
        {
          status: "Ждем итоги",
          amount: 8881537.48,
          count: 7,
          percentage: 13.12
        },
        {
          status: "ПОБЕДА",
          amount: 8208613.35,
          count: 4,
          percentage: 12.13
        },
        {
          status: "ПРОИГРАЛИ",
          amount: 4099995.90,
          count: 5,
          percentage: 6.06
        },
        {
          status: "Заявка готова",
          amount: 3952733.67,
          count: 4,
          percentage: 5.84
        },
        {
          status: "Отклонили",
          amount: 1194419.83,
          count: 3,
          percentage: 1.76
        },
        {
          status: "Прием заявок",
          amount: 650152.04,
          count: 2,
          percentage: 0.96
        },
        {
          status: "Отменено",
          amount: 448494.71,
          count: 2,
          percentage: 0.66
        }
      ]
    },
    {
      title: "(ЭМО 223-ФЗ)",
      total: {
        amount: 15620735.52,
        count: 28
      },
      items: [
        {
          status: "Не участвуем",
          amount: 15620735.52,
          count: 28,
          percentage: 74.10
        }
      ]
    }
  ]
};
