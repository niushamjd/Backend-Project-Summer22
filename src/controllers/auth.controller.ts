import express, { Request, Response, NextFunction } from 'express';
import { UserLoginInput } from '../dto/user.dto';
import * as schemes from '../validations/validation';
import AuthServices from '../services/auth.services';
import { WrongInputFormatError } from '../common/errorHandler';

export class AuthController {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const request = req.body;

        await schemes.default.UserLogin.validateAsync(request)
            .then((user: UserLoginInput) => {
                AuthServices.loginServices(user).then((result) => {
                    res.send(result);
                }).catch((err: any) => {
                    next(err);
                });
            }).catch((err: any) => {
                next(new WrongInputFormatError(err.message));
            });
    }

    routes() {
        this.router.post('/', this.login);
    };
};

const authController = new AuthController();
export default authController.router;