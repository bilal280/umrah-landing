import "./globals.css";
import "@fontsource/cairo/400.css";
import "@fontsource/cairo/700.css";
import { CartProvider } from "../lib/cartContext";

export const metadata = {
  title: "منصة مآثر - تبرع بالأضاحي في أفريقيا",
  description: "منصة إلكترونية متكاملة للتبرع بالأضاحي في دول أفريقيا. اختر أضحيتك (خروف، بقرة، جمل) وشارك الأجر مع الفقراء والمساكين بإشراف شرعي موثوق.",
  keywords: "أضاحي، تبرع، أفريقيا، خروف، بقرة، جمل، صدقة، عيد الأضحى",
  authors: [{ name: "منصة اكتفاء" }],
  creator: "منصة اكتفاء",
  publisher: "منصة اكتفاء",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.iktifaplatform.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "منصة مآثر - تبرع بالأضاحي في أفريقيا",
    description: "منصة إلكترونية متكاملة للتبرع بالأضاحي في دول أفريقيا. اختر أضحيتك وشارك الأجر مع الفقراء والمساكين.",
    url: 'https://www.iktifaplatform.com',
    siteName: 'منصة اكتفاء',
    images: [
      {
        url: 'لوغو مآثر-01-01.png',
        width: 800,
        height: 600,
        alt: 'منصة مآثر',
      },
    ],
    locale: 'ar_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "منصة اكتفاء - تبرع بالأضاحي في أفريقيا",
    description: "منصة إلكترونية متكاملة للتبرع بالأضاحي في دول أفريقيا",
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-cairo antialiased bg-white text-black">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
