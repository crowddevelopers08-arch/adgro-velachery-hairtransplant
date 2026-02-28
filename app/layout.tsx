import type React from "react"
import type { Metadata } from "next"
import { Geist, Manrope } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Adgro Hair Transplant Velachery",
  description:
    "At Adgrohair, we aim at enhancing beauty aesthetically with the help of advcance science. Our vision is to provide multi specialty cosmetic and physiotherapy treatments and achieve excellence in patient care.",
  generator: "Nextjs15",
  icons: {
    icon: [
      { url: "/cropped-follicle-growth.png", sizes: "16x16", type: "image/png" },
      { url: "/cropped-follicle-growth.png", sizes: "32x32", type: "image/png" },
      { url: "/cropped-follicle-growth.png", sizes: "48x48", type: "image/png" },
      { url: "/cropped-follicle-growth.png", sizes: "192x192", type: "image/png" },
      { url: "/cropped-follicle-growth.png", sizes: "512x512", type: "image/png" }, 
    ],
    apple: [
      { url: "/cropped-follicle-growth.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/cropped-follicle-growth.png",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${manrope.variable} antialiased`}>
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KDTL5VJD');
          `}
        </Script>

        {/* Google tag (gtag.js) */}
        <Script 
          async 
          src="https://www.googletagmanager.com/gtag/js?id=G-5HBMTWT2GQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5HBMTWT2GQ');
          `}
        </Script>

        {/* Google Ads Tag */}
        <Script 
          async 
          src="https://www.googletagmanager.com/gtag/js?id=AW-11124508870"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11124508870');
          `}
        </Script>

        {/* Microsoft Clarity Analytics */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "u9jq94xn4v");
          `}
        </Script>
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-KDTL5VJD"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        
        {children}
      </body>
    </html>
  )
}