import Joi from "joi";
import { programmeBaseSchema } from "./base";

const facultyBosRecommendSchema = programmeBaseSchema.append({
  status: Joi.string()
    .valid("recommend-bosec", "resubmit", "defer")
    .required()
    .messages({
      "any.only":
        "Status must be one of: 'recommend-bosec', 'resubmit', 'defer'",
    }),
});

const apcRecommendSchema = programmeBaseSchema.append({
  decision: Joi.string().valid("approve", "decline").required().messages({
    "any.only": "Status must be one of: approve, decline",
  }),
});

const finalSenateSchema = programmeBaseSchema.append({
  decision: Joi.string()
    .valid("endorse", "defer-faculty", "defer-senex")
    .required()
    .messages({
      "any.only": "Status must be one of: endorse, defer-faculty, defer-senex",
    }),
});

export { facultyBosRecommendSchema, apcRecommendSchema, finalSenateSchema };
