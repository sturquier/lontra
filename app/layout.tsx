import type { Metadata } from 'next';
import Head from 'next/head'

import { Header } from '@components/index';
import { lato } from '@config/font';
import StoreProvider from './provider';
import "@style/index.scss";

export const metadata: Metadata = {
  title: {
    template: "Lontra | %s",
    default: "Lontra | Home"
  },
  description: "Lontra application",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={lato.className}>
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
