import { IPostAuthor } from "../interfaces/post.interfaces";

export class AuthorFactory {
    private sanitize: (str: string) => string;

    constructor(sanitize: (str: string) => string) {
        this.sanitize = sanitize;
    }

    validateName(name: string, label: string) {
        if (!name) {
            throw new Error(`${label} name is missing`);
        }
        if (typeof name !== "string") {
            throw new Error(`Invalid ${label} name`);
        }
        if (this.sanitize(name).length < 4) {
            throw new Error(
                `${label} name should be 4 characters long at least`
            );
        }
    }

    private validatePhoto(photo: string) {
        if (!photo) {
            throw new Error("Author photo is missing");
        }
    }

    private validateLinkToProfile(link: string) {
        if (!link) {
            throw new Error("Author profile link is missing");
        }
    }

    create(authorData: IPostAuthor): IPostAuthor {
        const { firstname, lastname, photo, linkToProfile } = authorData;
        this.validateName(firstname, "First");
        this.validateName(lastname, "Last");
        this.validatePhoto(photo);
        this.validateLinkToProfile(linkToProfile);

        const validFirstName = this.sanitize(firstname);
        const validLastName = this.sanitize(lastname);

        return new Author({
            firstname: validFirstName,
            lastname: validLastName,
            photo,
            linkToProfile,
        });
    }
}
class Author {
    firstname: string;
    lastname: string;
    linkToProfile: string;
    photo: string;

    constructor({ firstname, lastname, linkToProfile, photo }: IPostAuthor) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.photo = photo;
        this.linkToProfile = linkToProfile;
    }
}
