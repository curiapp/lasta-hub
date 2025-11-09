import Joi from "joi";
import { programmeBaseSchema } from "./base";

const pacEndorse = programmeBaseSchema.append({
  decision: Joi.string().valid("approve", "decline").required().messages({
    "any.only": "Status must be one of: approve, decline, defer, recommend",
  }),
});

export {
    pacEndorse
}

// /api/consultations/pac/start #file
// devCode
// consDate

// /api/consultations/benchmark #file
// devCode

// /api/consultations/pac/final-draft #file
// devCode

// /api/consultations/pac/endorse #file
// devCode
// endorsementDate
// Decision ['approve', 'decline']

// /api/consultations/pac/consult #2files[Endorsements, benchmarking]
// devCode
// consDate
