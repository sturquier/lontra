import type { Metadata } from 'next';

import Profile from './page';

export const metadata: Metadata = {
  title: 'Profile'
}

export default function ProfileLayout() {
  return <Profile />
}