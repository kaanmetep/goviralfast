/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true, // Uses 308 status code (permanent redirect)
      },
    ];
  },
};

export default nextConfig;
