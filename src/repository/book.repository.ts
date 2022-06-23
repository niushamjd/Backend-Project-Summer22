import Book from '../dto/book.dto';
import KnexDB from '../db/knex';
import { NotFoundError, DuplicateError, GenericError } from '../common/errorHandler';
import { addResponse, deleteResponse, displayResponse, updateResponse } from '../common/responseHandler';
let books: Array<Book>;
class bookRepository {
    knx: typeof KnexDB;
    constructor() {
        books = new Array<Book>();
        this.knx = KnexDB;
    }
    bookExists(id: number): boolean {
        this.knx.knexdb('books').where({ bookId: id }).select().then((result) => {
            if (result.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        ).catch((error) => {
            return false;
        }
        );
        return false;
    }
    addBook(book: Book): Promise<addResponse> {
        return new Promise<addResponse>((resolve, reject) => {

            this.knx.knexdb('books').insert(book).then(() => {
                resolve(new addResponse("Book added successfully"));
            }
            ).catch((error) => {
                reject(new GenericError("Error adding book"));
            }
            );

        });
    }
    displayAll(): Promise<displayResponse> {
        return new Promise<displayResponse>((resolve, reject) => {
            this.knx.knexdb('books').select().then((result) => {
                if (result.length > 0) {
                    resolve(new displayResponse("Fetch Succesful", result));
                }
                else {
                    reject(new NotFoundError("No books found"));
                }
            }
            ).catch((error) => {
                reject(new GenericError("Error fetching books"));
            }
            );
        });
    }
    displayBook(id: number): Promise<displayResponse> {
        return new Promise<displayResponse>((resolve, reject) => {
            this.knx.knexdb('books').where({ bookId: id }).select().then((result) => {
                if (result.length > 0) {
                    resolve(new displayResponse("Fetch Succesful", result));
                }
                else {
                    reject(new NotFoundError("No book with id " + id + " found"));
                }
            }
            ).catch((error) => {
                reject(new GenericError("Error fetching books"));
            }
            );
        });
    }
    deleteBook(id: number): Promise<deleteResponse> {
        return new Promise<deleteResponse>((resolve, reject) => {
            this.knx.knexdb('books').where({ bookId: id }).del().then(() => {
                resolve(new deleteResponse("Book deleted successfully"));
            }
            ).catch((error) => {
                reject(new GenericError("Error deleting book"));
            })

        });

    }
    updateBook(book: Book): Promise<updateResponse> {
        return new Promise<updateResponse>((resolve, reject) => {

            this.knx.knexdb('books').where({ bookId: book.bookId }).update(book).then(() => {
                resolve(new deleteResponse("Book deleted successfully"));
            }
            ).catch((error) => {
                reject(new GenericError("Error deleting book"));
            })
        });
    }
}
export default new bookRepository();