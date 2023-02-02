import { IPostData } from "../../interfaces/post.interfaces";
import { postFactory } from "../index";

const postData: IPostData = {
    text: "Hello boisessss what are you doingggg.",
    likes: [],
    comments: [],
    author: {
        fullname: "Fawad khan",
        photo: "my-photo.png",
        linkToProfile: "http://www.social-media.com/myprofile",
    },
};

describe("Post entity", () => {
    it("throws error on invalid text type", function () {
        expect(() =>
            postFactory.create({ ...postData, text: 123 } as any)
        ).toThrow("Invalid post content");
    });

    it("throws error on empty text", function () {
        expect(() =>
            postFactory.create({ ...postData, text: "" } as any)
        ).toThrow("Empty post cannot be created");
    });

    it("like post", function () {
        const post = postFactory.create(postData);
        post.toggleLike("4822-3455-2995-3859");
        expect(post.likes.length).toBe(1);
    });

    it("un-like post", function () {
        // NOTE:  tests share the same post, thats why toggleLike is working properly
        // TODO: figure out what is actually happening
        const post = postFactory.create(postData);
        post.toggleLike("4822-3455-2995-3859");
        expect(post.likes.length).toBe(0);
    });

    it("throws error when author data is missing", function () {
        expect(() =>
            postFactory.create({ ...postData, author: null } as any)
        ).toThrow("Author data is missing");
    });

    it("mark the post as deleted", function () {
        const post = postFactory.create(postData);
        post.markDeleted();
        expect(post.text).toBe("[This post has been deleted]");
    });

    it("sanitizes input", function () {
        const post = postFactory.create({
            ...postData,
            text: "<script>HELLO</script>hello brothers",
        });
        expect(post.text).toBe("hello brothers");
    });
});
