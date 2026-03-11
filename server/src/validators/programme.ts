import Joi from "joi";

const programmeIdSchema = Joi.string().required();

export { programmeIdSchema };
