import express, { Request, Response, NextFunction } from 'express';
import { httpException, WrongInputFormatError } from '../common/errorHandler';
import { addResponse, deleteResponse, displayResponse, httpResponse } from '../common/responseHandler';
import { addUserInput } from '../dto/user.dto';
import { paginationHandler } from '../middlewares/pagination.mw';
import usersService from '../services/users.service';
import schemas from '../validations/validation';
class UsersController{
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    addUser(req: Request, res: Response, next: NextFunction) {
        schemas.addUser.validateAsync(req.body)
            .then(async (userData: addUserInput) => {
                usersService.addUser(userData).then((resp: addResponse) => {
                    next(resp);
                }).catch((err) => {
                    next(err);
                });         
            }).catch((err: Error) => {
                next(new WrongInputFormatError("validation error",err.message));
            });
    }
    displayUsers(req: Request, res: Response, next: NextFunction) {
        const pagination = req.pagination;
        schemas.displayParams.validateAsync(req.params.pagination).then((page:number,limit:number) => {
            usersService.displayUsers(pagination).then((resp: displayResponse) => {
                next(resp);
            }
            ).catch((err) => {
                next(err);
            }
            );
        }).catch((err: any) => {
            next(new WrongInputFormatError(err.message));
        }
        );
    }
    displayUser(req: Request, res: Response, next: NextFunction) {
        schemas.getbook.validateAsync(req.params.id).then((id: number) => {
            usersService.displayUser(id).then((resp:displayResponse) => {
                next(resp);
            }
            ).catch((err) => {
                next(err);
            });
        }).catch((err:any) => {
            next(new WrongInputFormatError(err.message));
        });
    }

    deleteUser(req: Request, res: Response, next: NextFunction) {
        schemas.getbook.validateAsync(req.params.id).then((id: number) => {
            usersService.deleteUser(id).then((resp: deleteResponse) => {
                next(resp);
            }
            ).catch((err) => {
                next(err);
            });
        }).catch((err: any) => {
            next(new WrongInputFormatError(err.message));
        });
    }

    routes() {
        this.router.get('/', paginationHandler, this.displayUsers);
        this.router.post('/', this.addUser);
        this.router.route('/:id')
            .get(this.displayUser)
            .delete(this.deleteUser);
    }
}
export default new UsersController().router;