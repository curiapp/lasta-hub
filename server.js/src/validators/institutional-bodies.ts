import Joi from "joi";
import { programmeBaseSchema } from "./base";

const facultyBosRecommendSchema = Joi.object({
  ...programmeBaseSchema,
  status: Joi.string()
    .valid("recommend-bosec", "resubmit", "defer")
    .required()
    .messages({
      "any.only":
        "Status must be one of: 'recommend-bosec', 'resubmit', 'defer'",
    }),
});

const apcRecommendSchema = Joi.object({
  ...programmeBaseSchema,
  decision: Joi.string().valid("approve", "decline").required().messages({
    "any.only": "Status must be one of: approve, decline",
  }),
});

const finalSenateSchema = Joi.object({
  ...programmeBaseSchema,
  decision: Joi.string()
    .valid("endorse", "defer-faculty", "defer-senex")
    .required()
    .messages({
      "any.only": "Status must be one of: endorse, defer-faculty, defer-senex",
    }),
});

export { facultyBosRecommendSchema, apcRecommendSchema, finalSenateSchema };
