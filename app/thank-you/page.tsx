"use client";
import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { Header } from '@/components/header';
import Footer from '@/components/footer';
import Thankfooter from '@/components/thank-footer';
import { Thankheader } from '@/components/thankheader';
import Script from 'next/script';

// Thank You Page Component
const ThankYouPage: NextPage = () => {
  return (
    <>
      <Head>
        {/* Google Ads Conversion Tracking */}
        <Script
          id="google-ads-conversion"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              gtag('event', 'conversion', {'send_to': 'AW-11124508870/v7SwCJmXkMQbEMaRyrgp'});
            `
          }}
        />
      </Head>

      <Thankheader />
      
      <div className="min-h-screen bg-gray-50 flex flex-col py-12" style={{ fontFamily: "'Outfit', sans-serif" }}>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center py-12 max-[470px]:py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8 sm:p-10 max-[470px]:p-4 text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Thank You!
              </h1>
              
              <p className="text-lg text-gray-700 max-[740px]:mb-2 mb-8">
                We've received your inquiry about our hair transplant services. Our team will contact you shortly to discuss your personalized hair restoration plan.
              </p>
              
              <div className="bg-red-50 p-6 rounded-lg mb-8 text-left">
                <h2 className="text-xl font-semibold text-red-700 mb-4">What Happens Next?</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    Our hair specialist will contact you within 24 hours
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    We'll schedule a free consultation at your convenience
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    You'll receive a personalized treatment plan
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    We'll answer all your questions about the procedure
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </main>

        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
          body {
            font-family: 'Outfit', sans-serif;
          }
        `}</style>
      </div>
      <Thankfooter />
    </>
  );
};

export default ThankYouPage;