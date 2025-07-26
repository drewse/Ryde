// app/vehicles/[id]/page.tsx

import { notFound } from "next/navigation";

interface VehiclePageProps {
  params: { id: string };
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { id } = params;

  // Example fetch - replace with real one
  const res = await fetch(`https://your.api/vehicles/${id}`);
  if (!res.ok) return notFound();

  const vehicle = await res.json();

  return (
    <div>
      <h1>Vehicle ID: {vehicle.id}</h1>
      <p>{vehicle.name}</p>
    </div>
  );
}
