// app/vehicles/[id]/page.tsx
import VehicleDetail from './VehicleDetail';

export default function VehiclePage({
  params,
}: {
  params: { id: string };
}) {
  return <VehicleDetail vehicleId={params.id} />;
}

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}
