import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**', pathname: '**' }
    ]
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
    prependData: `
      $xsm: 480px;
    ` 
  }
};

export default nextConfig;
