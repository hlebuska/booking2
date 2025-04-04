import { Skeleton } from '../ui/skeleton';

interface IProps {
    isLoading: boolean;
    isError?: boolean;
    isEmpty?: boolean;
    errorMessage?: string;
    emptyMessage?: string;
    className?: string;
    children?: React.ReactNode;
}

export default function ConditionalSkeletonLoader({
    isLoading,
    isError = false,
    isEmpty = false,
    errorMessage = 'Что то пошло не так.',
    emptyMessage = 'Нет доступных данных.',
    className = '',
    children,
    ...props
}: IProps) {
    if (isLoading) {
        return (
            <div className={className}>
                <Skeleton {...props} className="animate-pulse w-full h-full" />
            </div>
        );
    }

    if (isError) {
        return <div className="text-red-500 text-center">{errorMessage}</div>;
    }

    if (isEmpty) {
        return <div className="text-zinc-500 text-center">{emptyMessage}</div>;
    }

    return <>{children}</>;
}
