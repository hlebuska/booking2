'use client';
import { Button } from '@/components/ui/button';
import { H2, H3 } from '@/components/ui/typography';
import { Github } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-2 sm:px-10 md:px-12 lg:px-6 bg-gradient-to-b from-white via-white to-transparent h-full">
            <H2>Онлайн система бронирования услуг</H2>
            <div className="flex gap-4 flex-col md:flex-row">
                <div className="flex flex-col w-full md:w-1/2">
                    <div className="p-6 border rounded-2xl shadow-sm">
                        <H3>Для клиентов</H3>
                        <p className="text-muted-foreground mb-6">
                            Удобный интерфейс для выбора филиала, услуг, мастера и времени записи.
                        </p>

                        <video
                            src="/client_demo.mp4"
                            autoPlay
                            muted
                            loop
                            className="w-full rounded-xl mb-6 shadow-sm"
                        />

                        <Link href="/branchSelect">
                            <Button className="w-full">Записаться</Button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                    <div className="p-6 border rounded-2xl shadow-sm">
                        <H3>Для администраторов</H3>
                        <p className="text-muted-foreground mb-6">
                            Панель управления для настройки филиалов, мастеров и услуг. Доступ к расписанию и управлению
                            записями.
                        </p>

                        <video src="/admin_demo.mp4" autoPlay muted loop className="w-full rounded-xl mb-6 shadow-sm" />

                        <Link href="/admin">
                            <Button className="w-full">Войти как админ</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full ">
                <div className="p-6 border rounded-2xl shadow-md">
                    <H3>Frontend</H3>
                    <p className="text-muted-foreground ">
                        Стэк: Next.js, TypeScript, shadcn/ui, react-hook-form + zod, Zustand, tanstack-query, motion
                        <br></br>
                        <br></br>
                        Разработчик:
                        <a href="https://github.com/hlebuska" target="_blank" className="inline-block ml-3">
                            <Button
                                variant={'secondary'}
                                className="flex gap-2 items-center font-semibold mb-6 border w-fit p-2 rounded-md"
                            >
                                hlebuska <Github size={18} />
                            </Button>
                        </a>
                    </p>
                    <H3>Backend</H3>
                    <p className="text-muted-foreground">
                        Стэк: Django, Postgres
                        <br></br>
                        <br></br>
                        Разработчики:
                        <a href="https://github.com/makhambetali" target="_blank" className="inline-block ml-3">
                            <Button
                                variant={'secondary'}
                                className="flex gap-2 items-center font-semibold mb-6 border w-fit p-2 rounded-md"
                            >
                                makhambetali <Github size={18} />
                            </Button>
                        </a>
                        <a href="https://github.com/hlebuska" target="_blank" className="inline-block ml-3">
                            <Button
                                variant={'secondary'}
                                className="flex gap-2 items-center font-semibold mb-6 border w-fit p-2 rounded-md"
                            >
                                hlebuska <Github size={18} />
                            </Button>
                        </a>
                    </p>
                    <H3 className="mb-2">Credits</H3>

                    <a href="https://github.com/hlebuska/booking2" target="_blank">
                        <Button className="flex gap-2 items-center font-semibold mb-6 border w-fit p-2 rounded-md">
                            GitHub проекта <Github size={18} />
                        </Button>
                    </a>
                </div>
            </div>
        </main>
    );
}
