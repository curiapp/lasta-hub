import Joi from "joi";

const fileIdSchema = Joi.string().required();

export { fileIdSchema };
