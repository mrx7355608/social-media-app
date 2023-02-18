import mongoose from "mongoose";

export const authorSchema = new mongoose.Schema(
    {
        authorId: String,
        fullname: String,
        linkToProfile: String,
        profilePicture: String,
    },
    {
        _id: false,
        id: false,
    }
);
