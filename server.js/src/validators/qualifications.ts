import Joi from "joi";
import { programmeBaseSchema, programmeIdSchema } from "./base";

const nqaPduRecommendSchema = Joi.object({
  ...programmeIdSchema,
  submissionType: Joi.boolean().required,
  decision: Joi.string().valid("approve", "defer").required().messages({
    "any.only": "Status must be one of: approve, defer",
  }),
});

const nqaRecommendSchema = Joi.object({
  ...programmeIdSchema,
  decision: Joi.string().valid("approve", "decline").required().messages({
    "any.only": "Status must be one of: approve, decline",
  }),
});

const nqaRegisterSchema = Joi.object({
  ...programmeBaseSchema,
  qtitle: Joi.string().required,
  nqfId: Joi.string().required,
});

const nqaSubmitSchema = Joi.object({
  ...programmeIdSchema,
  isInit: Joi.boolean().required(),
});

export {
  nqaPduRecommendSchema,
  nqaRecommendSchema,
  nqaRegisterSchema,
  nqaSubmitSchema,
};
