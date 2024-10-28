import { ReactNode } from 'react';

import { Header } from '@components/index';

export default function HomeLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
