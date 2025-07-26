import VehicleDetail from './VehicleDetail';

type PageProps = {
  params: {
    id: string;
  };
};

// Tell Next.js what dynamic routes to pre-render
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

// Async is required for compatibility with generateStaticParams
export default async function VehicleDetailPage({ params }: PageProps) {
  return <VehicleDetail vehicleId={params.id} />;
}
