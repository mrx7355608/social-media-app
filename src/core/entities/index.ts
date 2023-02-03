import { UserFactory } from "./users/user.entity";
import sanitize from "sanitize-html";
import validator from "validator";

const userFactory = new UserFactory({
    sanitize,
    detectSpecialChars,
    emailValidator: validator.isEmail,
});

function detectSpecialChars(str: string): boolean {
    const regex = /[^A-Za-z 0-9]/g;
    return regex.test(str);
}

export { userFactory };
