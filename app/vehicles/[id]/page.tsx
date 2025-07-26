// Trigger full rebuild

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

export default async function VehicleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <VehicleDetail vehicleId={params.id} />;
}
