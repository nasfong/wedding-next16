import { Suspense } from 'react';
import HomeContent from './HomeContent';
import type { Metadata } from 'next';

type PageProps = {
  searchParams: Promise<{ name?: string }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const clientName = params.name || '';
  
  // Build full URL with query parameters
  const baseUrl = 'https://wedding.nasfong.site';
  const fullUrl = clientName 
    ? `${baseUrl}/?name=${encodeURIComponent(clientName)}`
    : baseUrl;
  
  const title = clientName 
    ? `Wedding Invitation for ${clientName} - សិរីមង្គលអាពាហ៍ពិពាហ៍`
    : 'Wedding Invitation - សិរីមង្គលអាពាហ៍ពិពាហ៍ | Tangfong & Sreyren';
  
  const description = clientName
    ? `សូមគោរពអញ្ជើញ ${clientName} ចូលរួមជាភ្ញៀវកិត្តិយស ក្នុងសិរីមង្គលអាពាហ៍ពិពាហ៍ របស់ សំណាង តាំងហ្វុង និង ង៉ិន ស្រីរ៉េន នៅថ្ងៃអាទិត្យ ទី១៦ ខែវិច្ឆិកា ឆ្នាំ២០២៥`
    : 'យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយស ក្នុងសិរីមង្គលអាពាហ៍ពិពាហ៍ កូនប្រុស សំណាង តាំងហ្វុង និង កូនស្រី ង៉ិន ស្រីរ៉េន នៅថ្ងៃអាទិត្យ ទី១៦ ខែវិច្ឆិកា ឆ្នាំ២០២៥';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl, // Dynamic URL with query parameters
      siteName: 'Wedding Invitation - Tangfong & Sreyren',
      images: [
        {
          url: 'https://wedding.nasfong.site/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Wedding Invitation - Samnang Tangfong & Ngin Sreyren',
          type: 'image/jpeg',
        },
      ],
      locale: 'km_KH',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://wedding.nasfong.site/og-image.jpg'],
    },
    alternates: {
      canonical: fullUrl, // Canonical URL with query parameters
    },
  };
}

export default async function HomePage({ searchParams }: PageProps) {
  await searchParams; // Await to satisfy Next.js requirements
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
