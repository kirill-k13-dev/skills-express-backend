const JoiMiddleware  = require('../middlewares/JoiMiddleware');
const {
  createSkill,
  updateVerifiedSkill,
  deleteSkill,
  getAllSkills
} = require('../controllers/SkillController');
const {
  createSkillSchema,
  updateVerifiedSkillSchema,
  deleteSkillSchema
} = require('../validations/skillRouters/schemas');

module.exports = (router) => {
  router.post('/skill', JoiMiddleware(createSkillSchema), createSkill);
  router.put('/skill', JoiMiddleware(updateVerifiedSkillSchema), updateVerifiedSkill);
  router.delete('/skill/:skillId', JoiMiddleware(deleteSkillSchema), deleteSkill);
  router.get('/skills', getAllSkills);
};
