'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RequiredStar } from '@/components/ui/required-star';
import { Textarea } from '@/components/ui/textarea';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { useToast } from '@/hooks/use-toast';
import { IPatchService } from '@/lib/type/types';
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
    duration: number;
    price: number;
}

const formSchema = z.object({
    name: z.string(),
    description: z.string(),
    duration: z.coerce.number(),
    price: z.coerce.number(),
});

export default function PatchServiceForm({ id, name, description, duration, price }: IProps) {
    const { setOpen } = useDialogStore();

    const form = useForm<IBookingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { name, description, duration, price },
    });

    const mutation = useMutation({
        mutationFn: (data: IPatchService) => {
            return patchService(id, data);
        },
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Услуга успешна создана.',
                description: `Создание услуги ${name} прошло успешно.`,
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
                                    <Input placeholder="Введите длительность." type="number" {...field} />
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
                    <Button type="submit">Редактировать услугу</Button>
                </form>
            </Form>
        </div>
    );
}
