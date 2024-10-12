import type { Metadata, Viewport } from 'next';

import { Header } from '@components/index';
import { lato } from '@config/font';
import StoreProvider from '@store/provider';
import "@style/index.scss";

export const metadata: Metadata = {
  title: {
    template: "Lontra | %s",
    default: "Lontra | Home"
  },
  description: "Lontra application",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
