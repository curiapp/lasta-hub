import Joi from "joi";

const eventSchema = Joi.object({
    date: Joi.string().required(),
    title: Joi.string().required()
});

export { eventSchema }