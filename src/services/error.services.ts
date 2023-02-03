import { AppError } from "@/utils/AppError";
import { IErrorServices } from "./interfaces/errorServices.interface";

export class ErrorServices implements IErrorServices {
    notFoundError(message: string): never {
        throw new AppError(message, 404);
    }

    validationError(message: string): never {
        throw new AppError(message, 400);
    }

    internalServerError(): never {
        throw new AppError("Oops! Something went wrong!", 500);
    }

    invalidIdError(message: string): never {
        throw new AppError(message, 400);
    }
}
