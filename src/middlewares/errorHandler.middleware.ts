import { Response, Request, NextFunction } from "express";
import { errorHandler } from "../common/errorHandler";
import { responseHandler } from "../common/responseHandler";
const erroHandlerMiddleware = (err: errorHandler | responseHandler, req: Request, res: Response, next: NextFunction) => {
    err.message = err.message || "Something went wrong";
    err.status = err.status || 500;
    res.status(err.status);
    res.send(err.message);
}
export default erroHandlerMiddleware;