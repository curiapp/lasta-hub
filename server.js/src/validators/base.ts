import Joi from "joi";

const programmeIdSchema = Joi.object({ programmeId: Joi.string().required() });

const programmeBaseSchema = Joi.object({
  ...programmeIdSchema,
  date: Joi.date().required(),
});

export { programmeBaseSchema, programmeIdSchema };
