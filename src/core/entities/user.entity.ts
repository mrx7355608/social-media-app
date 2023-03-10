import {
    IUser,
    IUserEntity,
    IUserEntityHelpers,
    IUserPendingRequest,
} from "@/core/interfaces/user.interfaces";

export class UserFactory {
    constructor(
        private sanitize: (str: string) => string,
        private detectSpecialChars: (str: string) => boolean,
        private emailValidator: (email: string) => boolean,
        private isValidUrl: (url: string) => boolean
    ) {
        this.sanitize = sanitize;
        this.emailValidator = emailValidator;
        this.detectSpecialChars = detectSpecialChars;
        this.isValidUrl = isValidUrl;
    }

    create(userData: IUser): IUserEntity {
        this.validateName(userData.firstname, "First");
        this.validateName(userData.lastname, "Last");
        this.validateEmail(userData.email);
        this.validatePasswords(
            userData.password,
            userData.confirmPassword as string
        );
        this.validateFriends(userData.friends);
        this.validatePendingRequest(userData.pendingRequests);
        this.validateProfilePicture(userData.profilePicture);

        const validFirstname = this.sanitize(userData.firstname);
        const validLastname = this.sanitize(userData.lastname);

        return new User(
            validFirstname,
            validLastname,
            userData.email,
            userData.password,
            userData.profilePicture,
            userData.isEmailVerified,
            userData.friends,
            userData.pendingRequests
        );
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
            throw new Error("Confirm your password to continue");
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
        // TODO: add valdiation for array values
        // they should be strings only
    }

    private validatePendingRequest(
        pendingRequests: [] | IUserPendingRequest[]
    ): void {
        if (!pendingRequests) {
            throw new Error("User's pending requests are missing");
        }
        // TODO: add valdiation for array values
        // they should be strings only
    }

    private validateProfilePicture(pictureUrl: string): void {
        if (!pictureUrl) {
            throw new Error("Profile picture is missing");
        }
        if (!this.isValidUrl(pictureUrl)) {
            throw new Error("Invalid picture url");
        }
    }
}

class User implements IUserEntity {
    constructor(
        public firstname: string,
        public lastname: string,
        public email: string,
        public password: string,
        public profilePicture: string,
        public isEmailVerified: boolean,
        public friends: string[],
        public pendingRequests: IUserPendingRequest[]
    ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.isEmailVerified = isEmailVerified;
        this.friends = friends;
        this.pendingRequests = pendingRequests;
        this.profilePicture = profilePicture;
    }

    acceptRequest(userid: string): void {
        this.friends.push(userid);
        this.pendingRequests = this.pendingRequests.filter(
            (reqs) => reqs.friendId !== userid
        );
    }

    rejectRequest(userid: string): void {
        this.pendingRequests = this.pendingRequests.filter(
            (request) => request.friendId !== userid
        );
    }

    addRequest(newRequest: IUserPendingRequest): void {
        this.pendingRequests.push(newRequest);
    }

    removeFriend(friendId: string): void {
        this.friends = this.friends.filter((id) => String(id) !== friendId);
    }

    cancelRequest(friendId: string): void {
        this.pendingRequests = this.pendingRequests.filter(
            (reqs) => reqs.friendId !== friendId
        );
    }

    verifyEmail(): void {
        this.isEmailVerified = true;
    }

    updateProfilePicture(url: string): void {
        this.profilePicture = url;
    }
}
