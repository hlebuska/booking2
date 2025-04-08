'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RequiredStar } from '@/components/ui/required-star';
import { Textarea } from '@/components/ui/textarea';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { useToast } from '@/hooks/use-toast';
import { IMaster } from '@/lib/types';
import { postMaster, queryClient } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface IBookingFormValues {
    name: string;
    description: string;
}

const formSchema = z.object({
    name: z.string().min(1, 'Имя является обязательным полем.'),
    description: z.string().min(1, 'Описание является обязательным полем.'),
});

export default function CreateMasterForm() {
    const { setOpen } = useDialogStore();

    const form = useForm<IBookingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: '', description: '' },
    });

    const mutation = useMutation({
        mutationFn: (data: Omit<IMaster, 'id'>) => {
            return postMaster(data);
        },
        onSuccess: (data: IBookingFormValues) => {
            toast({
                variant: 'success',
                title: 'Услуга успешно создана.',
                description: `Создание мастера "${data.name}" прошло успешно.`,
            });
            form.reset();
            queryClient.invalidateQueries({ queryKey: ['masters'] });

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
        mutation.mutate(formData);
    }

    return (
        <div className="mx-auto w-full max-w-3xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Имя <RequiredStar />
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Введите имя мастера." type="" {...field} />
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
                                        placeholder="Введите описание мастера."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Добавить мастера</Button>
                </form>
            </Form>
        </div>
    );
}
