'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { H4 } from '../ui/typography';
import { login } from '@/lib/utils';

interface LoginFormValues {
    username: string;
    password: string;
}

const formSchema = z.object({
    username: z.string().min(1, 'Имя пользователя является обязательным полем'),
    password: z.string().min(3, 'Пароль должен содержать не менее 3 символов'),
});

//add mutaitoN!
export default function LoginForm() {
    const { toast } = useToast();
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { username: '', password: '' },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Here you would typically handle authentication
        console.log(values);
        const data = login(values);
        console.log(data);

        // Example success toast
        toast({
            title: 'Успешный вход',
            description: 'Вы успешно вошли в систему',
        });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mx-auto w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
            <div className="space-y-2 text-center">
                <H4>Вход</H4>
                <p className="text-muted-foreground">Введите ваши данные для доступа к панели администратора</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Имя пользователя</FormLabel>
                                <FormControl>
                                    <Input placeholder="Введите имя пользователя" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="Введите пароль"
                                            type={showPassword ? 'text' : 'password'}
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            onClick={togglePasswordVisibility}
                                            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        Войти
                    </Button>
                </form>
            </Form>
        </div>
    );
}
