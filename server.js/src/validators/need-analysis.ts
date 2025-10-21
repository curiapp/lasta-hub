import Joi from "joi";

const startSchema = Joi.object({
    code: Joi.string().alphanum().min(3).max(30).required(),
    title: Joi.string().required(),
    initiator: Joi.string().required(),
    level: Joi.number().integer().min(5).max(9).required(),
    faculty: Joi.string().required(),
    department: Joi.string().required(),
});

const consultSchema = Joi.object({
    programmeId: Joi.string().required(),
    organizations: Joi.array().items(Joi.string()).min(1).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
});

const surveySchema = Joi.object({
    programmeId: Joi.string().required(),
});

const concludeSchema = Joi.object({
    programmeId: Joi.string().required(),
    decision: Joi.string().required(),
});

const bosStartSchema = Joi.object({
    programmeId: Joi.string().required(),
    date: Joi.date().required(),
});

const bosRecommendSchema = Joi.object({
    programmeId: Joi.string().required(),
    date: Joi.string().required(),
    status: Joi.string().required(),
});

const senateStartSchema = Joi.object({
    programmeId: Joi.string().required(),
    date: Joi.date().required(),
});

const senateRecommendSchema = Joi.object({
    programmeId: Joi.string().required(),
    date: Joi.string().required(),
    status: Joi.string().required(),
});

const apcRecommendSchema = Joi.object({
    programmeId: Joi.string().required(),
    date: Joi.string().required(),
    status: Joi.string().required(),
});

export {
    startSchema,
    consultSchema,
    surveySchema,
    concludeSchema,
    bosStartSchema,
    bosRecommendSchema,
    senateStartSchema,
    senateRecommendSchema,
    apcRecommendSchema,
};
