/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['cloud.appwrite.io','images.pexels.com','example.com','firebasestorage.googleapis.com','schoolnextproject.s3.us-east-2.amazonaws.com'],
      },
      async headers() {
        return [
          {
            // matching all API routes
            source: '/api/:path*',
            headers: [
              { key: 'Access-Control-Allow-Credentials', value: 'true' },
              { key: 'Access-Control-Allow-Origin', value: '*' },
              {
                key: 'Access-Control-Allow-Methods',
                value: 'GET,DELETE,PATCH,POST,PUT',
              },
              {
                key: 'Access-Control-Allow-Headers',
                value:
                  'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
              },
            ],
          },
        ];
      },
};

export default nextConfig;
