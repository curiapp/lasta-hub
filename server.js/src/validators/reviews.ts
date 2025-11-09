import Joi from "joi";
import { programmeIdSchema } from "./base";

const reviewRecommendSchema = programmeIdSchema.append({
  reviewUnit: Joi.string()
    .valid("TLA", "CE", "QA", "COLL", "PDU")
    .required()
    .messages({
      "any.only": "Review unit must be one of: TLA, CE, QA, COLL, PDU",
    }),
  decision: Joi.string().valid("recommend", "defer").required().messages({
    "any.only": "Status must be one of: recommend, defer",
  }),
});

export { reviewRecommendSchema };
