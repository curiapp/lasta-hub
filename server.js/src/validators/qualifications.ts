import Joi from "joi";
import { programmeBaseSchema, programmeIdSchema } from "./base";

const nqaPduRecommendSchema = programmeIdSchema.append({
  submissionType: Joi.boolean().required(),
  decision: Joi.string().valid("approve", "defer").required().messages({
    "any.only": "Status must be one of: approve, defer",
  }),
});

const nqaRecommendSchema = programmeIdSchema.append({
  decision: Joi.string().valid("approve", "decline").required().messages({
    "any.only": "Status must be one of: approve, decline",
  }),
});

const nqaRegisterSchema = programmeBaseSchema.append({
  qtitle: Joi.string().required(),
  nqfId: Joi.string().required(),
});

const nqaSubmitSchema = programmeIdSchema.append({
  isInit: Joi.boolean().required(),
});

export {
  nqaPduRecommendSchema,
  nqaRecommendSchema,
  nqaRegisterSchema,
  nqaSubmitSchema,
};
