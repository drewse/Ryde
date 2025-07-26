// app/vehicles/[id]/page.tsx
import VehicleDetail from './VehicleDetail';

type PageProps = {
  params: { id: string };
};

export function generateStaticParams() {
  return ['1', '2', '3', '4', '5'].map((id) => ({ id }));
}

export default function VehicleDetailPage({ params }: PageProps) {
  return <VehicleDetail vehicleId={params.id} />;
}