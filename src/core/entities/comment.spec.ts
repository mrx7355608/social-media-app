import { mockSanitize } from "@/mocks/sanitize";
import { CommentFactory } from "./comment.entity";

const commentFactory = new CommentFactory(mockSanitize);

describe("Comments entity", function () {
    it("throws error when author is not given", function () {
        expect(() =>
            commentFactory.create({
                author: "",
                text: "First comment",
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        ).toThrow("Comment author is missing");
    });
    it("throws error when text is not given", function () {
        expect(() =>
            commentFactory.create({
                author: "63fec182927aea394b1e5f16",
                text: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        ).toThrow("Comment text is missing");
    });

    it("do not create a comment with an empty space", function () {
        expect(() =>
            commentFactory.create({
                author: "63fec182927aea394b1e5f16",
                text: " ",
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        ).toThrow("Comment text is missing");
    });

    it("sanitizes text", function () {
        const comment = commentFactory.create({
            author: "63fec182927aea394b1e5f16",
            text: "hello",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        expect(comment.text).toBe("hello-sanitized");
    });
});
