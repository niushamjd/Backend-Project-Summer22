import express, { Request, Response, NextFunction } from 'express';
import * as schemas from '../validations/book.validation';
import bookService from '../services/book.service'
import Book from '../dto/book.dto';
import { DuplicateError, NotFoundError, WrongInputFormatError } from '../common/errorHandler';
import { addResponse, deleteResponse, updateResponse } from '../common/responseHandler';

class BooksController {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    addBook(req: Request, res: Response, next: NextFunction) {
        schemas.default.add.validateAsync(req.body)
            .then(async (bookData: Book) => {
                bookService.addBook(bookData).then((resp: addResponse) => {
                    res.send(resp);
                }).catch((err) => {
                    next(err);
                });         
            }).catch((err: WrongInputFormatError) => {
                next(new WrongInputFormatError(err.message));
                //error middleware will handle the undefined error, use next and change in appts.ts
            });
    }
    displayAll(req: Request, res: Response, next: NextFunction) {
        bookService.displayAll().then((book: Book[]) => {
            res.send(book);
        }
        ).catch((err) => {
            next(err);
        });
    }
    displayBook(req: Request, res: Response, next: NextFunction) {
        schemas.default.getbook.validateAsync(req.params.id).then((id: number) => {
            bookService.displayBook(id).then((book: Book) => {
                res.send(book);
            }
            ).catch((err) => {
                next(err);
            });
        }).catch((err: WrongInputFormatError) => {
            next(new WrongInputFormatError(err.message));
        });
    }

    deleteBook(req: Request, res: Response, next: NextFunction) {
        schemas.default.getbook.validateAsync(req.params.id).then((id: number) => {
            bookService.deleteBook(id).then((rep: deleteResponse) => {
                res.send(rep);
            }
            ).catch((err) => {
                next(err);
            });
        }).catch((err: WrongInputFormatError) => {
            next(new WrongInputFormatError(err.message));
        });
    }
    updateBook(req: Request, res: Response, next: NextFunction) {
        schemas.default.add.validateAsync(req.body).then((bookData: Book) => {
            bookService.updateBook(bookData).then((rep:updateResponse) => {
                res.send(rep);
            }
            ).catch((err) => {
                next(err);
            });
        }).catch((err: WrongInputFormatError) => {
            next(new WrongInputFormatError(err.message));
        });
    }
    routes() {
        this.router.get('/', this.displayAll);
        this.router.post('/', this.addBook);
        this.router.route('/:id')
            .get(this.displayBook)
            .delete(this.deleteBook)
            .put(this.updateBook);
    }
}
export default new BooksController().router;
