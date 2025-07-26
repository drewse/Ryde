import VehicleDetail from './VehicleDetail';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ];
}

interface VehiclePageParams {
  params: { id: string };
}

export default function VehiclePage({ params }: VehiclePageParams) {
  return <VehicleDetail vehicleId={params.id} />;
}
