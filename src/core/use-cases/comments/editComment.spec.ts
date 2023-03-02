import { MockCommentsDB } from "@/mocks/mockCommentDb";
import { ErrorServices } from "@/services/error.services";
import { addCommentFactory } from "./addComment";
import { editCommentFactory } from "./editComment";

const commentDb = new MockCommentsDB();
const addComment = addCommentFactory(commentDb);
const editComment = editCommentFactory(
    commentDb,
    new ErrorServices(),
    (str: string) => true
);

describe("Edit comment", function () {
    it("will not edit the comment, if user is not the owner", async function () {
        try {
            const comment = await addComment({
                text: "my comment",
                author: "63fec182927aea394b1e5f16",
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            await editComment(comment._id, "63fec182927aea394b1n5217", {
                text: "not my comment ",
            });
        } catch (err: any) {
            expect(err.message).toBe("You cannot edit this comment");
        }
    });

    it("returns error if comment is not found", async function () {
        try {
            await editComment("1234567890", "63fec182927aea394b1n5217", {
                text: "not my comment ",
            });
        } catch (err: any) {
            expect(err.message).toBe("Comment not found");
        }
    });
});
