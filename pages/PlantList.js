import PlantList from "@/components/PlantList/PlantList";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import CreatePlantForm from "@/components/createPlantForm";


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
    <span className="flex items-center content-center justify-between gap-3 m-auto w-screen  rounded-xl bg-[#dcebd9]/90 px-4 py-3 sticky top-0 z-30" >
    <h1 className="text-3xl font-extrabold tracking-tight text-[#0d130a]">All Plants </h1>
  <img 
  className="h-12 w-12 shrink-0 object-contain"
  src="https://cdn.midjourney.com/c7070fef-94d7-4568-86dc-a54c5af35571/0_2.png"
  alt="collection of plants in pots"/>
  </span> 
  <div className="flex flex-row w-40  mt-5 bg-[#dcebd9] rounded-xl  ">
    <Link
        href="/"
        className="flex flex-row items-center gap-2 p-0 mt-5 mx-auto rounded-xl font-bold  text-[#0d130a]"
      >
        <img
        className="p-0 w-10 "
        src="./assets/back-arrow.svg"
        alt="image of an arrow pointing left"
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