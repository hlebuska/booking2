/* eslint-disable @next/next/no-img-element */
'use client';
import 'dotenv/config';
import { H5 } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import LogoLink from '@/components/ui/logo-link';
import { useRouter } from 'next/navigation';

interface IProps {
    name: string;
    address: string;
    mapSrc: string;
    gisLink: string;
    googleLink: string;
}

export default function BranchCard({ name, address, mapSrc, gisLink, googleLink }: IProps) {
    const router = useRouter();
    const handleBranchSelect = () => {
        router.push(`/branchSelect/serviceSelect`);
    };

    return (
        <div className="flex flex-col gap-2 items-start justify-between rounded-lg border p-2 sm:p-4 text-left text-sm transition-all bg-muted ">
            <div className="h-auto w-full">
                <img src={mapSrc + process.env.NEXT_PUBLIC_GEOAPIFY_API} alt="address" className="w-full " />
            </div>

            <div className="flex justify-between w-full items-end">
                <div className="flex flex-col gap-1 ">
                    <H5 className="">{name}</H5>
                    <p className="leading-tight text-gray-700">{address}</p>
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
                        src={gisLink}
                    />
                    <LogoLink
                        name={'Google Maps'}
                        imgSrc={
                            'https://cdn.iconscout.com/icon/free/png-256/free-google-maps-logo-icon-download-in-svg-png-gif-file-formats--new-logos-pack-icons-2476488.png?f=webp&w=256'
                        }
                        src={googleLink}
                    />
                </div>
            </div>
        </div>
    );
}
