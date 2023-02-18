import mongoose from "mongoose";

export const authorSchema = new mongoose.Schema({
    fullname: String,
    linkToProfile: String,
    profilePicture: String,
});
