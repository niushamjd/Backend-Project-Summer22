import Book from '../dto/book.dto';
import { NotFoundError, DuplicateError, GenericError } from '../common/errorHandler';
import { addResponse, deleteResponse, updateResponse } from '../common/responseHandler';
let books: Array<Book>;
class bookRepository {
    constructor() {
        books = new Array<Book>();
    }
    bookExists(id: number): boolean {
        for (let i = 0; i < books.length; i++) {
            if (books[i].bookId === id) {
                return true;
            }
        }
        return false;
    }
    addBook(book: Book): Promise<addResponse> {
        return new Promise<addResponse>((resolve, reject) => {
            try {
                books.push(book);
                resolve(new addResponse("Book added successfully"));
            } catch (error) {
                reject(new GenericError);
            }
        }   
        );
    }
    displayAll(): Promise<Book[]> {
        return new Promise<Book[]> ((resolve, reject) => {
            if (books.length == 0) {
                reject(new NotFoundError("No books found"));
            }
            resolve(books);
        });
    }
    displayBook(id: number): Promise < Book > {
            return new Promise<Book>((resolve, reject) => {
                for (let i = 0; i < books.length; i++) {
                    if (books[i].bookId == id) {
                        resolve(books[i]);
                    }
                }
                reject( new NotFoundError("Book not found"));
            });
        }
    deleteBook(id: number): Promise<deleteResponse> {
        return new Promise<deleteResponse>((resolve, reject) => {
        for (let i = 0; i < books.length; i++) {
            if (books[i].bookId == id) {
                books.splice(i, 1);
                resolve(new deleteResponse("Book deleted successfully"));
            }
        }
        reject( new NotFoundError("Book not found"));
        });
    }
    updateBook(book: Book): Promise<updateResponse> {
        return new Promise<updateResponse>((resolve, reject) => {
            for (let i = 0; i < books.length; i++) {
                if (books[i].bookId == book.bookId) {
                    books[i] = book;
                    resolve(new updateResponse("Book updated successfully"));
                }
            }
            reject( new NotFoundError("Book not found"));
        });
    }
}
export default new bookRepository();