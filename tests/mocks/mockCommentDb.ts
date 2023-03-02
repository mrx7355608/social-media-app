import {
    IComment,
    ICommentDBModel,
} from "@/core/interfaces/comment.interfaces";
import { ICommentDataSource } from "@/core/interfaces/commentDataSource.interface";
import { users } from "./mockUserDb";

export class MockCommentsDB implements ICommentDataSource {
    private comments: ICommentDBModel[];

    constructor() {
        this.comments = [];
    }
    async findById(commentId: string): Promise<ICommentDBModel | null> {
        const comment = this.comments.filter(
            (comment) => comment._id === commentId
        )[0];
        return comment;
    }

    async insert(data: IComment): Promise<ICommentDBModel> {
        const comment = {
            _id: Date.now(),
            ...data,
        };

        this.comments.push(comment as ICommentDBModel);
        return comment as ICommentDBModel;
    }

    async update(
        commentId: string,
        changes: IComment
    ): Promise<ICommentDBModel> {
        const comment = await this.findById(commentId);
        this.comments = this.comments.filter((c) => c._id !== commentId);

        const newData = Object.assign(comment as ICommentDBModel, changes);
        this.comments.push(newData as ICommentDBModel);
        return newData;
    }

    async deleteComment(commentId: string): Promise<ICommentDBModel> {
        const comment = await this.findById(commentId);
        this.comments = this.comments.filter((c) => c._id !== commentId);
        return comment as ICommentDBModel;
    }
}
