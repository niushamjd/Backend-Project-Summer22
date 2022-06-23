import { addResponse, deleteResponse, displayResponse, updateResponse } from '../common/responseHandler';
import Book from '../dto/book.dto';
import bookRepository from '../repository/book.repository';
import { NotFoundError, DuplicateError, GenericError } from '../common/errorHandler';
class bookService {
    constructor() {
    }
    addBook(book: Book): Promise<addResponse> {
        return new Promise((resolve, reject) => {
            if (bookRepository.bookExists(book.bookId)) {
                reject(new DuplicateError("Book already exists"));
            }
            else {
                bookRepository.addBook(book).then((res: addResponse) => {
                    resolve(res);
                }
                ).catch((err: GenericError) => {
                    reject(new GenericError(err.message));
                }
                );
            }
        });
    }
    displayAll(): Promise<displayResponse> {
        return new Promise((resolve, reject) => {
            bookRepository.displayAll().then((res: displayResponse) => {
                resolve(res);
            }
            ).catch((err) => {
                reject(err)
            });
        });
    }
    displayBook(id: number): Promise<displayResponse> {
        return new Promise((resolve, reject) => {
            bookRepository.displayBook(id).then((res: displayResponse) => {
                resolve(res);
            }
            ).catch((err) => {
                reject(err)
            });
        });
    }
    deleteBook(id: number): Promise<deleteResponse> {
        return new Promise((resolve, reject) => {
            if (bookRepository.bookExists(id)) {
                bookRepository.deleteBook(id).then((res: deleteResponse) => {
                    resolve(res);
                }
                ).catch((err) => {
                    reject(err)
                });
            }
            else {
                reject(new NotFoundError("No book with id " + id + " found"));
            }
        });
    }
    updateBook(book: Book): Promise<updateResponse> {
        return new Promise((resolve, reject) => {
            if (bookRepository.bookExists(book.bookId)) {
                bookRepository.updateBook(book).then((res: deleteResponse) => {
                    resolve(res);
                }
                ).catch((err) => {
                    reject(err)
                });
            }
            else {
                reject(new NotFoundError("No book with id " + book.bookId + " found"));
            }
        });
    }
}
export default new bookService();