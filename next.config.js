const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const nextTranslate = require('next-translate');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
    runtimeCaching,
  },
  // images: {
  //   domains: ['tailwindui.com'],
  // },
  reactStrictMode: true,
  swcMinify: true,
  // trailingSlash: true,

  ...nextTranslate(),
});

module.exports = withBundleAnalyzer(nextConfig);
