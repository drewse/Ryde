// app/vehicles/[id]/page.tsx
import VehicleDetail from './VehicleDetail';
import { Metadata } from 'next';

type Params = { id: string };

export async function generateStaticParams(): Promise<Params[]> {
  return ['1', '2', '3', '4', '5'].map((id) => ({ id }));
}

export default function VehicleDetailPage({ params }: { params: Params }) {
  return <VehicleDetail vehicleId={params.id} />;
}