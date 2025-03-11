'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RequiredStar } from '@/components/ui/required-star';
import { Textarea } from '@/components/ui/textarea';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { useToast } from '@/hooks/use-toast';
import { IService } from '@/lib/type/types';
import { postService, queryClient } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface IBookingFormValues {
    name: string;
    description: string;
    hours: number;
    minutes: number;
    price: number;
}

const formSchema = z.object({
    name: z.string().min(1, 'Имя является обязательным полем.'),
    description: z.string().min(1, 'Описание является обязательным полем.'),
    hours: z.coerce.number().nonnegative('Часы является обязательным полем.'),
    minutes: z.coerce.number().positive('Минуты является обязательным полем.').max(59, 'Минут должно быть меньше 60'),
    price: z.coerce.number().positive('Цена является обязательным полем.'),
});

export default function CreateServiceForm() {
    const { setOpen } = useDialogStore();

    const form = useForm<IBookingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: '', description: '', hours: 0, minutes: 0, price: 0 },
    });

    const mutation = useMutation({
        mutationFn: (data: Omit<IService, 'id'>) => {
            return postService(data);
        },
        onSuccess: (data: IBookingFormValues) => {
            toast({
                variant: 'success',
                title: 'Услуга успешно создана.',
                description: `Создание услуги "${data.name}" прошло успешно.`,
            });
            form.reset();
            queryClient.invalidateQueries({ queryKey: ['services'] });

            setOpen(false);
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

    function onSubmit(formData: z.infer<typeof formSchema>) {
        const duration = formData.hours * 60 + formData.minutes;

        const submitData = {
            ...formData,
            duration,
            ...(formData.hours !== undefined ? {} : { hours: undefined }), // Remove hours if exists
            ...(formData.minutes !== undefined ? {} : { minutes: undefined }), // Remove minutes if exists
        };

        mutation.mutate(submitData);
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

                    <div>
                        <FormLabel>
                            Длительность <RequiredStar />
                        </FormLabel>
                        <div className="flex gap-3 mt-2">
                            <FormField
                                control={form.control}
                                name="hours"
                                render={({ field }) => (
                                    <FormItem className="w-1/6 ">
                                        <FormControl>
                                            <Input placeholder="" type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>Часы</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="minutes"
                                render={({ field }) => (
                                    <FormItem className="w-1/6">
                                        <FormControl>
                                            <Input placeholder="" type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>Минуты</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button type="submit">Добавить услугу</Button>
                </form>
            </Form>
        </div>
    );
}
