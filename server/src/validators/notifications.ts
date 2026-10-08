import Joi from "joi";

const notificationSchema = Joi.object({
    id: Joi.string().required(),
    userId: Joi.string().required()
});

export { notificationSchema }