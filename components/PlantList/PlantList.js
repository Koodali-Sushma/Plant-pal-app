import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function PlantList(plants) {
    const { data, isLoading } = useSWR("/api/plants");
   

    if(isLoading) {
        return <h1>Loading...</h1>
    }

    if (!data) {
        return;
    }

return (
    <div className="grid grid-cols-2  gap-5 m-1.5 list-none w-200">
    {data.map((plants) => (
        <li key={plants._id} className="relative h-48 w-full overflow-hidden rounded-xl border">
            <Link className="absolute left-0 top-0 flex flex-col p-3" href={`/${plants._id}`}><span className="font-semibold text-white drop-shadow-md">
            {plants.name} 
            </span> 
            <span className="text-sm text-white/90 drop-shadow-md">
             {plants.botanicalName}</span>
             </Link>
             {plants.imageUrl && (  
             <Image
            src={plants.imageUrl}
            width={500}
            height={500}
            alt="Picture of the plant"
            className="object-cover"/> 
             )}
        </li>
    ))}
    </div>
)};