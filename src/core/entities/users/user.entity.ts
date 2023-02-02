import {
    IUser,
    IUserEntity,
    IUserEntityHelpers,
    IUserPendingRequest,
} from "@/core/interfaces/user.interfaces";

export class UserFactory {
    private sanitize: (str: string) => string;
    private detectSpecialChars: (str: string) => boolean;
    private emailValidator: (email: string) => boolean;

    constructor({
        sanitize,
        detectSpecialChars,
        emailValidator,
    }: IUserEntityHelpers) {
        this.sanitize = sanitize;
        this.emailValidator = emailValidator;
        this.detectSpecialChars = detectSpecialChars;
    }

    create(userData: IUser): IUserEntity {
        this.validateName(userData.firstname, "First");
        this.validateName(userData.firstname, "Last");
        this.validateEmail(userData.email);
        this.validatePasswords(userData.password, userData.confirmPassword);
        this.validateFriends(userData.friends);
        this.validatePendingRequest(userData.pendingRequests);

        const validFirstname = this.sanitize(userData.firstname);
        const validLastname = this.sanitize(userData.lastname);

        return new User({
            firstname: validFirstname,
            lastname: validLastname,
            email: userData.email,
            password: userData.password,
            confirmPassword: "",
            friends: userData.friends,
            pendingRequests: userData.pendingRequests,
        });
    }

    private validateName(name: string, label: string): void {
        if (!name) {
            throw new Error(`${label} name is missing`);
        }
        if (typeof name !== "string") {
            throw new Error(`${label} name should be text only`);
        }
        if (this.detectSpecialChars(name)) {
            throw new Error(
                `${label} name should not have any special characters`
            );
        }
        if (this.sanitize(name).length < 4) {
            throw new Error(
                `${label} name should be 4 characters long at least`
            );
        }
    }

    private validateEmail(email: string): void {
        if (!email) {
            throw new Error("Email is missing");
        }
        if (typeof email !== "string") {
            throw new Error("Email should be text only");
        }
        if (!this.emailValidator(email)) {
            throw new Error("Invalid email");
        }
    }

    private validatePasswords(password: string, confirmPassword: string): void {
        if (!password) {
            throw new Error("Password is missing");
        }
        if (typeof password !== "string") {
            throw new Error("Password should be text only");
        }
        if (password.length < 10) {
            throw new Error("Password should be 10 characters long at least");
        }

        if (!confirmPassword) {
            throw new Error("Confirm your password to signup");
        }
        if (typeof confirmPassword !== "string") {
            throw new Error("Confirm password should be text only");
        }
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }
    }

    private validateFriends(friends: [] | string[]): void {
        if (!friends) {
            throw new Error("User friends are missing");
        }
    }

    private validatePendingRequest(
        pendingRequests: [] | IUserPendingRequest[]
    ): void {
        if (!pendingRequests) {
            throw new Error("User's pending requests are missing");
        }
    }
}

class User implements IUserEntity {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    friends: string[];
    pendingRequests: IUserPendingRequest[];

    constructor({
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
    }: IUser) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.friends = [];
        this.pendingRequests = [];
    }

    acceptRequest(userid: string): void {
        this.friends.push(userid);
    }

    rejectRequest(userid: string): void {
        this.pendingRequests = this.pendingRequests.filter(
            (request) => request.friendId !== userid
        );
    }

    addFriend(friendId: string): void {
        this.friends.push(friendId);
    }

    removeFriend(friendId: string): void {
        this.friends = this.friends.filter((id) => id !== friendId);
    }
}
