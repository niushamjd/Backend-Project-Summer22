import express from 'express'
import BooksController from './controllers/books.controller';
import knex from 'knex';
import erroHandlerMiddleware from './middlewares/errorHandler.middleware';
export class applc {
app=express();
constructor(){
    this.app=express();
    this.start();
}
start(){
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
    this.app.use(erroHandlerMiddleware)
}   
}
const app=new applc();