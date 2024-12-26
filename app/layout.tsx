import { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';

import { lato } from '@config/font';
import StoreProvider from '@store/provider';
import layoutStyles from '@style/layout.scss';
import themeStyles from '@style/theme.scss';

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

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${lato.className} ${layoutStyles} ${themeStyles}`}>
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
