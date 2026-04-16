import {  BadRequestError } from "../errors/AppError.js";
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,   // saare errors ek saath
      stripUnknown: true, // extra fields hata dega
    });

    if (error) {
        const details = error.details.map(d => ({ field: d.path.join('.'), message: d.message }));
      return next(new BadRequestError('Validation error', details));
       
    //   const message= error.details.map(err => err.message).join(",");
      
    // return next(new MissingDetailsError("please fill all the required fields or fill in the correct form"))
    };

    // validated data overwrite kar do
    req.body = value;
    next();
  };
}


export default validate;
