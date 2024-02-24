/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns : [
            {
                protocol: "https",
                hostname: "fakestoreapi.com"
            },
            {
                protocol: "https",
                hostname: "i.ibb.co",
            }
        ]
    }
};

/* Alternativa più breve ma sconsigliata da NextJS per ragioni di sicurezza */

/* 
const nextConfig = {
    images: {
       domains: ["fakestoreapi.com","i.ibb.com"]
    }
};
*/

export default nextConfig;