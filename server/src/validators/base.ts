import Joi from "joi";

const programmeIdSchema = Joi.object({ programmeId: Joi.string().required() });

const programmeBaseSchema = programmeIdSchema.append({
  date: Joi.date().required(),
});

export { programmeBaseSchema, programmeIdSchema };
