const Joi = require('joi');
const schemas = {
    add: Joi.object().keys({
        title: Joi.string().required(),
        author: Joi.string().optional()
    }),
    getbook: Joi.number().min(1).required()
   ,
   displayParams : Joi.object().keys({
         page: Joi.number().min(1).required(),
            limit: Joi.number().min(1).required()
   }),
}
export default schemas;