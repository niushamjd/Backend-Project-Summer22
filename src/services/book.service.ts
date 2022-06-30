import { addResponse, deleteResponse, displayResponse, updateResponse } from '../common/responseHandler';
import { createBookInput, filterBookInput, updateBookInput } from '../dto/book.dto';
import bookRepository from '../repository/book.repository';
import { NotFoundError, DuplicateError, GenericError } from '../common/errorHandler';
import { PaginationParams } from '../dto/pagination.params';
class bookService {
    constructor() {
    }
    addBook(book: createBookInput): Promise<addResponse> {
        return new Promise(async (resolve, reject) => {
                bookRepository.addBook(book).then((res: addResponse) => {
                    resolve(res);
                }
                ).catch((err: GenericError) => {
                    reject(new GenericError(err.message));
                }
                );
        });
    }
    displayAll(pagination:PaginationParams, filters:filterBookInput): Promise<displayResponse> {
        return new Promise((resolve, reject) => {
            bookRepository.displayAll(pagination,filters).then((res: displayResponse) => {
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
        return new Promise(async (resolve, reject) => {
            if (await bookRepository.bookExists(id)) {
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
    updateBook(book: updateBookInput): Promise<updateResponse> {
        return new Promise(async (resolve, reject) => {
            if (await bookRepository.bookExists(book.bookId)) {
                bookRepository.updateBook(book).then((res: updateResponse) => {
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