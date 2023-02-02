import { AuthorFactory } from "./posts/author.entity";
import { PostFactory } from "./posts/post.entity";
import sanitize from "sanitize-html";

const authorFactory = new AuthorFactory(sanitize);
const postFactory = new PostFactory({
    sanitize,
    createAuthor: authorFactory.create.bind(authorFactory),
});

export { postFactory };
