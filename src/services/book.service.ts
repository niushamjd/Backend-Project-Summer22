import { addResponse, deleteResponse, updateResponse } from '../common/responseHandler';
import Book from '../dto/book.dto';
import bookRepository from '../repository/book.repository';
import { NotFoundError, DuplicateError, GenericError } from '../common/errorHandler';
class bookService {
    constructor(){
    }
    addBook(book:Book):Promise<addResponse>{
        return new Promise( (resolve, reject) =>
        { 
             if (bookRepository.bookExists(book.bookId)) {
                    reject(new DuplicateError("Book already exists"));
                }
                else {
                    bookRepository.addBook(book).then((res:addResponse) => {
                        resolve(res);
                    }
                    ).catch((err:GenericError) => {
                        reject(new GenericError(err.message));
                    }
                    );}
        });
    }
    displayAll():Promise<Book[]>{
        return new Promise( (resolve, reject) =>
        {
            bookRepository.displayAll().then((arr:Book[]) => {
                resolve(arr);
            }
            ).catch((err) => {
                reject(err)
            });

        });
    }
    displayBook(id:number):Promise<Book>{
        return new Promise( (resolve, reject) =>
        {
           bookRepository.displayBook(id).then((bk:Book) => {
               resolve(bk);
              }
                ).catch((err) => {
                    reject(err)
                });
        });
    }
    deleteBook(id:number):Promise<deleteResponse>{
        return new Promise( (resolve, reject) =>
        {
           bookRepository.deleteBook(id).then((res:deleteResponse) => {
                resolve(res);
                  }
                ).catch((err) => {
                    reject(err)
                });
        });
    }
    updateBook(book:Book):Promise<updateResponse>{
        return new Promise( (resolve, reject) =>
        {
              bookRepository.updateBook(book).then((res:updateResponse) => {
                resolve(res);
                  }
                ).catch((err) => {
                    reject(err)
                }
                );
        });
    }
}
export default new bookService();