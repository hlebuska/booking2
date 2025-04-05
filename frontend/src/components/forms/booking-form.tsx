'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { IPostBooking } from '@/lib/type/types';
import { phoneRegex, postBooking } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { RequiredStar } from '@/components/ui/required-star';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { useRouter } from 'next/navigation';

interface IProps {
    barber_id: number;
    service_id: number;
    time_id: number;
}

interface IBookingFormValues {
    name: string;
    phone_number: string;
    comment?: string;
}

const formSchema = z.object({
    name: z.string().min(1, 'Имя является обязательным полем.'),
    phone_number: z.string().regex(phoneRegex, 'Неверный формат телефона.'),
    comment: z.string().optional(),
});

export default function BookingForm({ barber_id, time_id }: IProps) {
    const { setOpen } = useDialogStore();
    const router = useRouter();

    const form = useForm<IBookingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { phone_number: '', name: '', comment: '' },
    });

    const mutation = useMutation({
        mutationFn: (data: IPostBooking) => {
            return postBooking(data);
        },
        onSuccess: (data) => {
            toast({
                variant: 'success',
                title: 'Запись прошла успешно.',
                description: 'Запись прошла успешно.',
            });
            setOpen(false);
            router.push('/success');
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
        mutation.mutate({ ...values, barber_id, time_id });
    }

    return (
        <div className="mx-auto w-full max-w-3xl p-0 ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-start">
                                <FormLabel>
                                    Телефон <RequiredStar />
                                </FormLabel>
                                <FormControl className="w-full">
                                    <PhoneInput placeholder="Введите номер телефона." {...field} defaultCountry="KZ" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Имя <RequiredStar />
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Введите ваше имя." type="" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Комментарий</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Добавьте комментарий (по желанию)."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Отправить</Button>
                </form>
            </Form>
        </div>
    );
}
