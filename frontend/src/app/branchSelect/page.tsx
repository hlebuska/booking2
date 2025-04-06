'use client';
import { H2 } from '@/components/ui/typography';
import BranchCard from '@/components/features/branches/branch-card';

export default function Home() {
    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen">
            <H2>Выбрать филиал</H2>
            <BranchCard
                name="Demo Barbershop Кабанбай Батыра"
                address="просп. Кабанбай Батыра 53, Астана"
                mapSrc="https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=280&center=lonlat:71.398368,51.090435&zoom=14&marker=lonlat:71.39748857817608,51.09047523222131;type:material;color:%23ff3421;icontype:awesome&scaleFactor=2&apiKey="
                gisLink="https://2gis.kz/astana/firm/70000001018129704"
                googleLink="https://www.google.com/maps/place/%D0%9D%D0%B0%D0%B7%D0%B0%D1%80%D0%B1%D0%B0%D0%B5%D0%B2+%D0%A3%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82/@51.0901849,71.3911821,1054m/data=!3m1!1e3!4m10!1m2!2m1!1snazarbayev+university+google+maps!3m6!1s0x424585a5651070df:0xa0e423d92f946f00!8m2!3d51.0905303!4d71.3981646!15sCiFuYXphcmJheWV2IHVuaXZlcnNpdHkgZ29vZ2xlIG1hcHMiA4gBAZIBCnVuaXZlcnNpdHngAQA!16s%2Fm%2F0gvvk01?entry=ttu&g_ep=EgoyMDI1MDIxOS4xIKXMDSoASAFQAw%3D%3D"
            />

            <BranchCard
                name="Demo Barbershop 2 Кабанбай Батыра"
                address="просп. Кабанбай Батыра 53, Астана"
                mapSrc="https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=280&center=lonlat:71.398368,51.090435&zoom=14&marker=lonlat:71.39748857817608,51.09047523222131;type:material;color:%23ff3421;icontype:awesome&scaleFactor=2&apiKey="
                gisLink="https://2gis.kz/astana/firm/70000001018129704"
                googleLink="https://www.google.com/maps/place/%D0%9D%D0%B0%D0%B7%D0%B0%D1%80%D0%B1%D0%B0%D0%B5%D0%B2+%D0%A3%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82/@51.0901849,71.3911821,1054m/data=!3m1!1e3!4m10!1m2!2m1!1snazarbayev+university+google+maps!3m6!1s0x424585a5651070df:0xa0e423d92f946f00!8m2!3d51.0905303!4d71.3981646!15sCiFuYXphcmJheWV2IHVuaXZlcnNpdHkgZ29vZ2xlIG1hcHMiA4gBAZIBCnVuaXZlcnNpdHngAQA!16s%2Fm%2F0gvvk01?entry=ttu&g_ep=EgoyMDI1MDIxOS4xIKXMDSoASAFQAw%3D%3D"
            />
        </div>
    );
}
