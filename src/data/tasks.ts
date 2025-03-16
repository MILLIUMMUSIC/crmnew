export interface Task {
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

export const tasks: Task[] = [
  {
    id: "1",
    number: "480",
    author: "Терёхин М.Д.",
    createdDate: "05.11.2024",
    dueDate: "24.11.2024 (110 д)",
    status: "Новая",
    notifications: true,
    important: false,
    executor: "Лазарев М.Б.",
    title: "Артикул компьютеров"
  },
  {
    id: "2",
    number: "753",
    author: "Лазарев М.Б.",
    createdDate: "13.11.2024",
    dueDate: "31.12.2024 (73 д)",
    status: "Новая",
    notifications: true,
    important: false,
    executor: "Лазарев М.Б.",
    title: "Сделать комплектех прибыльным"
  },
  {
    id: "3",
    number: "1136",
    author: "Трубицын Р.М.",
    createdDate: "25.11.2024",
    dueDate: "17.01.2025 (56 д)",
    status: "Новая",
    notifications: true,
    important: false,
    executor: "Лазарев М.Б.",
    title: "генерация счет + упд в црм"
  },
  {
    id: "4",
    number: "2107",
    author: "Трубицын Р.М.",
    createdDate: "13.01.2025",
    dueDate: "27.01.2025 (46 д)",
    status: "Новая",
    notifications: true,
    important: false,
    executor: "Лысов А.А.",
    title: "договор ЦРМ"
  },
  {
    id: "5",
    number: "2529",
    author: "Трубицын Р.М.",
    createdDate: "21.02.2025",
    dueDate: "28.02.2025 (14 д)",
    status: "Новая",
    notifications: true,
    important: false,
    executor: "Лазарев М.Б.",
    title: "метрики для оценки подборщика"
  },
  {
    id: "6",
    number: "2528",
    author: "Трубицын Р.М.",
    createdDate: "21.02.2025",
    dueDate: "28.02.2025 (14 д)",
    status: "Новая",
    notifications: true,
    important: false,
    executor: "Лысов А.А.",
    title: "метрики для оценки подборщика"
  },
  {
    id: "7",
    number: "2381",
    author: "Федосеев Л.Д.",
    createdDate: "11.02.2025",
    dueDate: "28.02.2025 (14 д)",
    status: "Новая",
    notifications: true,
    resolutionDate: "28.02.2025",
    important: true,
    executor: "Лазарев М.Б.",
    title: "Можно нам получить кофе пожалуйста."
  },
  {
    id: "8",
    number: "2705",
    author: "Лазарев М.Б.",
    createdDate: "06.03.2025",
    dueDate: "13.03.2025 (1 д)",
    status: "Переоткрыта",
    notifications: true,
    resolutionDate: "06.03.2025",
    important: false,
    executor: "Мудрецов А.С.",
    title: "Проблема: компьютеры на амд нужно перетыкивать процессоры чтобы они заработали",
    tenderLink: "11779"
  },
  {
    id: "9",
    number: "2693",
    author: "Лазарев М.Б.",
    createdDate: "06.03.2025",
    dueDate: "13.03.2025 (1 д)",
    status: "Новая",
    notifications: true,
    important: false,
    executor: "Лазарев М.Б.",
    title: "Шмелев ищет фильтры в Китае"
  },
  {
    id: "10",
    number: "2718",
    author: "Лазарев М.Б.",
    createdDate: "06.03.2025",
    dueDate: "13.03.2025 (1 д)",
    status: "Новая",
    notifications: true,
    important: true,
    executor: "Федосеев Л.Д.",
    title: "Нужен список что приходовать и что списать по складу Серьга",
    tenderLink: "11779"
  },
  {
    id: "11",
    number: "2734",
    author: "Васильев Н.С.",
    createdDate: "10.03.2025",
    dueDate: "13.03.2025 (1 д)",
    status: "Новая",
    notifications: true,
    important: true,
    executor: "Федосеев Л.Д.",
    title: "Переделать диски"
  },
  {
    id: "12",
    number: "2806",
    author: "Лазарев М.Б.",
    createdDate: "13.03.2025",
    dueDate: "13.03.2025 (1 д)",
    status: "Новая",
    notifications: true,
    important: false,
    executor: "Ковалёв Н.С.",
    title: "Ноутбук подобран неправильно (TDP процессора - это ОК или не ОК?)",
    tenderLink: "11914"
  },
  {
    id: "13",
    number: "2802",
    author: "Зобнин В.А.",
    createdDate: "13.03.2025",
    dueDate: "13.03.2025 (1 д)",
    status: "Новая",
    notifications: true,
    resolutionDate: "14.03.2025",
    important: true,
    executor: "Стороженко С.В.",
    title: "Согласование оборудования.",
    tenderLink: "11794"
  },
  {
    id: "14",
    number: "3001",
    author: "Лазарев М.Б.",
    createdDate: "14.03.2025",
    dueDate: "21.03.2025 (7 д)",
    status: "В работе",
    notifications: false,
    important: false,
    executor: "Федосеев Л.Д.",
    title: "Написать документацию по новой системе"
  },
  {
    id: "15",
    number: "3002",
    author: "Трубицын Р.М.",
    createdDate: "14.03.2025",
    dueDate: "28.03.2025 (14 д)",
    status: "На паузе",
    notifications: false,
    important: true,
    executor: "Лазарев М.Б.",
    title: "Обновить базу поставщиков"
  },
  {
    id: "16",
    number: "3003",
    author: "Федосеев Л.Д.",
    createdDate: "14.03.2025",
    dueDate: "17.03.2025 (3 д)",
    status: "На проверке",
    notifications: true,
    important: false,
    executor: "Лысов А.А.",
    title: "Проверить отчет по тендерам за февраль"
  },
  {
    id: "17",
    number: "3004",
    author: "Лазарев М.Б.",
    createdDate: "14.03.2025",
    dueDate: "18.03.2025 (4 д)",
    status: "В ожидании",
    notifications: false,
    important: false,
    executor: "Стороженко С.В.",
    title: "Ждем ответа от поставщика по комплектующим"
  },
  {
    id: "18",
    number: "2950",
    author: "Васильев Н.С.",
    createdDate: "10.03.2025",
    dueDate: "11.03.2025",
    status: "Завершена",
    notifications: false,
    resolutionDate: "11.03.2025",
    important: false,
    executor: "Лазарев М.Б.",
    title: "Подготовить отчет по продажам"
  },
  {
    id: "19",
    number: "2951",
    author: "Терёхин М.Д.",
    createdDate: "10.03.2025",
    dueDate: "12.03.2025",
    status: "Отклонена",
    notifications: false,
    resolutionDate: "12.03.2025",
    important: false,
    executor: "Федосеев Л.Д.",
    title: "Провести инвентаризацию склада"
  },
  {
    id: "20",
    number: "2952",
    author: "Зобнин В.А.",
    createdDate: "10.03.2025",
    dueDate: "15.03.2025",
    status: "Отменена",
    notifications: false,
    resolutionDate: "12.03.2025",
    important: false,
    executor: "Мудрецов А.С.",
    title: "Разработать новый интерфейс для мобильного приложения"
  },
  {
    id: "21",
    number: "2900",
    author: "Лазарев М.Б.",
    createdDate: "01.03.2025",
    dueDate: "10.03.2025",
    status: "Архивирована",
    notifications: false,
    resolutionDate: "09.03.2025",
    important: false,
    executor: "Стороженко С.В.",
    title: "Подготовить презентацию для клиента"
  }
];
