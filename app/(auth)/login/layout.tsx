import { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login'
}

export default function LoginLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
