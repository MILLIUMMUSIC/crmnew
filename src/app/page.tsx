"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronRight, CheckCircle2, BarChart4, FileText, Briefcase, TruckIcon, LineChart, Mail, PhoneCall, Send } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const [showMore, setShowMore] = useState<{ [key: string]: boolean }>({
    feature1: false,
    feature2: false,
    feature3: false,
    feature4: false,
  });
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: ""
  });

  // Features data
  const features = [
    {
      id: "feature1",
      title: "Создание заявки на участие",
      description: "Создайте новые заявки на участие, подберите товар и проставьте цену.",
      icon: <FileText className="h-10 w-10 text-primary" />,
    },
    {
      id: "feature2",
      title: "Участие в торгах",
      description: "Вы участвуете в торгах. Если вы проиграете, то заявка уйдет в архив. Вы сможете позже вернуться к отыгранным заявкам и проанализировать свои ошибки. Если вы выиграете, то заявка перейдет в заключаемые контракты. В CRM Тендеры есть удобный учет контрактов с указанием даты подписания, сроков и места поставки.",
      icon: <Briefcase className="h-10 w-10 text-primary" />,
    },
    {
      id: "feature3",
      title: "Исполнение контракта",
      description: "Каждый контракт в CRM Тендеры для учета товара можно синхронизировать с 1с или МойСклад. Вы закупите товар, отправите транспортной компанией, а CRM Тендеры будет следить за получением товара клиентом.",
      icon: <TruckIcon className="h-10 w-10 text-primary" />,
    },
    {
      id: "feature4",
      title: "Статистика ваших тендеров",
      description: "Оцените эффективность ваших менеджеров: количество рассмотренных заявок, выигранных аукционов, прибыльность. Просмотрите историю проигранных сделок, проработайте свои слабые места.",
      icon: <LineChart className="h-10 w-10 text-primary" />,
    },
  ];

  // Helpers
  const toggleShowMore = (id: string) => {
    setShowMore(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Ваша заявка принята! Мы свяжемся с вами в ближайшее время.");
    setContactForm({
      name: "",
      company: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-950 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="font-bold text-2xl text-primary">CRM TORGI</div>
          </div>
          <div className="flex space-x-4 items-center">
            <Link href="/tenders" legacyBehavior>
              <Button variant="ghost" asChild>
                <a>Демо</a>
              </Button>
            </Link>
            <Button variant="outline" onClick={() => setShowLoginDialog(true)}>
              Войти
            </Button>
            <Button onClick={() => setShowRegisterDialog(true)}>
              Регистрация
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Эффективная система<br />управления тендерами
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Автоматизируйте участие в аукционах: CRM поможет в подготовке заявок, отследит срок их подачи и подскажет о том, что пора подписать контракт. А выигранные сделки вы можете сразу выгружать в 1С (Тестировалось на версии ERP 2.5).
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button size="lg" onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}>
                  Начать бесплатно
                </Button>
                <Button size="lg" variant="outline" onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}>
                  Узнать больше
                </Button>
              </motion.div>
            </div>
            <div className="hidden lg:block">
              <motion.div
                className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="h-full w-full bg-gradient-to-br from-primary to-primary-foreground rounded-lg">
                  <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 p-6 flex items-center justify-center">
                    <div className="max-w-md p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Тендеры на сегодня</h3>
                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">+12 новых</span>
                      </div>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="p-3 border rounded-md bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                            <div>
                              <div className="text-sm font-medium">Тендер #{8732 + i}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Срок: 23.03.2025</div>
                            </div>
                            <div className="text-primary text-sm font-medium">₽ 2,{450 + i * 120},000</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Полный цикл управления тендерами</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Наша система предоставляет все необходимые инструменты для эффективного участия
              в тендерах и контроля всех этапов процесса.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <Card
                key={feature.id}
                className={cn(
                  "border-2 transition-all duration-300 hover:shadow-md",
                  showMore[feature.id] ? "border-primary" : "border-gray-200 dark:border-gray-800"
                )}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mb-3">
                      {feature.icon}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleShowMore(feature.id)}
                      className="text-gray-500"
                    >
                      {showMore[feature.id] ? <ChevronDown /> : <ChevronRight />}
                    </Button>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={cn(
                    "text-gray-600 dark:text-gray-300 transition-all duration-300",
                    !showMore[feature.id] && feature.description.length > 100 ? "line-clamp-2" : ""
                  )}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16">
            <div className="bg-primary/5 border rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-2xl font-bold mb-4">Преимущества CRM TORGI</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {[
                      "Автоматический поиск тендеров",
                      "Система оповещений",
                      "Интеграция с 1С",
                      "Управление документами",
                      "Аналитика и отчеты",
                      "Командная работа",
                      "Защита данных",
                      "Техническая поддержка",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}>
                    Попробовать бесплатно
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <BarChart4 className="h-32 w-32 text-primary mx-auto mb-4" />
                    <p className="text-center font-medium">Увеличьте эффективность участия в тендерах на 40%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section (Replacing Auth Section) */}
      <section id="contact-section" className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Связаться с нами</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Оставьте свои контактные данные, и наши специалисты свяжутся с вами для консультации и демонстрации возможностей системы
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-3">
                <Card className="border-2 border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <CardTitle>Запрос на консультацию</CardTitle>
                    <CardDescription>
                      Заполните форму ниже, и мы свяжемся с вами в ближайшее время
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Имя*</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Ваше имя"
                            value={contactForm.name}
                            onChange={handleContactChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Компания*</Label>
                          <Input
                            id="company"
                            name="company"
                            placeholder="Название компании"
                            value={contactForm.company}
                            onChange={handleContactChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email*</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={contactForm.email}
                            onChange={handleContactChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Телефон</Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="+7 (___) ___-__-__"
                            value={contactForm.phone}
                            onChange={handleContactChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Сообщение</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Расскажите о ваших потребностях или задайте вопрос"
                          value={contactForm.message}
                          onChange={handleContactChange}
                          rows={4}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        Отправить запрос
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              <div className="md:col-span-2">
                <div className="space-y-6">
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-4">Наши контакты</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Email:</p>
                          <a href="mailto:info@crmtorgi.ru" className="text-sm text-primary hover:underline">info@crmtorgi.ru</a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <PhoneCall className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Телефон:</p>
                          <a href="tel:+74951234567" className="text-sm text-primary hover:underline">+7 (495) 123-45-67</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary/5 p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">Начните использовать CRM TORGI</h3>
                    <p className="text-sm text-muted-foreground mb-4">Зарегистрируйтесь сейчас и получите 14 дней бесплатного использования полной версии</p>
                    <div className="space-y-2">
                      <Button className="w-full" onClick={() => setShowRegisterDialog(true)}>
                        Создать аккаунт
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => setShowLoginDialog(true)}>
                        Войти в систему
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-10 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">CRM TORGI</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Эффективное решение для управления тендерами и контрактами.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Продукт</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Возможности</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Интеграции</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Тарифы</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Обновления</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Поддержка</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Документация</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">База знаний</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Обучение</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Связаться с нами</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Компания</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">О нас</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Блог</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Карьера</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Пресс-центр</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} CRM TORGI. Все права защищены.
          </div>
        </div>
      </footer>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Вход в систему</DialogTitle>
            <DialogDescription>
              Введите ваши учетные данные для доступа к системе
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" type="email" placeholder="example@company.com" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="login-password">Пароль</Label>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Забыли пароль?
                </Link>
              </div>
              <Input id="login-password" type="password" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" onClick={() => router.push('/tenders')}>
              Войти
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Register Dialog */}
      <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Создать аккаунт</DialogTitle>
            <DialogDescription>
              Зарегистрируйтесь для доступа к полному функционалу
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Имя</Label>
                <Input id="firstName" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Фамилия</Label>
                <Input id="lastName" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-company">Компания</Label>
              <Input id="register-company" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input id="register-email" type="email" placeholder="example@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Пароль</Label>
              <Input id="register-password" type="password" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" onClick={() => router.push('/tenders')}>
              Зарегистрироваться
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
