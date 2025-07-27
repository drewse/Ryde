import VehicleDetail from './VehicleDetail';

type Props = {
  params: { id: string };
};

export default function VehiclePage({ params }: Props) {
  return <VehicleDetail vehicleId={params.id} />;
}

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}
