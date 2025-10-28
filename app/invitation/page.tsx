import InvitationClient from './InvitationClient';
import type { Metadata } from 'next';

type PageProps = {
  searchParams: Promise<{ name?: string }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const clientName = params.name || '';
  
  const title = clientName 
    ? `Wedding Invitation for ${clientName} - សិរីមង្គលអាពាហ៍ពិពាហ៍`
    : 'Wedding Invitation - សិរីមង្គលអាពាហ៍ពិពាហ៍ | Samnang & Sreyren';
  
  const description = clientName
    ? `សូមគោរពអញ្ជើញ ${clientName} ចូលរួមជាភ្ញៀវកិត្តិយស ក្នុងសិរីមង្គលអាពាហ៍ពិពាហ៍ របស់ សំណាង តាំងហ្វុង និង ង៉ិន ស្រីរ៉េន`
    : 'យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយស ក្នុងសិរីមង្គលអាពាហ៍ពិពាហ៍';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: 'https://wedding.nasfong.site/invitation',
      siteName: 'Wedding Invitation - Samnang & Sreyren',
      images: [
        {
          url: '/images/gallery/8.jpg',
          width: 1200,
          height: 1600,
          alt: 'Wedding Invitation - Samnang Tangfong & Ngin Sreyren',
        },
      ],
      locale: 'km_KH',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/gallery/8.jpg'],
    },
  };
}

export default async function InvitationPage({ searchParams }: PageProps) {
  await searchParams; // Await to satisfy Next.js requirements
  
  return <InvitationClient />;
}
