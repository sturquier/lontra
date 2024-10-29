/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**', pathname: '**' }
    ]
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api']
  }
};

export default nextConfig;
