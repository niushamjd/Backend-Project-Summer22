import express from 'express'
import { FilterParams } from './dto/filter.params';
import { PaginationParams } from './dto/pagination.params';
import BooksController from './controllers/books.controller';
import knexdb from './db/knex';
import erroHandlerMiddleware from './middlewares/error.mw';
import responseHandlerMiddleware from './middlewares/response.middleware';

export class applc {
app=express();
constructor(){
    this.app=express();
    this.start();
}
start(){
    knexdb.init();
    this.listen();
    this.routeConfig();
}
listen(){
    
    this.app.listen(3001,()=>{
        console.log('Server is running on port 3001');
    });
}
routeConfig(){
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.app.use('/books', BooksController);
    this.app.use(erroHandlerMiddleware);
    this.app.use(responseHandlerMiddleware);
}   

}
declare global {
    namespace Express {
      interface Request {
        pagination: PaginationParams; 
        filters: FilterParams;
      }
    }
  }
const app=new applc();