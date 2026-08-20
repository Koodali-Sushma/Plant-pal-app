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
    <div className="grid grid-cols-2 m-auto gap-5  list-none w-100">
    {data.map((plants) => (
        <li key={plants._id} className=" group relative h-48 w-48 overflow-hidden rounded-xl border">
            {plants.imageUrl && (  
             <Image
            placeholder="blur"
            blurDataURL={plants.imageUrl}
            src={plants.imageUrl}
            alt={plants.name}
            fill
            sizes="(max-width: 768px) 50vw, 300px"
            className="object-cover transition-transform duration-300  z-0"/> 
             )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-linear-to-t from-black/70 to-transparent z-1" />            <Link className="absolute left-0 top-0 flex flex-col p-3" href={`/${plants._id}`}>
            <span className="font-semibold text-white drop-shadow-md z-1 absolute-bottom-0 left-0">
            {plants.name} 
            </span> 
            <span className="text-sm text-blue drop-shadow-md">
             {plants.botanicalName}</span>
             </Link>
            
        </li>
    ))}
    </div>
)};