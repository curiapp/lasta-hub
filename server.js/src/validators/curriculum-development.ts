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

const appointPacSchema = Joi.object({
  ...programmeIdSchema,
  members: Joi.array().items(memberDetailsSchema),
});

const draftValidateSchema = Joi.object({
  ...programmeIdSchema,
  decision: Joi.string().valid("approve", "decline").required().messages({
    "any.only": "Status must be one of: approve, decline",
  }),
});

const appointCDCSchema = Joi.object({
  ...programmeIdSchema,
  members: Joi.array().items(memberDetailsSchema),
});

const reviewSchema = Joi.object({
  ...programmeIdSchema,
  code: Joi.string().required(),
  initiator: Joi.string().required(),
});

export {
  appointPacSchema,
  draftValidateSchema,
  appointCDCSchema,
  reviewSchema,
};
