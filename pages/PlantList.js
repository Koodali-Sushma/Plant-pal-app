import PlantList from "@/components/PlantList/PlantList";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import CreatePlantForm from "@/components/createPlantForm";
import { Oswald, Lato } from "next/font/google";
import Image from "next/image";
export default function PlantListPage() {
  const [showForm, setShowForm] = useState(false); /* form to add new plants */
     const { data, isLoading } = useSWR("/api/plants");
      
    
        if(isLoading) {
            return <h1>Loading...</h1>;
        }
    
        if (!data) {
            return null;
        }

     async function handleCreatePlant(data) {
    const response = await fetch("/api/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return false;
    }

    const newPlant = await response.json();

    console.log(newPlant);

    // Revalidate plant data so the new plant appears in the list
    await mutate("/api/plants");

    setShowForm(false);

    return true;
  }

  return (
    <>
    <span className="snap-always flex items-center content-center justify-between gap-3 m-auto w-rounded-3xl w-screen bg-(--color-primary-100) px-4 py-3 sticky top-0 z-30" >
    <h1 className="text-3xl font-extrabold tracking-tight text(--font-heading)">All Plants </h1>
  <Image
  className="h-12 w-12 shrink-0 object-contain"
  src="/images/all-plants-icon-v2.png"
  alt="collection of plants in pots"
  width={500}
  height={500}/>
  </span> 
  <div className="flex flex-row w-40 p-0 mt-5 rounded-3xl">
    <Link
        href="/"
        className="flex flex-row items-center gap-2 p-2 m-3 bg-(--color-primary-100) hover:bg-(color-secondary-500) rounded-3xl text-var(--font-body)"
      >
        <Image
        className="p-0 w-7 "
        src="./assets/back-arrow-light.svg"
        alt="image of an arrow pointing left"
        width={500}
        height={500}
        />MyPlants
      </Link>
      </div>
      

{showForm && (
        <CreatePlantForm
          onSubmitForm={handleCreatePlant}
          onCancel={() => setShowForm(false)}
        />
      )}

      <PlantList
        plants={data}
        onAddPlant={() => setShowForm(true)}
      />

    </>
  );
}