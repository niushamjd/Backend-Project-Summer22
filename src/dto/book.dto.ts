class Book {
    bookId: number;
    title: string;
    author: string;
    constructor(id: number, title: string, author: string) {
        this.bookId = id;
        this.title = title;
        this.author = author;
    }
}
export default Book;