/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 88],
  },
  // Formats were retired as a browse dimension in July 2026 and replaced by
  // themes. Each format page maps onto the pillar it always delivered.
  async redirects() {
    return [
      {
        source: "/awakening/type/insight",
        destination: "/awakening/theme/ai-clarity",
        permanent: true,
      },
      {
        source: "/awakening/type/guide",
        destination: "/awakening/theme/ai-fluency",
        permanent: true,
      },
      {
        source: "/awakening/type/value",
        destination: "/awakening/theme/ai-value",
        permanent: true,
      },
      // The VVIP call was renamed the Clarity Call (founder, 2026-11-05).
      // /discovery-call was already shared (links page, LinkedIn), so it
      // keeps working, query string (UTMs) included.
      {
        source: "/discovery-call",
        destination: "/clarity-call",
        permanent: true,
      },
      {
        source: "/discovery-call/:path*",
        destination: "/clarity-call/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
