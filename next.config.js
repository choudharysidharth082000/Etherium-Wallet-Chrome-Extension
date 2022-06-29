/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    serverURL: 'https://prodigalwallet.herokuapp.com/',
  }
}

module.exports = nextConfig
