import Joi from "joi";
import { programmeIdSchema } from "./base";

const memberDetailsSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  emailAddress: Joi.string().required(),
  qualification: Joi.string().required(),
  cellphone: Joi.string().required(),
  workNumber: Joi.string().required(),
  occupation: Joi.string().required(),
  Organization: Joi.string().required(),
});

const appointPacSchema = programmeIdSchema.append({
  members: Joi.array().items(memberDetailsSchema),
});

const draftValidateSchema = programmeIdSchema.append({
  decision: Joi.string().valid("approve", "decline").required().messages({
    "any.only": "Status must be one of: approve, decline",
  }),
});

const appointCDCSchema = programmeIdSchema.append({
  members: Joi.array().items(memberDetailsSchema),
});

const reviewSchema = programmeIdSchema.append({
  code: Joi.string().required(),
  initiator: Joi.string().required(),
});

export {
  appointPacSchema,
  draftValidateSchema,
  appointCDCSchema,
  reviewSchema,
};
