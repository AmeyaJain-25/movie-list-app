/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['page.js'],
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    scrollRestoration: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            titleProp: true,
          },
        },
      ],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/healthz',
        destination: '/api/healthz',
      },
      {
        source: '/api/:path*',
        destination: `https://api.themoviedb.org/3/:path*/`,
      },
    ];
  },
};

module.exports = nextConfig;