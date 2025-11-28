import Joi from "joi";
import { programmeBaseSchema, programmeIdSchema } from "./base";

const reviewStartSchema = programmeBaseSchema.append({
    date: Joi.date().required(),
    includesWilComponent: Joi.boolean().required(),
    recommendedTo: Joi.array()
        .items(Joi.string().valid("CEU", "COLL", "TLP"))
        .min(1)
        .required()
        .messages({
            "any.only": "Review unit must include only: CEU, COLL, TLP",
            "array.includes": "Review unit must include only: CEU, COLL, TLP",
            "array.min": "Review unit must have at least one value",
        })
});

const reviewRecommendSchema = programmeIdSchema.append({
    entity: Joi.string().valid("adstlt", "ceu", "pdqa").required().messages({
        "any.only": "Review unit must be one of: adstlt, ceu, pdqa",
    }),
    decision: Joi.string().valid("endorse", "defer").required().messages({
        "any.only": "Status must be one of: endorse, defer",
    }),
});

export { reviewRecommendSchema, reviewStartSchema };
