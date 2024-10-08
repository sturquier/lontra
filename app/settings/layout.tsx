import type { Metadata } from 'next';

import Settings from './page';

export const metadata: Metadata = {
  title: 'Settings'
}

export default function SettingsLayout() {
  return <Settings />
}