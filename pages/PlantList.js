import PlantList from "@/pages/components/PlantList/PlantList";
import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function PlantListPage() {
  const { data, isLoading } = useSWR("/api/plants");
  console.log(`data: ${data}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return null;
  }

  return <PlantList plants={data} />;
}