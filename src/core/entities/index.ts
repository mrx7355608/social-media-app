import { UserFactory } from "./user.entity";
import { PostFactory } from "./post.entity";
import { CommentFactory } from "./comment.entity";
import sanitize from "sanitize-html";
import validator from "validator";

const commentFactory = new CommentFactory(sanitize);
const postFactory = new PostFactory(sanitize);
const userFactory = new UserFactory(
    sanitize,
    detectSpecialChars,
    validator.isEmail,
    validator.isURL
);

export { userFactory, postFactory, commentFactory };

/* HELPER FUNCTIONS FOR ENTITY FACTORIES*/
function detectSpecialChars(str: string): boolean {
    const regex = /[^A-Za-z 0-9 ']/g;
    return regex.test(str);
}
