import { Response, Request, NextFunction } from 'express';
import { filterBookInput } from '../dto/book.dto';
import { PaginationParams } from '../dto/pagination.params';
import { tokenUserInput } from '../dto/user.dto';
import bookRepository from '../repository/book.repository';
declare global {
    namespace Express {
        interface Request {
            user?: tokenUserInput;
            filters: filterBookInput;
            pagination: PaginationParams;
        }
    }
};
export async function paginationHandler(req: Request, res: Response, next: NextFunction) {
    const {page, limit,sort,order} = req.query;
    const total= await bookRepository.totalBooks();
    let pageRes: number = page ? parseInt("" + page) : 1;
    let limitRes: number = limit ? parseInt("" + limit) : total;
    let sortRes: string = sort ? '' + sort : '';
    let orderRes: string = order ? '' + order : 'asc';
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
