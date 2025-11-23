import Joi from "joi";
import { programmeBaseSchema } from "./base";

const draftSchema = programmeBaseSchema.append({
    documentType: Joi.string()
        .valid("support-letters", "pac-minutes", "draft-document", "checklist")
        .required()
        .messages({
            "any.only": "Document type must be one of: 'support-letters', 'pac-minutes', 'draft-document', 'checklist'",
        }),
});

const otherFacultyRecommendSchema = programmeBaseSchema.append({
    facultyName: Joi.string().required(),
    recommendedTo: Joi.string().valid("support-letters", "apc", "bosec").required().messages({
        "any.only": "Recommended to must be one of: 'apc', 'bosec'",
    }),
});

const facultyBosRecommendSchema = programmeBaseSchema.append({
    recommendedTo: Joi.string().valid("apc").required().messages({
        "any.only": "Status must be one of: 'apc'",
    }),
    deferTo: Joi.string().valid("bosec", "bos", "other-faculty-bos").required().messages({
        "any.only": "Status must be one of: 'bosec', 'bos', 'other-faculty-bos'",
    }),
});

const apcRecommendSchema = programmeBaseSchema.append({
    decision: Joi.string().valid("recommend", "defer").required().messages({
        "any.only": "Status must be one of: recommend, defer",
    }),
});

const finalSenateSchema = programmeBaseSchema.append({
    decision: Joi.string().valid("approve", "defer-faculty", "defer-senex").required().messages({
        "any.only": "Status must be one of: approve, defer-faculty, defer-senex",
    }),
});

export { facultyBosRecommendSchema, otherFacultyRecommendSchema, apcRecommendSchema, finalSenateSchema, draftSchema };
