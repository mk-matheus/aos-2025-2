import asyncHandler from "../utils/asyncHandler";

const getAll = asyncHandler(async (req, res) => {
  const { personId } = req.params;
  const skills = await req.context.models.Skill.findAll({
    where: { personId: personId },
  });
  return res.status(200).json(skills);
});

const create = asyncHandler(async (req, res) => {
  const { personId } = req.params;
  const skillData = req.body;

  const person = await req.context.models.Person.findByPk(personId);
  if (!person) {
    return res.status(404).json({ error: "Pessoa (pai) não encontrada" });
  }

  const dataToSave = { ...skillData, personId: personId };
  const newSkill = await req.context.models.Skill.create(dataToSave);
  return res.status(201).json(newSkill);
});

const update = asyncHandler(async (req, res) => {
  const { personId, skillId } = req.params;
  const data = req.body;

  const [affectedRows, updatedSkills] = await req.context.models.Skill.update(
    data,
    {
      where: { objectId: skillId, personId: personId },
      returning: true,
    }
  );

  if (affectedRows === 0) {
    return res
      .status(404)
      .json({ error: "Skill não encontrada ou não pertence a esta pessoa" });
  }

  return res.status(200).json(updatedSkills[0]);
});

const remove = asyncHandler(async (req, res) => {
  const { personId, skillId } = req.params;

  const deletedRows = await req.context.models.Skill.destroy({
    where: { objectId: skillId, personId: personId },
  });

  if (deletedRows === 0) {
    return res
      .status(404)
      .json({ error: "Skill não encontrada ou não pertence a esta pessoa" });
  }

  return res.status(204).send();
});

export default { getAll, create, update, remove };
