import { IPostAuthor } from "../interfaces/post.interfaces";

export class AuthorFactory {
    private sanitize: (str: string) => string;

    constructor(sanitize: (str: string) => string) {
        this.sanitize = sanitize;
    }

    create(authorData: IPostAuthor): IPostAuthor {
        const { fullname, photo, linkToProfile } = authorData;
        if (!fullname) {
            throw new Error("Author name is missing");
        }
        if (typeof fullname !== "string") {
            throw new Error("Invalid author name");
        }
        if (this.sanitize(fullname).length < 10) {
            throw new Error(
                "Author name should be 10 characters long at least"
            );
        }
        if (!photo) {
            throw new Error("Author photo is missing");
        }
        if (!linkToProfile) {
            throw new Error("Author profile link is missing");
        }

        const validFullName = this.sanitize(fullname);

        return new Author({
            fullname: validFullName,
            photo,
            linkToProfile,
        });
    }
}
class Author {
    fullname: string;
    linkToProfile: string;
    photo: string;

    constructor({ fullname, linkToProfile, photo }: IPostAuthor) {
        this.fullname = fullname;
        this.photo = photo;
        this.linkToProfile = linkToProfile;
    }
}
