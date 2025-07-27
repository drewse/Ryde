import VehicleDetail from './VehicleDetail';
import { FC } from 'react';
import { type Metadata, type ResolvingMetadata } from 'next';

type PageProps = {
  params: {
    id: string;
  };
};

const VehiclePage: FC<PageProps> = ({ params }) => {
  return <VehicleDetail vehicleId={params.id} />;
};

export default VehiclePage;

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}
