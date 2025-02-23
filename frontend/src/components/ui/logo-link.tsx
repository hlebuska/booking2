/* eslint-disable @next/next/no-img-element */
interface IProps {
    name: string;
    src: string;
    imgSrc: string;
}

export default function LogoLink({ name, src, imgSrc }: IProps) {
    return (
        <a className="w-8 border rounded-sm" href={src} target="_blank">
            <img className="rounded-sm" src={imgSrc} alt={name} />
        </a>
    );
}
