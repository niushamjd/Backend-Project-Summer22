import { Request, NextFunction, Response } from 'express'
import { tokenUserInput } from '../dto/user.dto';
import { PaginationParams } from '../dto/pagination.params';
import { AuthUtilities } from '../utility/auth.utility';
import { filterBookInput } from '../dto/book.dto';

declare global {
    namespace Express {
        interface Request {
            user?: tokenUserInput;
            filters: filterBookInput;
            pagination: PaginationParams;
        }
    }
};

function authenticateUser (req: Request, res: Response, next: NextFunction) {
    const signature = AuthUtilities.validateSignature(req);
    if (signature) {
        return next();
    } else {
        return res.json({ message: 'User not authorized' });
    }
};
export default authenticateUser;