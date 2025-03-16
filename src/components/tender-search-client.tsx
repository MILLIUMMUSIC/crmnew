"use client";

import React, { useState, useMemo, useCallback } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Plus, X, Search, Eye, HelpCircle, Link, ArrowDown, ArrowUp, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { TenderSearchTable } from "./tender-search-table";

// Типы данных для тендеров
interface TenderItem {
  id: string;
  number: string;
  title: string;
  type: string;
  status: string;
  date: string;
  endDate: string;
  region: string;
  price: number;
  currency: string;
  organization: string;
  details?: string;
  customer?: string;
  specialist?: string;
  contactInfo?: string;
  nmck?: string;
  law?: string;
  platform?: string;
  link?: string;
  noticeNumber?: string;
  category?: string;
  implementationPlace?: string;
  conditions?: string;
}

// Тестовые данные для тендеров
const tenderItems: TenderItem[] = [
  {
    id: "1",
    number: "00123456789",
    title: "Выполнение работ по текущему ремонту и содержанию линий уличного освещения",
    type: "Запрос цен товаров, работ, услуг",
    status: "Подача заявок",
    date: "15.03.2025",
    endDate: "29.03.2025 10:00 МСК (14 дней)",
    region: "Москва Город",
    price: 512244.00,
    currency: "РУБ",
    organization: "МКОУ СОШ № 13 С. АПАНАСЕНКОВСКОЕ",
    customer: "ГЛАВНАЯ ВОЕННАЯ ПРОКУРАТУРА (7704128867/770401001)",
    specialist: "специалист отдела Рябочкин П.А.",
    contactInfo: "Рябочкин П.А.7-495-6936032ic@gvp.rsnet.ru",
    law: "ФЗ 44",
    platform: "zakupki.gov.ru",
    link: "zakupki.gov.ru",
    noticeNumber: "01731000176250000005",
    category: "Оргтехника"
  },
  {
    id: "2",
    number: "00234567890",
    title: "Поставка офисной мебели для нужд администрации",
    type: "Электронный аукцион",
    status: "Подача заявок",
    date: "16.03.2025",
    endDate: "30.03.2025 12:00 МСК (14 дней)",
    region: "Санкт-Петербург Город",
    price: 879500.00,
    currency: "РУБ",
    organization: "АДМИНИСТРАЦИЯ ГОРОДА САНКТ-ПЕТЕРБУРГА",
    customer: "КОМИТЕТ ПО ИНФОРМАТИЗАЦИИ (7825457845/782501001)",
    law: "ФЗ 44",
    platform: "sberbank-ast.ru",
    link: "sberbank-ast.ru",
    noticeNumber: "02342000288250000012",
    category: "Мебель"
  },
  {
    id: "3",
    number: "00345678901",
    title: "Оказание услуг по комплексной уборке помещений и прилегающей территории",
    type: "Открытый конкурс",
    status: "Работа комиссии",
    date: "10.03.2025",
    endDate: "25.03.2025 15:00 МСК (3 дня)",
    region: "Краснодарский Край",
    price: 1342000.00,
    currency: "РУБ",
    organization: "ГБУЗ 'КРАЕВАЯ КЛИНИЧЕСКАЯ БОЛЬНИЦА'",
    law: "ФЗ 223",
    platform: "roseltorg.ru",
    link: "roseltorg.ru",
    noticeNumber: "03556000399250000023",
    category: "Клининг"
  },
  {
    id: "4",
    number: "00456789012",
    title: "Поставка компьютерной техники и периферийного оборудования",
    type: "Электронный аукцион",
    status: "Подача заявок",
    date: "18.03.2025",
    endDate: "02.04.2025 10:00 МСК (17 дней)",
    region: "Новосибирская Область",
    price: 2455300.00,
    currency: "РУБ",
    organization: "ФГБОУ ВО 'НОВОСИБИРСКИЙ ГОСУДАРСТВЕННЫЙ УНИВЕРСИТЕТ'",
    law: "ФЗ 44",
    platform: "rts-tender.ru",
    link: "rts-tender.ru",
    noticeNumber: "04667000410250000034",
    category: "Компьютерная техника"
  },
  {
    id: "5",
    number: "00567890123",
    title: "Приобретение медицинского оборудования для отделения неврологии",
    type: "Запрос котировок",
    status: "Завершенные",
    date: "01.03.2025",
    endDate: "15.03.2025 18:00 МСК (завершен)",
    region: "Свердловская Область",
    price: 5670000.00,
    currency: "РУБ",
    organization: "ГАУЗ СО 'ОБЛАСТНАЯ КЛИНИЧЕСКАЯ БОЛЬНИЦА №1'",
    law: "ФЗ 223",
    platform: "gpb.ru",
    link: "gpb.ru",
    noticeNumber: "05778000521250000045",
    category: "Медицинское оборудование"
  },
  {
    id: "6",
    number: "00678901234",
    title: "Выполнение строительно-монтажных работ в рамках капитального ремонта здания администрации",
    type: "Электронный аукцион",
    status: "Подача заявок",
    date: "20.03.2025",
    endDate: "05.04.2025 14:00 МСК (16 дней)",
    region: "Нижегородская Область",
    price: 12450000.00,
    currency: "РУБ",
    organization: "АДМИНИСТРАЦИЯ НИЖНЕГО НОВГОРОДА",
    law: "ФЗ 44",
    platform: "zakupki.gov.ru",
    link: "zakupki.gov.ru",
    noticeNumber: "06889000632250000056",
    category: "Строительные работы"
  },
  {
    id: "7",
    number: "00789012345",
    title: "Услуги по организации питания учащихся образовательных учреждений",
    type: "Конкурс с ограниченным участием",
    status: "Работа комиссии",
    date: "12.03.2025",
    endDate: "27.03.2025 11:00 МСК (5 дней)",
    region: "Казань Город",
    price: 8930000.00,
    currency: "РУБ",
    organization: "ДЕПАРТАМЕНТ ОБРАЗОВАНИЯ ГОРОДА КАЗАНИ",
    law: "ФЗ 44",
    platform: "sberbank-ast.ru",
    link: "sberbank-ast.ru",
    noticeNumber: "07990000743250000067",
    category: "Услуги питания"
  },
  {
    id: "8",
    number: "00890123456",
    title: "Поставка канцелярских товаров для нужд государственного учреждения",
    type: "Запрос котировок",
    status: "Подача заявок",
    date: "21.03.2025",
    endDate: "28.03.2025 16:00 МСК (7 дней)",
    region: "Ростовская Область",
    price: 345600.00,
    currency: "РУБ",
    organization: "ГБУ РО 'РОСТОВСКИЙ ОБЛАСТНОЙ ЦЕНТР ОБРАБОТКИ ИНФОРМАЦИИ'",
    law: "ФЗ 44",
    platform: "rts-tender.ru",
    link: "rts-tender.ru",
    noticeNumber: "08101000854250000078",
    category: "Канцелярские товары"
  },
  {
    id: "9",
    number: "00901234567",
    title: "Оказание услуг по охране объектов государственной важности",
    type: "Закрытый конкурс",
    status: "Подача заявок",
    date: "19.03.2025",
    endDate: "19.04.2025 10:00 МСК (31 день)",
    region: "Москва Город",
    price: 15670000.00,
    currency: "РУБ",
    organization: "ФЕДЕРАЛЬНАЯ СЛУЖБА ОХРАНЫ РОССИЙСКОЙ ФЕДЕРАЦИИ",
    law: "ФЗ 44",
    platform: "astgoz.ru",
    link: "astgoz.ru",
    noticeNumber: "09212000965250000089",
    category: "Охранные услуги"
  },
  {
    id: "10",
    number: "01012345678",
    title: "Обслуживание и ремонт лифтового оборудования в жилых домах",
    type: "Электронный аукцион",
    status: "Отмененные",
    date: "05.03.2025",
    endDate: "20.03.2025 15:00 МСК (отменен)",
    region: "Челябинская Область",
    price: 3400000.00,
    currency: "РУБ",
    organization: "УПРАВЛЕНИЕ ЖИЛИЩНО-КОММУНАЛЬНОГО ХОЗЯЙСТВА АДМИНИСТРАЦИИ ГОРОДА",
    law: "ФЗ 44",
    platform: "zakupki.gov.ru",
    link: "zakupki.gov.ru",
    noticeNumber: "10323001076250000090",
    category: "Технические работы"
  },
  {
    id: "11",
    number: "01123456789",
    title: "Поставка медикаментов и лекарственных препаратов для государственных больниц",
    type: "Электронный аукцион",
    status: "Подача заявок",
    date: "22.03.2025",
    endDate: "06.04.2025 10:00 МСК (15 дней)",
    region: "Пермский Край",
    price: 7840000.00,
    currency: "РУБ",
    organization: "МИНИСТЕРСТВО ЗДРАВООХРАНЕНИЯ ПЕРМСКОГО КРАЯ",
    law: "ФЗ 44",
    platform: "roseltorg.ru",
    link: "rts-tender.ru",
    noticeNumber: "11434001187250000101",
    category: "Медикаменты"
  },
  {
    id: "12",
    number: "01234567890",
    title: "Аренда нежилых помещений для размещения государственных учреждений",
    type: "Запрос предложений",
    status: "Подача заявок",
    date: "24.03.2025",
    endDate: "31.03.2025 12:00 МСК (7 дней)",
    region: "Воронежская Область",
    price: 4560000.00,
    currency: "РУБ",
    organization: "ДЕПАРТАМЕНТ ИМУЩЕСТВЕННЫХ И ЗЕМЕЛЬНЫХ ОТНОШЕНИЙ ВОРОНЕЖСКОЙ ОБЛАСТИ",
    law: "ФЗ 223",
    platform: "tektorg.ru",
    link: "tektorg.ru",
    noticeNumber: "12545001298250000112",
    category: "Недвижимость"
  },
  {
    id: "13",
    number: "01345678901",
    title: "Оказание транспортных услуг для нужд государственного учреждения",
    type: "Запрос котировок",
    status: "Работа комиссии",
    date: "14.03.2025",
    endDate: "21.03.2025 14:00 МСК (0 дней)",
    region: "Тюменская Область",
    price: 2300000.00,
    currency: "РУБ",
    organization: "ГБУ 'ТЮМЕНСКОЕ УПРАВЛЕНИЕ ДЕЛАМИ'",
    law: "ФЗ 44",
    platform: "sberbank-ast.ru",
    link: "sberbank-ast.ru",
    noticeNumber: "13656001309250000123",
    category: "Транспортные услуги"
  },
  {
    id: "14",
    number: "01456789012",
    title: "Поставка учебных пособий и методических материалов для образовательных учреждений",
    type: "Электронный аукцион",
    status: "Подача заявок",
    date: "25.03.2025",
    endDate: "10.04.2025 16:00 МСК (16 дней)",
    region: "Самарская Область",
    price: 1680000.00,
    currency: "РУБ",
    organization: "МИНИСТЕРСТВО ОБРАЗОВАНИЯ И НАУКИ САМАРСКОЙ ОБЛАСТИ",
    law: "ФЗ 44",
    platform: "rts-tender.ru",
    link: "rts-tender.ru",
    noticeNumber: "14767001410250000134",
    category: "Образование"
  },
  {
    id: "15",
    number: "01567890123",
    title: "Выполнение работ по благоустройству территории парка отдыха",
    type: "Открытый конкурс",
    status: "Подача заявок",
    date: "26.03.2025",
    endDate: "10.04.2025 18:00 МСК (15 дней)",
    region: "Краснодарский Край",
    price: 9800000.00,
    currency: "РУБ",
    organization: "АДМИНИСТРАЦИЯ ГОРОДСКОГО ОКРУГА ГОРОД КРАСНОДАР",
    law: "ФЗ 44",
    platform: "zakupki.gov.ru",
    link: "zakupki.gov.ru",
    noticeNumber: "15878001521250000145",
    category: "Благоустройство"
  },
  {
    id: "16",
    number: "01678901234",
    title: "Техническое обслуживание систем пожарной сигнализации в зданиях",
    type: "Запрос предложений",
    status: "Завершенные",
    date: "05.03.2025",
    endDate: "19.03.2025 14:00 МСК (завершен)",
    region: "Новосибирская Область",
    price: 750000.00,
    currency: "РУБ",
    organization: "ГУ МЧС РОССИИ ПО НОВОСИБИРСКОЙ ОБЛАСТИ",
    law: "ФЗ 44",
    platform: "roseltorg.ru",
    link: "roseltorg.ru",
    noticeNumber: "16989001632250000156",
    category: "Пожарная безопасность"
  },
  {
    id: "17",
    number: "01789012345",
    title: "Услуги по организации культурно-массовых мероприятий ко Дню города",
    type: "Открытый конкурс",
    status: "Подача заявок",
    date: "28.03.2025",
    endDate: "12.04.2025 12:00 МСК (15 дней)",
    region: "Татарстан Республика",
    price: 4500000.00,
    currency: "РУБ",
    organization: "УПРАВЛЕНИЕ КУЛЬТУРЫ АДМИНИСТРАЦИИ ГОРОДА КАЗАНИ",
    law: "ФЗ 44",
    platform: "sberbank-ast.ru",
    link: "sberbank-ast.ru",
    noticeNumber: "17090001743250000167",
    category: "Культурные мероприятия"
  },
  {
    id: "18",
    number: "01890123456",
    title: "Поставка спортивного инвентаря для школ и спортивных секций",
    type: "Электронный аукцион",
    status: "Подача заявок",
    date: "29.03.2025",
    endDate: "13.04.2025 14:00 МСК (15 дней)",
    region: "Башкортостан Республика",
    price: 2100000.00,
    currency: "РУБ",
    organization: "МИНИСТЕРСТВО ФИЗИЧЕСКОЙ КУЛЬТУРЫ И СПОРТА РЕСПУБЛИКИ БАШКОРТОСТАН",
    law: "ФЗ 44",
    platform: "rts-tender.ru",
    link: "rts-tender.ru",
    noticeNumber: "18101001854250000178",
    category: "Спортивные товары"
  },
  {
    id: "19",
    number: "01901234567",
    title: "Услуги по профессиональной переподготовке и повышению квалификации сотрудников",
    type: "Запрос котировок",
    status: "Подача заявок",
    date: "30.03.2025",
    endDate: "06.04.2025 16:00 МСК (7 дней)",
    region: "Москва Город",
    price: 960000.00,
    currency: "РУБ",
    organization: "ДЕПАРТАМЕНТ ГОСУДАРСТВЕННОЙ СЛУЖБЫ И КАДРОВ ГОРОДА МОСКВЫ",
    law: "ФЗ 44",
    platform: "zakupki.gov.ru",
    link: "zakupki.gov.ru",
    noticeNumber: "19212001965250000189",
    category: "Образовательные услуги"
  },
  {
    id: "20",
    number: "02012345678",
    title: "Выполнение работ по строительству детской спортивной площадки",
    type: "Электронный аукцион",
    status: "Подача заявок",
    date: "01.04.2025",
    endDate: "16.04.2025 10:00 МСК (15 дней)",
    region: "Ленинградская Область",
    price: 3450000.00,
    currency: "РУБ",
    organization: "КОМИТЕТ ПО БЛАГОУСТРОЙСТВУ ЛЕНИНГРАДСКОЙ ОБЛАСТИ",
    law: "ФЗ 44",
    platform: "roseltorg.ru",
    link: "rts-tender.ru",
    noticeNumber: "20323002076250000190",
    category: "Строительство"
  },
  {
    id: "21",
    number: "02123456789",
    title: "Поставка продуктов питания для детских дошкольных учреждений",
    type: "Электронный аукцион",
    status: "Работа комиссии",
    date: "15.03.2025",
    endDate: "22.03.2025 12:00 МСК (1 день)",
    region: "Свердловская Область",
    price: 4250000.00,
    currency: "РУБ",
    organization: "ДЕПАРТАМЕНТ ОБРАЗОВАНИЯ АДМИНИСТРАЦИИ ГОРОДА ЕКАТЕРИНБУРГА",
    law: "ФЗ 44",
    platform: "sberbank-ast.ru",
    link: "sberbank-ast.ru",
    noticeNumber: "21434002187250000201",
    category: "Продукты питания"
  },
  {
    id: "22",
    number: "02234567890",
    title: "Оказание услуг по техническому обслуживанию медицинского оборудования",
    type: "Запрос котировок",
    status: "Отмененные",
    date: "10.03.2025",
    endDate: "17.03.2025 14:00 МСК (отменен)",
    region: "Ростовская Область",
    price: 780000.00,
    currency: "РУБ",
    organization: "ГБУ РО 'ОБЛАСТНАЯ КЛИНИЧЕСКАЯ БОЛЬНИЦА №2'",
    law: "ФЗ 44",
    platform: "rts-tender.ru",
    link: "rts-tender.ru",
    noticeNumber: "22545002298250000212",
    category: "Медицинское оборудование"
  },
  {
    id: "23",
    number: "02345678901",
    title: "Выполнение работ по капитальному ремонту автомобильных дорог",
    type: "Электронный аукцион",
    status: "Подача заявок",
    date: "02.04.2025",
    endDate: "17.04.2025 15:00 МСК (15 дней)",
    region: "Воронежская Область",
    price: 35600000.00,
    currency: "РУБ",
    organization: "ДЕПАРТАМЕНТ ДОРОЖНОГО ХОЗЯЙСТВА И ТРАНСПОРТА ВОРОНЕЖСКОЙ ОБЛАСТИ",
    law: "ФЗ 44",
    platform: "zakupki.gov.ru",
    link: "zakupki.gov.ru",
    noticeNumber: "23656002309250000223",
    category: "Дорожные работы"
  },
  {
    id: "24",
    number: "02456789012",
    title: "Услуги по утилизации медицинских отходов класса Б и В",
    type: "Запрос предложений",
    status: "Подача заявок",
    date: "03.04.2025",
    endDate: "10.04.2025 16:00 МСК (7 дней)",
    region: "Пермский Край",
    price: 1200000.00,
    currency: "РУБ",
    organization: "ПЕРМСКИЙ КРАЕВОЙ ЦЕНТР ДЕЗИНФЕКТОЛОГИИ",
    law: "ФЗ 223",
    platform: "b2b-center.ru",
    link: "b2b-center.ru",
    noticeNumber: "24767002410250000234",
    category: "Медицинские отходы"
  },
  {
    id: "25",
    number: "02567890123",
    title: "Поставка оборудования для модернизации библиотек",
    type: "Электронный аукцион",
    status: "Подача заявок",
    date: "04.04.2025",
    endDate: "19.04.2025 12:00 МСК (15 дней)",
    region: "Нижегородская Область",
    price: 4950000.00,
    currency: "РУБ",
    organization: "МИНИСТЕРСТВО КУЛЬТУРЫ НИЖЕГОРОДСКОЙ ОБЛАСТИ",
    law: "ФЗ 44",
    platform: "roseltorg.ru",
    link: "rts-tender.ru",
    noticeNumber: "25878002521250000245",
    category: "Оборудование для библиотек"
  },
  {
    id: "26",
    number: "02678901234",
    title: "Выполнение работ по монтажу системы видеонаблюдения на территории парка",
    type: "Запрос котировок",
    status: "Подача заявок",
    date: "05.04.2025",
    endDate: "12.04.2025 14:00 МСК (7 дней)",
    region: "Краснодарский Край",
    price: 1420000.00,
    currency: "РУБ",
    organization: "МКУ 'УПРАВЛЕНИЕ КОММУНАЛЬНОГО ХОЗЯЙСТВА И БЛАГОУСТРОЙСТВА' ГОРОДА СОЧИ",
    law: "ФЗ 44",
    platform: "sberbank-ast.ru",
    link: "sberbank-ast.ru",
    noticeNumber: "26989002632250000256",
    category: "Видеонаблюдение"
  },
  {
    id: "27",
    number: "02789012345",
    title: "Оказание услуг по информационному обеспечению деятельности органов государственной власти",
    type: "Открытый конкурс",
    status: "Завершенные",
    date: "02.03.2025",
    endDate: "17.03.2025 16:00 МСК (завершен)",
    region: "Новосибирская Область",
    price: 5800000.00,
    currency: "РУБ",
    organization: "ПРАВИТЕЛЬСТВО НОВОСИБИРСКОЙ ОБЛАСТИ",
    law: "ФЗ 44",
    platform: "zakupki.gov.ru",
    link: "zakupki.gov.ru",
    noticeNumber: "27090002743250000267",
    category: "Информационные услуги"
  },
  {
    id: "28",
    number: "02890123456",
    title: "Поставка серверного оборудования для центра обработки данных",
    type: "Электронный аукцион",
    status: "Подача заявок",
    date: "06.04.2025",
    endDate: "21.04.2025 10:00 МСК (15 дней)",
    region: "Москва Город",
    price: 24500000.00,
    currency: "РУБ",
    organization: "ГКУ 'ИНФОРМАЦИОННЫЙ ГОРОД'",
    law: "ФЗ 44",
    platform: "rts-tender.ru",
    link: "rts-tender.ru",
    noticeNumber: "28101002854250000278",
    category: "Серверное оборудование"
  },
  {
    id: "29",
    number: "02901234567",
    title: "Услуги по проведению аудита финансово-хозяйственной деятельности",
    type: "Запрос предложений",
    status: "Подача заявок",
    date: "07.04.2025",
    endDate: "14.04.2025 14:00 МСК (7 дней)",
    region: "Санкт-Петербург Город",
    price: 950000.00,
    currency: "РУБ",
    organization: "ГУП 'ВОДОКАНАЛ САНКТ-ПЕТЕРБУРГА'",
    law: "ФЗ 223",
    platform: "zakupki.gov.ru",
    link: "zakupki.gov.ru",
    noticeNumber: "29212002965250000289",
    category: "Аудиторские услуги"
  },
  {
    id: "30",
    number: "03012345678",
    title: "Выполнение работ по озеленению и благоустройству общественных пространств",
    type: "Электронный аукцион",
    status: "Подача заявок",
    date: "08.04.2025",
    endDate: "23.04.2025 12:00 МСК (15 дней)",
    region: "Татарстан Республика",
    price: 7500000.00,
    currency: "РУБ",
    organization: "ИСПОЛНИТЕЛЬНЫЙ КОМИТЕТ ГОРОДА КАЗАНИ",
    law: "ФЗ 44",
    platform: "sberbank-ast.ru",
    link: "sberbank-ast.ru",
    noticeNumber: "30323003076250000290",
    category: "Благоустройство"
  }
];

export default function TenderSearchClient() {
  const [selectedTender, setSelectedTender] = useState<TenderItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Текущие");

  // Функция форматирования цены (мемоизирована)
  const formatPrice = useCallback((price: number) => {
    return price.toLocaleString('ru-RU');
  }, []);

  // Фильтрация тендеров на основе поискового запроса
  const filteredTenders = useMemo(() => {
    return tenderItems.filter(tender => {
      if (searchTerm && !tender.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !tender.number.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      if (filterStatus !== "Текущие" && tender.status !== filterStatus) {
        return false;
      }

      return true;
    });
  }, [searchTerm, filterStatus]);

  // Обработчик для изменения поискового запроса
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Обработчик для открытия просмотра деталей тендера
  const handleViewTender = useCallback((tender: TenderItem) => {
    setSelectedTender(tender);
  }, []);

  return (
    <>
      <Navbar user={{ name: "User", company: "Company" }} />

      <main className="container-fluid py-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center mb-4 bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg elevation-1">
            <h1 className="text-3xl font-bold tracking-tight text-primary">Поиск тендеров</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Левая колонка с фильтрами */}
            <div className="bg-card p-4 rounded-lg border border-border elevation-1 lg:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Фильтр поиска новых закупок</h2>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <HelpCircle className="h-5 w-5 text-primary/70" />
                </Button>
              </div>

              {/* Секция поиска по ключевым словам */}
              <div className="mb-4">
                <div className="text-sm mb-2">Ключевые слова</div>
                <Input
                  placeholder="Введите ключевые слова"
                  className="w-full border-input"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              {/* Секция исключения */}
              <div className="mb-4">
                <div className="text-sm mb-2">Исключить</div>
                <Input placeholder="Слова для исключения" className="w-full border-input" />
              </div>

              {/* Секция выбора этапа */}
              <div className="mb-4">
                <div className="text-sm mb-2">Этап</div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите этап" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все этапы</SelectItem>
                    <SelectItem value="active">Активные</SelectItem>
                    <SelectItem value="completed">Завершенные</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Секция выбора статуса */}
              <div className="mb-4">
                <div className="text-sm mb-2">Статус</div>
                <Select defaultValue={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Текущие">Текущие</SelectItem>
                    <SelectItem value="Завершенные">Завершенные</SelectItem>
                    <SelectItem value="Отмененные">Отмененные</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rest of filter controls - keeping existing code */}
              {/* ... existing code ... */}

              {/* Кнопки применения фильтров */}
              <div className="flex flex-col space-y-2 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">Применить</Button>
                  <Button variant="outline" className="border-amber-400 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950">Очистить</Button>
                </div>
                <Button variant="outline" className="border-blue-400 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950">
                  Сохранить
                </Button>
              </div>
            </div>

            {/* Правая колонка со списком тендеров */}
            <div className="lg:col-span-4">
              <div className="bg-card p-4 rounded-lg border border-border elevation-1 overflow-x-auto">
                <TenderSearchTable
                  data={filteredTenders}
                  onViewTender={handleViewTender}
                />

                <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                  <div>Всего найдено: 172 770</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Диалоговое окно для просмотра деталей тендера */}
      <Dialog open={!!selectedTender} onOpenChange={(open) => !open && setSelectedTender(null)}>
        {selectedTender && (
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] elevation-3 flex flex-col">
            <DialogHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5 -mx-6 -mt-6 p-6 rounded-t-lg border-b">
              <DialogTitle className="text-xl text-secondary line-clamp-2">
                {selectedTender.title}
              </DialogTitle>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                  {selectedTender.type}
                </Badge>
              </div>
            </DialogHeader>

            <div className="py-4 overflow-y-auto flex-1">
              {/* Заказчик информация */}
              <div className="mb-2">
                <p className="text-sm font-medium text-muted-foreground">Заказчик</p>
                <p className="text-sm">{selectedTender.customer || selectedTender.organization}</p>
                {selectedTender.specialist && (
                  <p className="text-sm text-muted-foreground">{selectedTender.specialist} {selectedTender.contactInfo?.split(selectedTender.specialist)[1] || ""}</p>
                )}
              </div>

              {/* Таблица с данными о тендере */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">НМЦК</span>
                  <span>{selectedTender.nmck || formatPrice(selectedTender.price) + " " + selectedTender.currency}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">ОЗ</span>
                  <span>-</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">ОИК</span>
                  <span>-</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">ОГО</span>
                  <span>{selectedTender.region}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Тип процедуры</span>
                  <span className="text-right">{selectedTender.type}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Регион</span>
                  <span>{selectedTender.region}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Закон</span>
                  <span>{selectedTender.law || "ФЗ 44"}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Площадка</span>
                  <span>
                    {selectedTender.platform && (
                      <a href="#" className="text-blue-500 hover:underline">{selectedTender.platform}</a>
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Статус</span>
                  <span>{selectedTender.status}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Ссылка</span>
                  <span>
                    {selectedTender.link && (
                      <a href="#" className="text-blue-500 hover:underline">{selectedTender.link}</a>
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Начало подачи заявок(Мск)</span>
                  <span>{selectedTender.date}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Номер извещения</span>
                  <span className="flex items-center">
                    {selectedTender.noticeNumber || selectedTender.number}
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground">
                        <path d="M5 2V1H10V2H5ZM4.75 0C4.33579 0 4 0.335786 4 0.75V1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H11V0.75C11 0.335786 10.6642 0 10.25 0H4.75ZM3 2.5C3 2.22386 3.22386 2 3.5 2H4V2.25C4 2.66421 4.33579 3 4.75 3H10.25C10.6642 3 11 2.66421 11 2.25V2H11.5C11.7761 2 12 2.22386 12 2.5V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM5 5H10V6H5V5ZM5 7H10V8H5V7ZM5 9H8V10H5V9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </Button>
                  </span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Окончание подачи заявок(Мск)</span>
                  <span>{selectedTender.endDate.split(' ')[0]} {selectedTender.endDate.split(' ')[1]}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Категории</span>
                  <span>{selectedTender.category || "-"}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Проведение(Мск)</span>
                  <span>01.01.0001 02:31</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Место исполнения</span>
                  <span>{selectedTender.implementationPlace || "-"}</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Итоги(Мск)</span>
                  <span>01.01.0001</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Условия</span>
                  <span>{selectedTender.conditions || "-"}</span>
                </div>
              </div>

              {/* Табы для лотов, документации и требований */}
              <div className="mt-2">
                <Tabs defaultValue="lots" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 text-xs md:text-sm">
                    <TabsTrigger value="lots">ЛОТЫ</TabsTrigger>
                    <TabsTrigger value="docs">ДОКУМЕНТАЦИЯ</TabsTrigger>
                    <TabsTrigger value="requirements">ТРЕБОВАНИЯ И ОГРАНИЧЕНИЯ</TabsTrigger>
                  </TabsList>
                  <TabsContent value="lots" className="mt-2 overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="whitespace-nowrap">Наименование</TableHead>
                          <TableHead className="text-right whitespace-nowrap">Кол-во</TableHead>
                          <TableHead className="text-right whitespace-nowrap">Цена</TableHead>
                          <TableHead className="text-right whitespace-nowrap">Сумма</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Сканер ручной штрихкодовый</TableCell>
                          <TableCell className="text-right">73 шт</TableCell>
                          <TableCell className="text-right">0,00</TableCell>
                          <TableCell className="text-right">0,00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Сканер поточный</TableCell>
                          <TableCell className="text-right">10 шт</TableCell>
                          <TableCell className="text-right">0,00</TableCell>
                          <TableCell className="text-right">0,00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Многофункциональное устройство, тип 1</TableCell>
                          <TableCell className="text-right">1 шт</TableCell>
                          <TableCell className="text-right">0,00</TableCell>
                          <TableCell className="text-right">0,00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TabsContent>
                  <TabsContent value="docs" className="mt-2">
                    <div className="text-sm">
                      Документация по тендеру будет доступна после загрузки с площадки.
                    </div>
                  </TabsContent>
                  <TabsContent value="requirements" className="mt-2">
                    <div className="text-sm">
                      Информация о требованиях, преимуществах и ограничениях будет доступна после загрузки с площадки.
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="flex justify-between mt-4 pt-4 border-t border-border">
              <Button variant="outline" className="text-primary border-primary/30 hover:bg-primary/10">
                <Link className="h-4 w-4 mr-2" />
                Открыть на площадке
              </Button>
              <div className="flex space-x-2">
                <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
                  Не интересует
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Добавить в CRM
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

    </>
  );
}
