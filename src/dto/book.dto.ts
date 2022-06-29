export interface createBookInput {
    title: string;
    author: string;
}
export interface updateBookInput {
    bookId: number;
    title?: string;
    author?: string;
}
export interface filterBookInput {
    bookId? : number ;
    title?: string ;
    author?: string ;
}
