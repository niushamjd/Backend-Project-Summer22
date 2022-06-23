import { Response, Request, NextFunction } from "express";
import { httpException } from "../common/errorHandler";
import { httpResponse } from "../common/responseHandler";
const responseHandlerMiddleware = (resp: httpResponse , req: Request, res: Response, next: NextFunction) => {
    resp.message = resp.message || "Successful";
    resp.status = resp.status || 200;
    res.status(resp.status);
    res.send(resp);
}
export default responseHandlerMiddleware;