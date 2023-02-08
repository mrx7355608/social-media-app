import { IUser } from "@/core/interfaces/user.interfaces";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<IUser>();

export const UserModel = mongoose.model<IUser>("User", userSchema);
