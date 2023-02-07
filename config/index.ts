// TODO: use .env file
export default {
    apiUrl: "http://localhost:8000/api/v1",
    email: {
        user: "myuser",
        pass: "myuserpass",
        host: "smtp.gmail.com",
        port: 123,
        sender: "bob@example.com",
    },
    token: {
        secret: "some-secret",
    },
};
