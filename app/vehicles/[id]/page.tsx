// app/vehicles/[id]/page.tsx
import { Metadata } from 'next';
import VehicleDetail from './VehicleDetail';

export async function generateStaticParams() {
  return ['1', '2', '3', '4', '5'].map((id) => ({ id }));
}

type Params = {
  params: {
    id: string;
  };
};

export default function VehicleDetailPage({ params }: Params) {
  return <VehicleDetail vehicleId={params.id} />;
}