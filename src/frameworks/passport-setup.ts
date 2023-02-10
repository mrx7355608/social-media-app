import { UserDataSource } from "@/data/user.data";
import { Strategy as LocalStrategy } from "passport-local";
import validator from "validator";
import { HashServices } from "@/services/hash.services";

const userDataSource = new UserDataSource();
const hashServices = new HashServices();

export default function (passport: any) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, async function (
            email,
            password,
            done
        ) {
            try {
                if (!validator.isEmail(email)) {
                    return done(null, false, { message: "Invalid email" });
                }

                const user = await userDataSource.findOne({ email });
                if (!user) {
                    return done(null, false, {
                        message: "Incorrect email or password",
                    });
                }

                const isValidPassword = await hashServices.compare(
                    user.password,
                    password
                );
                if (!isValidPassword) {
                    return done(null, false, {
                        message: "Incorrect email or password",
                    });
                }

                return done(null, user);
            } catch (err: any) {
                return done(err);
            }
        })
    );
    passport.serializeUser(function (user: any, done: any) {
        return done(null, user.id);
    });
    passport.deserializeUser(async function (id: string, done: any) {
        try {
            const user = await userDataSource.findById(id);
            return done(null, user);
        } catch (err: any) {
            return done(err);
        }
    });
}
