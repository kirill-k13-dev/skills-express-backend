const Joi = require('joi')

const createSkillSchema =  Joi.object({
  title: Joi.string().min(2).max(256).required(),
  verified: Joi.boolean().required(),
});

const updateVerifiedSkillSchema = Joi.object({
  id: Joi.number().required(),
  verified: Joi.boolean().required(),
});

const deleteSkillSchema = Joi.object({
  skillId: Joi.string().required(),
});

module.exports = {
  createSkillSchema,
  updateVerifiedSkillSchema,
  deleteSkillSchema
};
