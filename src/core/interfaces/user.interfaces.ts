import mongoose from "mongoose";

export interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    profilePicture: string;
    confirmPassword?: string;
    friends: string[];
    pendingRequests: IUserPendingRequest[];
}
export interface IUserDBModel extends IUser, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserEntity extends IUser {
    acceptRequest(userid: string): void;
    rejectRequest(userid: string): void;
    addRequest(newRequest: IUserPendingRequest): void;
    removeFriend(friendId: string): void;
    cancelRequest(friendId: string): void;
}

export interface IUserPendingRequest {
    friendId: string;
    fullname: string;
    profilePicture: string;
    linkToProfile: string;
}

export interface IUserInputData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IUserEntityHelpers {
    sanitize(str: string): string;
    detectSpecialChars(str: string): boolean;
    emailValidator(email: string): boolean;
    isValidUrl(url: string): boolean;
}
