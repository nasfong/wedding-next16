import InvitationClient from './InvitationClient';

type PageProps = {
  searchParams: Promise<{ name?: string }>;
};

export default async function InvitationPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const clientName = params.name || null;
  
  return <InvitationClient clientName={clientName} />;
}
