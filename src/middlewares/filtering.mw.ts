import { Response, Request, NextFunction } from 'express';
import { FilterParams } from '../dto/filter.params';
export function filterHandler(req:Request, res:Response, next:NextFunction) {
    const filterParams:FilterParams = req.query;
    let titleRes: string = filterParams.title ? filterParams.title : "";
    let authorRes: string = filterParams.author ? filterParams.author : "";
    let bookIdRes: number = filterParams.bookId ? parseInt("" + filterParams.bookId) : 0;   
    

    const filter: FilterParams = {
        title: titleRes,
        author: authorRes,
        bookId: bookIdRes
    }
    req.filters = filter;


    next();
}