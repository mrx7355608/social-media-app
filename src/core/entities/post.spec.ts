import { postFactory } from ".";

describe("Post entity", function () {
    it("throws error when post likes contain invalid values", function () {
        expect(() =>
            postFactory.create({
                body: "Hi I am a new post, its good to see you :D",
                author: {},
                likes: ["lallala", undefined],
                comments: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            } as any)
        ).toThrow("Post likes contain one or more invalid values");
    });

    it("throws error when post comments contain invalid values", function () {
        expect(() =>
            postFactory.create({
                body: "Hi I am a new post, its good to see you :D",
                author: {},
                likes: [],
                comments: ["id", 13],
                createdAt: new Date(),
                updatedAt: new Date(),
            } as any)
        ).toThrow("Post comments contain one or more invalid values");
    });

    it("sanitizes post body", function () {
        const newPost = postFactory.create({
            body: "Hi I am a new post, its good to see you :D<script>some malicious code</script>",
            author: {},
            likes: [],
            comments: ["id"],
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any);
        expect(newPost.body).toBe("Hi I am a new post, its good to see you :D");
    });

    it("creates a post", function () {
        const post = postFactory.create({
            author: "63ff2edac17f72c3cf8e1626",
            body: "My post should be liked by 10 people",
            likes: [],
            comments: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});
