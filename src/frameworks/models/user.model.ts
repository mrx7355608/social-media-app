import { IUser } from "@/core/interfaces/user.interfaces";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<IUser>({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    friends: {
        type: [String],
        required: true,
    },
    pendingRequests: {
        type: [String],
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
    },
});

export const UserModel = mongoose.model<IUser>("User", userSchema);
