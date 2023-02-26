export interface IErrorServices {
    notFoundError(message: string): never;
    validationError(message: string): never;
    authenticationError(message: string): never;
    forbiddenError(message: string): never;
}
