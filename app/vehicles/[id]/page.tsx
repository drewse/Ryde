// app/vehicles/[id]/page.tsx
import VehicleDetail from './VehicleDetail';
import { Metadata } from 'next';

export const generateStaticParams = () => {
  return ['1', '2', '3', '4', '5'].map((id) => ({ id }));
};

type Props = {
  params: {
    id: string;
  };
};

export default function VehicleDetailPage({ params }: Props) {
  return <VehicleDetail vehicleId={params.id} />;
}
