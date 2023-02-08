import mongoose from "mongoose";

export async function connectToDatabase(url: string): Promise<void> {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(url);
        console.log("Connected to database");
    } catch (err: any) {
        console.log("There was an error while connecting to database");
        process.exit(1);
    }
}
