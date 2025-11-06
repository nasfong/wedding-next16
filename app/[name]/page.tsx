import { Suspense } from 'react';
import HomeContent from '../HomeContent';
import type { Metadata } from 'next';

type PageProps = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params;
  
  // Safely decode the name - handle cases where it might already be decoded or double-encoded
  let clientName: string;
  try {
    // Try to decode - if it's already decoded, this will just return the same string
    clientName = decodeURIComponent(name);
    // Check if it contains %XX patterns indicating it needs another decode
    if (clientName.includes('%')) {
      try {
        const doubleDecoded = decodeURIComponent(clientName);
        // Only use double decode if it actually changed something
        if (doubleDecoded !== clientName && !doubleDecoded.includes('%')) {
          clientName = doubleDecoded;
        }
      } catch {
        // If second decode fails, stick with first decode
      }
    }
  } catch {
    // If decode fails, use the raw name
    clientName = name;
  }
  
  // Build full URL with the name in the path - encode the clean name once
  const baseUrl = 'https://wedding.nasfong.site';
  const fullUrl = `${baseUrl}/${encodeURIComponent(clientName)}`;
  
  const title = `Wedding Invitation for ${clientName} - សិរីមង្គលអាពាហ៍ពិពាហ៍`;
  const description = `សូមគោរពអញ្ជើញ ${clientName} ចូលរួមជាភ្ញៀវកិត្តិយស ក្នុងសិរីមង្គលអាពាហ៍ពិពាហ៍ របស់ សំណាង តាំងហ្វុង និង ង៉ិន ស្រីរ៉េន នៅថ្ងៃអាទិត្យ ទី១៦ ខែវិច្ឆិកា ឆ្នាំ២០២៥`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl, // Unique URL path for each guest
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
      canonical: fullUrl, // Canonical URL with the name in path
    },
  };
}

export default async function PersonalizedInvitationPage({ params }: PageProps) {
  const { name } = await params;
  
  // Safely decode the name - handle double encoding
  let clientName: string;
  try {
    clientName = decodeURIComponent(name);
    // Check if it still contains encoded characters
    if (clientName.includes('%')) {
      try {
        const doubleDecoded = decodeURIComponent(clientName);
        if (doubleDecoded !== clientName && !doubleDecoded.includes('%')) {
          clientName = doubleDecoded;
        }
      } catch {
        // Stick with first decode
      }
    }
  } catch {
    clientName = name;
  }
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent nameFromPath={clientName} />
    </Suspense>
  );
}
