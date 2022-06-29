import KnexDB from '../db/knex';
import { NotFoundError, DuplicateError, GenericError } from '../common/errorHandler';
import { addResponse, deleteResponse, displayResponse, updateResponse } from '../common/responseHandler';
import { PaginationParams } from '../dto/pagination.params';
import { createBookInput, filterBookInput, updateBookInput } from '../dto/book.dto';
class bookRepository {
    knx: typeof KnexDB;
    constructor() {
        this.knx = KnexDB;
    }

    totalBooks(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.knx.knexdb.count('bookId').from('books').first().then((res) => {
                resolve(res.count);
            }
            ).catch((error) => {
                reject(error);
            }
            );
        }
        );
    }
    bookExists(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.knx.knexdb('books').where({ bookId: id }).select().then((result) => {
                if (result.length > 0) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }
            ).catch((error) => {
                reject(error);
            }
            );
        });
    }
    addBook(book: createBookInput): Promise<addResponse> {
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
    displayAll(pagination: PaginationParams,filters: filterBookInput): Promise<displayResponse> {
        return new Promise<displayResponse>((resolve, reject) => {
            this.knx.knexdb('books').select().where((builder) => {
                if (filters.title)
                    builder.where('title', 'like', '%' + filters.title + '%');
                if (filters.author)
                    builder.where('author', 'like', '%' + filters.author + '%');
                if (filters.bookId)
                    builder.where('bookId', 'like', '%' + filters.bookId + '%');
                    
            }).offset(pagination.offset).limit(pagination.limit).orderBy(pagination.sort,pagination.order).then((result) => {

                resolve(new displayResponse("Fetch Succesful", result));


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
            this.knx.knexdb('books').where("bookId", id).del().then(() => {
                resolve(new deleteResponse("Book deleted successfully"));
            }
            ).catch((error) => {
                reject(new GenericError("Error deleting book"));
            })

        });

    }
    updateBook(book: updateBookInput): Promise<updateResponse> {
        return new Promise<updateResponse>((resolve, reject) => {

            this.knx.knexdb('books').where({ bookId: book.bookId }).update(book).then(() => {
                resolve(new updateResponse("Book updated successfully"));
            }
            ).catch((error) => {
                reject(new GenericError("Error updating book"));
            })
        });
    }
}
export default new bookRepository();