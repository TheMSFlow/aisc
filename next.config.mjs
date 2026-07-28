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
    ];
  },
};

export default nextConfig;
