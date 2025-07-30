// app/vehicles/[id]/page.tsx

import VehicleDetail from './VehicleDetail';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

type Params = Promise<{ id: string }>;

export default async function VehiclePage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  return <VehicleDetail vehicleId={id} />;
}
