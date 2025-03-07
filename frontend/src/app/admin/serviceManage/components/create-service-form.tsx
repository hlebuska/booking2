'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { IPostBooking, IService } from '@/lib/type/types';
import { phoneRegex, postBooking, postService } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { RequiredStar } from '@/components/ui/required-star';

interface IBookingFormValues {
    name: string;
    description: string;
    duration: string;
    price: number;
}

const formSchema = z.object({
    name: z.string().min(1, 'Имя является обязательным полем.'),
    description: z.string().min(1, 'Описание является обязательным полем.'),
    duration: z.string().min(1, 'Длительность является обязательным полем.'),
    price: z.coerce.number().positive('Цена является обязательным полем.'),
});

export default function CreateServiceForm() {
    const form = useForm<IBookingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: '', description: '', duration: '', price: 0 },
    });

    const mutation = useMutation({
        mutationFn: (data: Omit<IService, 'id'>) => {
            return postService(data);
        },
        onSuccess: (data) => {
            toast({
                variant: 'success',
                title: 'Услуга успешна создана.',
                description: 'Создание услуги ${name} прошло успешно.',
            });
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast({
                    variant: 'destructive',
                    title: 'Ошибка.',
                    description: error.response?.data.error,
                    duration: 2000,
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Ошибка.',
                    description: 'Что-то пошло не так.',
                    duration: 2000,
                });
            }
        },
    });

    const { toast } = useToast();

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutate({ ...values });
    }

    return (
        <div className="mx-auto w-full max-w-3xl p-0 sm:p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Название <RequiredStar />
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Введите название услуги." type="" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Описание <RequiredStar />
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Введите описание услуги."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Длительность <RequiredStar />
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Введите длительность." type="" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Стоимость <RequiredStar />
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Введите стоимость услуги." type="number" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Добавить услугу</Button>
                </form>
            </Form>
        </div>
    );
}
