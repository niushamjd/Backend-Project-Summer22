import { Response, Request, NextFunction } from 'express';
import { PaginationParams } from '../dto/pagination.params';
import bookRepository from '../repository/book.repository';

export async function paginationHandler(req: Request, res: Response, next: NextFunction) {
    const {page, limit,sort,order} = req.query;
    const total= await bookRepository.totalBooks();
    let pageRes: number = page ? parseInt("" + page) : 1;
    let limitRes: number = limit ? parseInt("" + limit) : total;
    let sortRes: string = sort ? '' + sort : 'bookId';
    let orderRes: string = order ? '' + order : 'asc';
    //get order in repo
    if (pageRes < 1) {
        pageRes = 1;
    }
    if (limitRes < 1) {
        limitRes = 1;
    }
    const offsetRes = (pageRes - 1) * limitRes;
const pagination: PaginationParams = {
    offset: offsetRes,
    limit: limitRes,
    sort: sortRes,
    order: orderRes
}
req.pagination=pagination;
    next();
};
