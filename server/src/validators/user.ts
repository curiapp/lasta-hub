import Joi from "joi";

const createUserSchema = Joi.object({ 
	email: Joi.string().required(),
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	password: Joi.string().required(),
	department: Joi.string().required(),
	role: Joi.string().valid("admin", "pdqa", "lecturer", "hod", "initiator", "cdc", "pac", "bos", "apc", "senate", "adstlt", "ceu", "nqa").required().messages({
    "any.only": "Role must be one of the supported app roles",
  }),
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export { createUserSchema, loginSchema };
