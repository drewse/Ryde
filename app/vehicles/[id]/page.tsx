// app/vehicles/[id]/page.tsx
import VehicleDetail from './VehicleDetail';

export async function generateStaticParams() {
  return ['1', '2', '3', '4', '5'].map((id) => ({ id }));
}

export default function VehicleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <VehicleDetail vehicleId={id} />;
}
