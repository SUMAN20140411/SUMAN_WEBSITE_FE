import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const handleRouteChange = (url: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-HMD20SMTK5', {
        page_path: url,
      });
    }
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
    <Head>
      {/* google & naver 사이트 확인 태그 (임의 변경 금지) */}
      <meta name="google-site-verification" content="iT2-OO3Wat9zt_bq-t7Y0F24HWiIyWTz_OsvEyvLd9c" />
      <meta name="naver-site-verification" content="b90c2478a5b6431a748fa0e68d931f04dc9e4fa9" />
      <link rel="icon" sizes="16x16" href="/images/logo.ico" />
    </Head>
      {/* GA4 스크립트 삽입 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-HMD20SMTK5`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HMD20SMTK5', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
}
