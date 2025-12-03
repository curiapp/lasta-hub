import Joi from "joi";
import { programmeBaseSchema, programmeIdSchema } from "./base";

const nqaPreparationSchema = programmeIdSchema.append({
    documentType: Joi.object().pattern(Joi.string(), Joi.string())
});

const nqaPduRecommendSchema = programmeIdSchema.append({
    submissionType: Joi.string().valid("initial-submission", "resubmission").required().messages({
        "any.only": "Submission type must be one of: 'initial-submission', 'resubmission'",
    }),
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
    qualificationTitle: Joi.string().required(),
    nqfId: Joi.string().required(),
});

const nqaSubmitSchema = programmeIdSchema.append({
    documentType: Joi.object().pattern(Joi.string(), Joi.string()),
    submissionType: Joi.string().valid("initial-submission", "resubmission").required().messages({
        "any.only": "Submission type must be one of: 'initial-submission', 'resubmission'",
    }),
});

export { nqaPreparationSchema, nqaPduRecommendSchema, nqaRecommendSchema, nqaRegisterSchema, nqaSubmitSchema };
