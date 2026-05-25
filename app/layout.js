import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "EBOO - Travel and Tours Booking Template",
  description: "Travel and tours booking homepage",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Merienda:wght@300..900&display=swap"
          rel="stylesheet"
        />
        <link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
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
        <div id="preloader">
          <div id="status"></div>
        </div>
        <Header />
        {children}
        <Footer />
        <div id="back-to-top">
          <a href="#"></a>
        </div>
        <div id="search1">
          <button type="button" className="close">
            x
          </button>
          <form>
            <input type="search" value="" placeholder="type keyword(s) here" readOnly />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
        <Script src="/js/jquery-3.5.1.min.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/js/plugin.js" strategy="afterInteractive" />
        <Script src="/js/main.js" strategy="afterInteractive" />
        <Script src="/js/custom-swiper2.js" strategy="afterInteractive" />
        <Script src="/js/custom-nav.js" strategy="afterInteractive" />
  
      </body>
    </html>
  );
}
