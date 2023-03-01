import { mockSanitize } from "@/mocks/sanitize";
import { CommentFactory } from "./comment.entity";

const commentFactory = new CommentFactory(mockSanitize);

describe("Comments entity", function () {
    it("throws error when author is not given", function () {
        expect(() =>
            commentFactory.create({
                author: "",
                text: "First comment",
            })
        ).toThrow("Comment author is missing");
    });
    it("throws error when text is not given", function () {
        expect(() =>
            commentFactory.create({
                author: "63fec182927aea394b1e5f16",
                text: "",
            })
        ).toThrow("Comment text is missing");
    });

    it("do not create a comment with an empty space", function () {
        expect(() =>
            commentFactory.create({
                author: "63fec182927aea394b1e5f16",
                text: " ",
            })
        ).toThrow("Comment text is missing");
    });

    it("sanitizes text", function () {
        const comment = commentFactory.create({
            author: "63fec182927aea394b1e5f16",
            text: "hello",
        });
        expect(comment.text).toBe("hello-sanitized");
    });
});
