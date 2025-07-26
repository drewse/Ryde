// app/vehicles/[id]/page.tsx
import VehicleDetail from './VehicleDetail';

type Props = {
  params: {
    id: string;
  };
};

// Optional: define static params for SSG
export async function generateStaticParams() {
  return ['1', '2', '3', '4', '5'].map((id) => ({ id }));
}

// Main page component
export default function VehicleDetailPage({ params }: Props) {
  return <VehicleDetail vehicleId={params.id} />;
}
