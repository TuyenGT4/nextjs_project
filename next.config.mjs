// import config from "./config.js";

// const nextConfig = {
//   env: {
//     DB_URL: config.DB_URL,

//     API: config.API,
//     CLOUDINARY_CLOUD_NAME: config.CLOUDINARY_CLOUD_NAME,
//     CLOUDINARY_API_KEY: config.CLOUDINARY_API_KEY,
//     CLOUDINARY_API_SECRET: config.CLOUDINARY_API_SECRET,
//     GOOGLE_API_KEY: config.GOOGLE_API_KEY,
//     NEXTAUTH_SECRET: config.NEXTAUTH_SECRET,
//     GOOGLE_CLIENT_ID: config.GOOGLE_CLIENT_ID,
//     GOOGLE_CLIENT_SECRET: config.GOOGLE_CLIENT_SECRET,
//     RAZORPAY_KEY_ID: config.RAZORPAY_KEY_ID,
//     RAZORPAY_KEY_SECRET: config.RAZORPAY_KEY_SECRET,
//     PAYPAL_CLIENT_ID: config.PAYPAL_CLIENT_ID,
//     PAYPAL_CLIENT_SECRET: config.PAYPAL_CLIENT_SECRET,
//   },
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URL: process.env.DB_URL,
    API: process.env.API,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    VNPAY_TMN_CODE: process.env.VNPAY_TMN_CODE,
    VNPAY_HASH_SECRET: process.env.VNPAY_HASH_SECRET,
    VNPAY_URL: process.env.VNPAY_URL,
    VNPAY_RETURN_URL: process.env.VNPAY_RETURN_URL,
  },
};

export default nextConfig;
