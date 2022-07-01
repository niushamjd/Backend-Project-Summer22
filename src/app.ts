import express from 'express';
import { PaginationParams } from './dto/pagination.params';
import BooksController from './controllers/books.controller';
import UsersController from './controllers/users.controller';
import knexdb from './db/knex';
import erroHandlerMiddleware from './middlewares/error.mw';
import responseHandlerMiddleware from './middlewares/response.middleware';
import { filterBookInput } from './dto/book.dto';
import authController from './controllers/auth.controller';
import { tokenUserInput, UserLoginInput } from './dto/user.dto';
import { paginationHandler } from './middlewares/pagination.mw';
import { filterHandler } from './middlewares/filtering.mw';
import authenticateUser from './middlewares/auth.mw';

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
  
  this.app.use(paginationHandler);
    this.app.use(filterHandler)
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.app.use('/login', authController);
    this.app.use('/books', BooksController);
    this.app.use('/users', UsersController);
    this.app.use(erroHandlerMiddleware);
    this.app.use(responseHandlerMiddleware);
    
}   

}

const app=new applc();