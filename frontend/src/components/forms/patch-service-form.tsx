'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RequiredStar } from '@/components/ui/required-star';
import { Textarea } from '@/components/ui/textarea';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { useToast } from '@/hooks/use-toast';
import { IPatchService } from '@/lib/types';
import { patchService, queryClient } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface IProps {
    id: number;
    name?: string;
    description?: string;
    duration?: number;
    price?: number;
}

interface IBookingFormValues {
    name: string;
    description: string;
    hours: number;
    minutes: number;
    price: number;
}

const formSchema = z
    .object({
        name: z.string().min(1, 'Имя является обязательным полем.'),
        description: z.string().min(1, 'Описание является обязательным полем.'),
        hours: z.coerce.number().nonnegative('Часы является обязательным полем.'),
        minutes: z.coerce
            .number()
            .nonnegative({ message: 'Минуты не могут быть отрицательными.' })
            .max(59, 'Минут должно быть меньше 60'),
        price: z.coerce.number().positive('Цена является обязательным полем.'),
    })
    .refine(
        (data) => {
            // Ensure minutes can be 0 only if hours > 0
            return data.hours > 0 || data.minutes > 0;
        },
        {
            message: 'Минуты должны быть больше 0, если часы равны 0.',
            path: ['minutes'], // Attach error to minutes field
        }
    );

export default function PatchServiceForm({ id, name, description, duration = 0, price }: IProps) {
    const { setOpen } = useDialogStore();

    const defaultHours = Math.floor(duration / 60);
    const defaultMinutes = duration % 60;

    const form = useForm<IBookingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name || '',
            description: description || '',
            hours: defaultHours,
            minutes: defaultMinutes,
            price: price || 0,
        },
    });

    const mutation = useMutation({
        mutationFn: (data: IPatchService) => patchService(id, data),
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Услуга успешно отредактирована.',
                description: `Редактирование услуги "${name}" прошло успешно.`,
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
            ...(formData.hours !== undefined ? {} : { hours: undefined }),
            ...(formData.minutes !== undefined ? {} : { minutes: undefined }),
        };

        mutation.mutate(submitData);
    }

    return (
        <div className="mx-auto w-full max-w-3xl p-0">
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
                                    <Input placeholder="Введите название услуги." {...field} />
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
                            {/* ✅ Hours Field */}
                            <FormField
                                control={form.control}
                                name="hours"
                                render={({ field }) => (
                                    <FormItem className="w-1/6">
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormLabel>Часы</FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* ✅ Minutes Field */}
                            <FormField
                                control={form.control}
                                name="minutes"
                                render={({ field }) => (
                                    <FormItem className="w-1/6">
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormLabel>Минуты</FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button type="submit">Редактировать услугу</Button>
                </form>
            </Form>
        </div>
    );
}
