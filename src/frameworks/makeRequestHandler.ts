import { IHttpRequest } from "src/controllers/interfaces/httpRequest.interface";
import { Request, Response, NextFunction, RequestHandler } from "express";

export function makeRequest(
    controller: (httpRequest: IHttpRequest) => Promise<any>
): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        const httpRequest: IHttpRequest = {
            body: req.body,
            params: req.params,
            query: req.query,
            user: (req as any).user,
        };
        controller(httpRequest)
            .then((response) => {
                return res.status(response.statusCode).json(response.body);
            })
            .catch((err: any) => {
                console.log(err.message);
                return res.status(500).json({ error: "Something went wrong" });
            });
    };
}
