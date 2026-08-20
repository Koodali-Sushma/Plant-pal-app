import PlantList from "@/components/PlantList/PlantList";
import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function PlantListPage() {
     const { data, isLoading } = useSWR("/api/plants");
        console.log(`data: ${data}`);
    
        if(isLoading) {
            return <h1>Loading...</h1>;
        }
    
        if (!data) {
            return null;
        }
  return (
    <>
    <Link
        href="/"
        className="mb-4 inline-block text-emerald-400 hover:underline"
      >
        ← Back to My Plants
      </Link>
    <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-emerald-400 sm:text-5xl sticky">All Plants</h1>
    <PlantList plants={data} />

    </>
  );
}