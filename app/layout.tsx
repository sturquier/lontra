import type { Metadata } from "next";

import Footer from './components/footer/footer';
import Header from './components/header/header';
import "./globals.scss";

export const metadata: Metadata = {
  title: "Lontra",
  description: "Lontra application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
