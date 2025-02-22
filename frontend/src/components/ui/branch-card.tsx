/* eslint-disable @next/next/no-img-element */
'use client';
import 'dotenv/config';
import { H5 } from './typography';
import { Button } from './button';
import LogoLink from './logo-link';
import { useRouter } from 'next/navigation';

export default function BranchCard() {
    const router = useRouter();
    const handleBranchSelect = () => {
        router.push(`/branchSelect/serviceSelect`);
    };

    return (
        <div className="flex flex-col gap-2 items-start justify-between rounded-lg border p-2 sm:p-4 text-left text-sm transition-all bg-muted ">
            <div className="h-auto w-full">
                <img
                    src={`https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=280&center=lonlat:71.398368,51.090435&zoom=14&marker=lonlat:71.39748857817608,51.09047523222131;type:material;color:%23ff3421;icontype:awesome&scaleFactor=2&apiKey=

${process.env.NEXT_PUBLIC_GEOAPIFY_API}`}
                    alt="adress"
                    className="w-full "
                />
            </div>

            <div className="flex justify-between w-full items-end">
                <div className="flex flex-col gap-1 ">
                    <H5 className="">Demo Babershop Кабанбай Батыра</H5>
                    <p className="leading-tight text-gray-700">просп. Кабанбай Батыра 53, Астана</p>
                    <Button className="mt-3" onClick={() => handleBranchSelect()}>
                        Выбрать филиал
                    </Button>
                </div>

                <div className="flex gap-3">
                    <LogoLink
                        name={'2Gis'}
                        imgSrc={
                            'https://sun9-51.userapi.com/s/v1/ig2/CVvqr8D7cOh9ZwGl9WZ5Ob-5QzDTKFHzSjwGrahDBiSI993zwmzmdwqtVtbPnNKiqR4YIp7NP-cgyxD2Dx4k8QHy.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1088x1088&from=bu&u=G8MD8CiW0ev-13JeTP-lWOf-S7knhH7kAxDvegJ3uJ8&cs=604x604'
                        }
                        src="/"
                    />
                    <LogoLink
                        name={'Google Maps'}
                        imgSrc={
                            'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-map-icon.png'
                        }
                        src="/"
                    />
                </div>
            </div>
        </div>
        // eslint-disable-next-line @next/next/no-img-element
    );
}
