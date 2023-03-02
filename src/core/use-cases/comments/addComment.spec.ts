import { addCommentFactory } from "./addComment";
import { MockCommentsDB } from "@/mocks/mockCommentDb";

const mockCommentDb = new MockCommentsDB();
const addComment = addCommentFactory(mockCommentDb);

describe("Add comment", function () {
    it("creates a comment", async function () {
        const comment = await addComment({
            author: "63fec182927aea394b1e5f16",
            text: "hello dddd<script>dasdasdas</script>",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        expect(comment.text).toBe("hello dddd");
    });
});
