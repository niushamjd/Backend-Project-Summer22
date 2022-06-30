const Joi = require('joi');
const schemas = {
    add: Joi.object().keys({
        title: Joi.string().required(),
        author: Joi.string().optional()
    }),
    update: Joi.object().keys({
        bookId: Joi.number().required(),
        title: Joi.string().optional(),
        author: Joi.string().optional()
    }),
    getbook: Joi.number().min(1).required()
   ,
   displayParams : Joi.object().keys({
         page: Joi.number().min(1).optional(),
            limit: Joi.number().min(1).optional(),
   }),
   addUser: 
    Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }),
    UserLogin:
    Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })

}
export default schemas;