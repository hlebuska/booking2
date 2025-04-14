import useAuthGuard from '@/hooks/use-auth-guard';
import useStore from '@/hooks/use-store';

export default function BranchManage() {
    useAuthGuard();
    const { accessToken } = useStore();
    if (!accessToken) return null;

    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen"></div>
    );
}
