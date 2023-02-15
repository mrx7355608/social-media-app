import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { ImageServices } from "@/services/image.services";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function changePictureController({
    uploadProfilePicture,
    imageServices,
}: {
    uploadProfilePicture: (
        url: string,
        userid: string
    ) => Promise<IUserDBModel>;
    imageServices: ImageServices;
}) {
    return async function (httpRequest: IHttpRequest) {
        try {
            // Upload image
            const imgUrl = (await imageServices.upload(
                httpRequest.file,
                httpRequest.user._id
            )) as string;

            // Update user
            await uploadProfilePicture(imgUrl, httpRequest.user._id);

            return {
                statusCode: 200,
                body: { message: "Profile picture has been updated!" },
            };
        } catch (err: any) {
            console.log(err);
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
