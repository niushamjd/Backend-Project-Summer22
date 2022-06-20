const Joi = require('joi');
const schemas = {
    add: Joi.object().keys({
        title: Joi.string().required(),
        author: Joi.string().optional(),
        bookId: Joi.number().min(1).required()
    }),
    getbook: Joi.number().min(1).required()
   ,
}
export default schemas;