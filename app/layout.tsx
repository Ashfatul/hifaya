import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#2F6A4F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Hifaya (হিফায়া) — ইসলামিক শিশু হেফাজত, প্রতিদিনের দোয়া ও রুটিন',
  description: 'শিশুদের সুরক্ষা, বদনজর থেকে বাঁচা, সুস্থতা ও পিতা-মাতার প্রতিদিনের আমল, সকাল-সন্ধ্যার হেফাজত এবং ঘুমের মাসনূন দোয়া।',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  keywords: [
    'হিফায়া',
    'Hifaya',
    'শিশু হেফাজত',
    'বদনজর কাটানোর দোয়া',
    'শিশুর সুরক্ষার দোয়া',
    'সকাল সন্ধ্যার আমল',
    'ইসলামিক প্যারেন্টিং',
    'রুকইয়াহ',
    'দুয়া',
  ],
  authors: [{ name: 'Hifaya' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col antialiased selection:bg-[#EBF4EF] selection:text-[#1B362A]">
        {children}
      </body>
    </html>
  );
}
