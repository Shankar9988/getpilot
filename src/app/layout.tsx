import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { AuthProvider } from '@/context/AuthContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Estatify | Verified Real Estate Marketplace India',
  description:
    'Discover genuine verified residential apartments, luxury villas, builder floors, and commercial workspaces across Jaipur, Mumbai, Delhi NCR, Bengaluru, Pune, and Hyderabad. 100% verified listings with direct owner/agent connections.',
  keywords: [
    'real estate india',
    'buy flat jaipur',
    'luxury apartments mumbai',
    'villas for sale',
    'commercial office space',
    'verified property listings',
    'rera approved homes',
  ],
  authors: [{ name: 'GetPlot Real Estate' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://getplot.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    title: 'Estatify | Verified Real Estate Marketplace',
    description:
      'Discover genuine verified residential apartments, luxury villas, and commercial workspaces across India.',
    siteName: 'Estatify',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Estatify Verified Real Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estatify | Verified Real Estate Marketplace',
    description: 'Discover genuine verified residential & commercial properties across India.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Estatify',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logo: 'http://localhost:3000/logo.png',
    description: 'Premier verified real-estate marketplace for residential and commercial properties in India.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
  };

  return (
    <html lang="en" className={`scroll-smooth ${openSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-indigo-600 selection:text-white ${openSans.className}`}>
        <ToastProvider>
          <AuthProvider>
            <FavoritesProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </FavoritesProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
