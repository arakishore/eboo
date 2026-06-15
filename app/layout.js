import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PartnersLogoSlider from "@/components/PartnersLogoSlider";
import { siteConfig } from "@/config/site";
import { getApiCollection, getServices } from "@/lib/api";
import "bootstrap/dist/css/bootstrap.min.css";
export const metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.seo.defaultKeywords,
};

export default async function RootLayout({ children }) {
  const [partners, servicesMenu] = await Promise.all([
    getApiCollection("partners", []),
    getServices(),
  ]);

  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="/css/style.css" rel="stylesheet" type="text/css" />
        <link href="/css/plugin.css" rel="stylesheet" type="text/css" />
        <link href="/css/about.css" rel="stylesheet" type="text/css" />

        <link href="/fonts/flaticon.css" rel="stylesheet" type="text/css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
        />
        <link rel="stylesheet" href="/fonts/line-icons.css" type="text/css" />
      </head>
      <body suppressHydrationWarning={true}>
        
        <Header services={servicesMenu} />
        {children}
        <PartnersLogoSlider logos={partners} />
        <Footer />
        <Script src="/js/jquery-3.5.1.min.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
       
        {/* custom-swiper2.js is disabled because HeroSection uses Swiper React. */}
      </body>
    </html>
  );
}
