
import VehicleDetail from './VehicleDetail';

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

export default function VehicleDetailPage({ params }: PageProps) {
  return <VehicleDetail vehicleId={params.id} />;
}
