const {Skill} = require('../db/models');

const createSkill = async (req, res) => {
  const {title, verified} = req.body;


  // if (error) {
  //   return res.send({
  //     status: 422,
  //     message: 'Invalid request',
  //     data: req.body
  //   });
  // }

  const skill = await Skill.create({
    title, verified
  })

  return res.send({
    status: 200,
    skill,
  });
};

const updateVerifiedSkill = async (req, res) => {
  const {id, verified} = req.body;

  const skill = await Skill.findOne({
    where: {id}
  });

  if (!skill) {
    return res.send({
      status: 404,
      message: 'Skill is not found.'
    });
  }

  await skill.update({verified});
  await skill.reload();

  return res.send({
    status: 200,
    skill
  });
};

const deleteSkill = async (req, res) => {
  const skillId = req.params.skillId;

  const deleted = await Skill.destroy({
    where: {
      id: skillId
    }
  });

  if (!deleted) {
    return res.send({
      status: 501,
      message: 'Something went wrong.'
    });
  }

  return res.send({
    status: 200,
  });
};

const getAllSkills = async (req, res) => {
  const skills = await Skill.findAll();

  return res.send({
    status: 200,
    skills
  });
};

module.exports = {
  createSkill,
  updateVerifiedSkill,
  deleteSkill,
  getAllSkills
};
