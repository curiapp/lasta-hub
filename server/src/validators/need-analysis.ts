import Joi from "joi";
import { programmeBaseSchema } from "./base";

const startSchema = Joi.object({
  code: Joi.string().alphanum().min(3).max(30).required(),
  title: Joi.string().required(),
  initiator: Joi.string().required(),
  level: Joi.number().integer().min(4).max(10).required(),
  faculty: Joi.string().required(),
  department: Joi.string().required(),
}).required();

const updateSchema = Joi.object({
  code: Joi.string().alphanum().min(3).max(30).required(),
  title: Joi.string().required(),
  level: Joi.number().integer().min(4).max(10).required(),
}).required();

const consultSchema = Joi.object({
  programmeId: Joi.string().required(),
  organizations: Joi.array().items(
    Joi.object(
      {
        name: Joi.string().required().trim().required(),
        organisation: Joi.string().trim().required()
      }
    )
  ),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});

const concludeSchema = Joi.object({
  programmeId: Joi.string().required(),
  decision: Joi.string()
    .valid("approve", "decline", "defer", "recommend")
    .required()
    .messages({
      "any.only": "Decision must be one of: approve, decline, defer, recommend",
    }),
});

const bosRecommendSchema = programmeBaseSchema.append({
  programmeId: Joi.string().required(),
  status: Joi.string().valid("senate", "bos", "decline").required().messages({
    "any.only": "Status must be one of: senate, bos, decline",
  }),
});

const apcRecommendSchema = programmeBaseSchema.append({
  programmeId: Joi.string().required(),
  status: Joi.string()
    .valid("recommend", "decline", "defer")
    .required()
    .messages({
      "any.only": "Status must be one of: recommend, decline, defer",
    }),
});

const senateRecommendSchema = programmeBaseSchema.append({
  status: Joi.string()
    .valid("approve", "decline", "defer")
    .required()
    .messages({
      "any.only": "Status must be one of: approve, decline, defer",
    }),
});

export {
  startSchema,
  updateSchema,
  consultSchema,
  concludeSchema,
  bosRecommendSchema,
  senateRecommendSchema,
  apcRecommendSchema,
};
