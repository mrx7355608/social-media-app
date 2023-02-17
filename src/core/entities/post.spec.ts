import { postFactory } from ".";

describe("Post entity", function () {
    it("throws error when post likes contain invalid values", function () {
        expect(() =>
            postFactory.create({
                body: "Hi I am a new post, its good to see you :D",
                author: {},
                likes: ["lallala", undefined],
                comments: [],
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
            } as any)
        ).toThrow("Post comments contain one or more invalid values");
    });
    it("sanitizes post body", function () {
        const newPost = postFactory.create({
            body: "Hi I am a new post, its good to see you :D<script>some malicious code</script>",
            author: {},
            likes: [],
            comments: ["id"],
        } as any);
        expect(newPost.body).toBe("Hi I am a new post, its good to see you :D");
    });
});
