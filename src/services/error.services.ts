import { AppError } from "@/utils/AppError";
import { IErrorServices } from "./interfaces/errorServices.interface";

export class ErrorServices implements IErrorServices {
    notFoundError(message: string): never {
        throw new AppError(message, 404);
    }

    validationError(message: string): never {
        throw new AppError(message, 400);
    }

    authenticationError(message: string): never {
        throw new AppError(message, 401);
    }

    forbiddenError(message: string): never {
        throw new AppError(message, 403);
    }
}
