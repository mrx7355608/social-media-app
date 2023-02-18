export default {
    // General
    port: process.env.PORT as string,
    databaseUrl: process.env.DATABASE_URL as string,
    apiUrl: process.env.API_URL as string,
    clientUrl: process.env.CLIENT_URL as string,

    // Nodemailer
    emailUser: process.env.EMAIL_USER as string,
    emailPass: process.env.EMAIL_PASS as string,
    emailHost: process.env.EMAIL_HOST as string,
    emailPort: process.env.EMAIL_PORT as string,
    emailSender: process.env.EMAIL_SENDER,

    // Jwt
    tokenSecret: process.env.AUTH_TOKEN_SECRET as string,
    sessionSecret: process.env.SESSION_SECRET as string,

    // Cloudinary
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    cloudinaryApikey: process.env.CLOUDINARY_API_KEY,
};
