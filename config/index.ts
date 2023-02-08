export default {
    port: process.env.PORT as string,
    databaseUrl: process.env.DATABASE_URL as string,
    apiUrl: process.env.API_URL as string,
    emailUser: process.env.EMAIL_USER as string,
    emailPass: process.env.EMAIL_PASS as string,
    emailHost: process.env.EMAIL_HOST as string,
    emailPort: process.env.EMAIL_PORT as string,
    emailSender: process.env.EMAIL_SENDER,
    tokenSecret: process.env.AUTH_TOKEN_SECRET as string,
};
