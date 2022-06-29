import express, { Request, Response, NextFunction } from 'express';
import * as schemas from '../validations/validation';
import bookService from '../services/book.service'
import { createBookInput, updateBookInput } from '../dto/book.dto';
import { WrongInputFormatError } from '../common/errorHandler';
import { addResponse, deleteResponse, displayResponse, updateResponse } from '../common/responseHandler';
import { paginationHandler } from '../middlewares/pagination.mw';
import { filterHandler } from '../middlewares/filtering.mw';

class BooksController {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    addBook(req: Request, res: Response, next: NextFunction) {
        schemas.default.add.validateAsync(req.body)
            .then(async (bookData: createBookInput) => {
                bookService.addBook(bookData).then((resp: addResponse) => {
                    next(resp);
                }).catch((err) => {
                    next(err);
                });         
            }).catch((err: Error) => {
                next(new WrongInputFormatError("validation error",err.message));
            });
    }
    displayAll(req: Request, res: Response, next: NextFunction) {
        const pagination = req.pagination;
        const filters=req.filters;
        schemas.default.displayParams.validateAsync(req.params.pagination).then((page:number,limit:number) => {
            bookService.displayAll(pagination,filters).then((resp: displayResponse) => {
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
    displayBook(req: Request, res: Response, next: NextFunction) {
        schemas.default.getbook.validateAsync(req.params.id).then((id: number) => {
            bookService.displayBook(id).then((resp:displayResponse) => {
                next(resp);
            }
            ).catch((err) => {
                next(err);
            });
        }).catch((err:any) => {
            next(new WrongInputFormatError(err.message));
        });
    }

    deleteBook(req: Request, res: Response, next: NextFunction) {
        schemas.default.getbook.validateAsync(req.params.id).then((id: number) => {
            bookService.deleteBook(id).then((resp: deleteResponse) => {
                next(resp);
            }
            ).catch((err) => {
                next(err);
            });
        }).catch((err: any) => {
            next(new WrongInputFormatError(err.message));
        });
    }
    updateBook(req: Request, res: Response, next: NextFunction) {
        schemas.default.add.validateAsync(req.body).then((bookData: updateBookInput) => {
            bookService.updateBook(bookData).then((resp:updateResponse) => {
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
        this.router.get('/', paginationHandler,filterHandler, this.displayAll);
        this.router.post('/', this.addBook);
        this.router.route('/:id')
            .get(this.displayBook)
            .delete(this.deleteBook)
            .put(this.updateBook);
    }
}
export default new BooksController().router;