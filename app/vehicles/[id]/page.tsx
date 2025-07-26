import VehicleDetail from './VehicleDetail';

export function generateStaticParams() {
  return ['1', '2', '3', '4', '5'].map(id => ({ id }));
}

// Let Next.js handle type inference here — no custom PageProps type
export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  return <VehicleDetail vehicleId={params.id} />;
}
