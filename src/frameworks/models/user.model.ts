import { IUser, IUserPendingRequest } from "@/core/interfaces/user.interfaces";
import mongoose from "mongoose";

const pendingRequestSchema = new mongoose.Schema<IUserPendingRequest>(
    {
        friendId: String,
        fullname: String,
        linkToProfile: String,
        profilePicture: String,
    },
    { id: false, _id: false }
);
const userSchema = new mongoose.Schema(
    {
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
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            required: true,
        },
        pendingRequests: {
            type: [pendingRequestSchema],
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
    },
    {
        timestamps: true,
    }
);

export const UserModel = mongoose.model<IUser>("User", userSchema);
