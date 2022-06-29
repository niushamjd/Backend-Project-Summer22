import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../common/errorHandler";
import { PaginationParams } from "../dto/pagination.params";
import  { tokenUserInput } from "../dto/user.dto";
import Authentication from "../utility/auth.token";
declare global {
    namespace Express {
        interface Request {
            user?: tokenUserInput;
            pagination: PaginationParams;
        }
    }
};

export function autheticateUser (req: Request, res: Response, next: NextFunction) {
    const signature = Authentication.verifyToken(req);
    if (signature) {
        return next();
    } else {
        return next(new UnauthorizedException("Unauthorized"));
    }
};