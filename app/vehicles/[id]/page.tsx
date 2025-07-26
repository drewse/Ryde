import VehicleDetail from './VehicleDetail';
import { Metadata } from 'next';

// Optional: define metadata for SEO, if needed
export const metadata: Metadata = {
  title: 'Vehicle Detail',
  description: 'View details for a specific vehicle',
};

// Tell Next.js which dynamic routes to pre-render
export async function generateStaticParams() {
  return ['1', '2', '3', '4', '5'].map((id) => ({ id }));
}

// This is the dynamic route page component
export default function VehicleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <VehicleDetail vehicleId={params.id} />;
}
