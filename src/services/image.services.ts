import cloudinary from "cloudinary";
import appConfig from "@/config/index";
import sharp from "sharp";
import { Readable } from "stream";

export class ImageServices {
    private setupUploader() {
        cloudinary.v2.config({
            cloud_name: appConfig.cloudinaryCloudName,
            api_key: appConfig.cloudinaryApikey,
            api_secret: appConfig.cloudinaryApiSecret,
        });
    }

    private createReadableStream(buffer: Buffer) {
        const readable = new Readable({
            read() {
                this.push(buffer);
                this.push(null);
            },
        });
        return readable;
    }

    private async compressImage(file: any): Promise<Buffer> {
        const imageBuffer = await sharp(file.buffer)
            .png({ quality: 20 })
            .toBuffer();

        return imageBuffer;
    }

    private createStreamUploader(userid: string, cb: Function) {
        const streamUploader = cloudinary.v2.uploader.upload_stream(
            {
                folder: "Social media",
                public_id: `${userid}_profile_picture`,
                eager: {
                    width: 500,
                    height: 500,
                    crop: "fill",
                },
            },
            (err, res) => {
                if (err) throw err;
                return cb(res?.secure_url);
            }
        );
        return streamUploader;
    }

    async upload(file: any, userid: string) {
        // Compress image and get image buffer
        const imageBuffer = await this.compressImage(file);

        return new Promise((resolve, reject) => {
            // Setup cloudinary
            this.setupUploader();
            // Cloudinary stream uploader
            const streamUploader = this.createStreamUploader(userid, resolve);
            // Create stream from buffer and upload to cloudinary
            this.createReadableStream(imageBuffer).pipe(streamUploader);

            // TODO: stream error handling
            // ! Important because it can cause memory leaks
        });
    }
}
