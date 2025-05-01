import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MasterScheduleSlots } from './master-schedule-slots';
import MasterSchedulePreview from './master-schedule-preview';

export default function MasterSchedule() {
    return (
        <Tabs defaultValue="account" className="max-h-[90%] h-screen overflow-scroll overflow-x-hidden">
            <MasterSchedulePreview />
            <TabsList className="w-full">
                <TabsTrigger className="w-full" value="Mon">
                    Пн
                </TabsTrigger>
                <TabsTrigger className="w-full" value="Tue">
                    Вт
                </TabsTrigger>
                <TabsTrigger className="w-full" value="Wed">
                    Ср
                </TabsTrigger>
                <TabsTrigger className="w-full" value="Thu">
                    Чт
                </TabsTrigger>
                <TabsTrigger className="w-full" value="Fri">
                    Пт
                </TabsTrigger>
                <TabsTrigger className="w-full" value="Sat">
                    Сб
                </TabsTrigger>
                <TabsTrigger className="w-full" value="Sun">
                    Вс
                </TabsTrigger>
            </TabsList>
            <TabsContent value="Mon" className="h-[20px] ">
                <MasterScheduleSlots />
            </TabsContent>
            <TabsContent value="Tue">Chanфавафв.</TabsContent>
            <TabsContent value="Wed">Change your password here.</TabsContent>
            <TabsContent value="Thu">Change yфывафываour password here.</TabsContent>
            <TabsContent value="Tue">Change your ывфафpassword here.</TabsContent>
            <TabsContent value="Fri">Change your password here.</TabsContent>
            <TabsContent value="Sat">Changфвафe your paавыфафаssword here.</TabsContent>
            <TabsContent value="Sun">Chфааange your password here.</TabsContent>
        </Tabs>
    );
}
