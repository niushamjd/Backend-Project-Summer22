import express from 'express'
import BooksController from './controllers/books.controller';
import knexdb from './db/knex';
import erroHandlerMiddleware from './middlewares/error.middleware';
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
const app=new applc();