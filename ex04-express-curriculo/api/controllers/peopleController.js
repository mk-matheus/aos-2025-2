import asyncHandler from "../utils/asyncHandler";

const getAllPeople = asyncHandler(async (req, res) => {
  const people = await req.context.models.Person.findAll();
  return res.status(200).json(people);
});

const getPersonById = asyncHandler(async (req, res) => {
  const person = await req.context.models.Person.findByPk(req.params.personId, {
    include: [
      req.context.models.Resume,
      req.context.models.Education,
      req.context.models.Experience,
      req.context.models.Skill,
      req.context.models.ExternalLink,
    ],
  });

  if (!person) {
    return res.status(404).json({ error: "Pessoa não encontrada" });
  }

  return res.status(200).json(person);
});

const createPerson = asyncHandler(async (req, res) => {
  const data = req.body;

  const newPerson = await req.context.models.Person.create(data, {
    include: [
      req.context.models.Resume,
      req.context.models.Education,
      req.context.models.Experience,
      req.context.models.Skill,
      req.context.models.ExternalLink,
    ],
  });

  return res.status(201).json(newPerson);
});

const updatePerson = asyncHandler(async (req, res) => {
  const { personId } = req.params;
  const data = req.body;

  const [affectedRows, updatedPeople] = await req.context.models.Person.update(
    data,
    {
      where: { objectId: personId },
      returning: true,
    }
  );

  if (affectedRows === 0) {
    return res.status(404).json({ error: "Pessoa não encontrada" });
  }

  return res.status(200).json(updatedPeople[0]);
});

const deletePerson = asyncHandler(async (req, res) => {
  const { personId } = req.params;

  const deletedRows = await req.context.models.Person.destroy({
    where: { objectId: personId },
  });

  if (deletedRows === 0) {
    return res.status(404).json({ error: "Pessoa não encontrada" });
  }

  return res.status(204).send();
});

export default {
  getAllPeople,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
};
