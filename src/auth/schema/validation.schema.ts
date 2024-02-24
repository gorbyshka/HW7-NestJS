import * as Joi from 'joi';

export const createUserSchema = Joi.object({

  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),

});

export const signInUserSchema = Joi.object({

  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  
});
