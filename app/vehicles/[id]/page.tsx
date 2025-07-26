// app/vehicles/[id]/page.tsx

import VehicleDetail from './VehicleDetail';

export async function generateStaticParams() {
  return ['1', '2', '3', '4', '5'].map((id) => ({ id }));
}

export default async function VehicleDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  return <VehicleDetail vehicleId={id} />;
}
