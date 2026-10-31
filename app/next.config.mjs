/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  devIndicators: false,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  // esbuild must stay a real Node dependency, not bundled by webpack/turbopack.
  serverExternalPackages: ["esbuild"],
};

export default nextConfig;
