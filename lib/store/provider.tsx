'use client';

import { useRef, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { makeStore, AppStore } from '@store/index';

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}