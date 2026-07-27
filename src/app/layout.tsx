import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import LoadingScreen from '@/components/ui/LoadingScreen';
import ScrollToTop from '@/components/ui/ScrollToTop';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shahbaz.dev'),
  title: 'Muhammad Shahbaz | Software Engineer Portfolio',
  description: 'Passionate Software Engineer focused on building scalable web applications, modern user interfaces, and user-friendly digital experiences.',
  keywords: [
    'Muhammad Shahbaz',
    'Software Engineer',
    'Full Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Machine Learning',
    'Web Developer Portfolio',
    'Shahbaz4462'
  ],
  authors: [{ name: 'Muhammad Shahbaz', url: 'https://github.com/Shahbaz4462' }],
  creator: 'Muhammad Shahbaz',
  openGraph: {
    title: 'Muhammad Shahbaz | Software Engineer Portfolio',
    description: 'Passionate Software Engineer building scalable web applications, modern UIs, and machine learning systems.',
    url: 'https://shahbaz.dev',
    siteName: 'Muhammad Shahbaz Portfolio',
    type: 'website',
    images: [
      {
        url: '/projects/blood-bank-preview.svg',
        width: 1200,
        height: 675,
        alt: 'Muhammad Shahbaz Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Shahbaz | Software Engineer Portfolio',
    description: 'Passionate Software Engineer focused on building scalable web applications & modern UIs.',
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
  // Person JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Muhammad Shahbaz',
    jobTitle: 'Software Engineer',
    alumniOf: 'BS Software Engineering',
    url: 'https://github.com/Shahbaz4462',
    sameAs: [
      'https://github.com/Shahbaz4462',
    ],
    knowsAbout: [
      'Software Engineering',
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Python',
      'Machine Learning'
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 selection:bg-primary selection:text-white relative">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LoadingScreen />
          <ScrollProgress />

          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>

          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
