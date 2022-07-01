import { Response, Request, NextFunction } from "express";
import { httpException } from "../common/errorHandler";
const erroHandlerMiddleware = (err: httpException , req: Request, res: Response, next: NextFunction) => {
    err.message = err.message || "Something went wrong";
    err.status = err.status || 500;
    res.status(err.status);
    res.send(err);
}

export default erroHandlerMiddleware;