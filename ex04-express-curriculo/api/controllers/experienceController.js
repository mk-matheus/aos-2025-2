import asyncHandler from "../utils/asyncHandler";

//Assume que as rotas passarão o personId.
// Rota: GET /people/:personId/experiences
const getAll = asyncHandler(async (req, res) => {
  const { personId } = req.params;
  const experiences = await req.context.models.Experience.findAll({
    where: { personId: personId },
  });
  return res.status(200).json(experiences);
});

// Rota: POST /people/:personId/experiences
const create = asyncHandler(async (req, res) => {
  const { personId } = req.params;
  const experienceData = req.body;

  const person = await req.context.models.Person.findByPk(personId);
  if (!person) {
    return res.status(404).json({ error: "Pessoa (pai) não encontrada" });
  }

  const dataToSave = {
    ...experienceData,
    personId: personId,
  };

  const newExperience = await req.context.models.Experience.create(dataToSave);
  return res.status(201).json(newExperience);
});

// Rota: PUT /people/:personId/experiences/:experienceId
const update = asyncHandler(async (req, res) => {
  const { personId, experienceId } = req.params;
  const data = req.body;
  const [affectedRows, updatedExperiences] =
    await req.context.models.Experience.update(data, {
      where: {
        objectId: experienceId,
        personId: personId,
      },
      returning: true,
    });
  if (affectedRows === 0) {
    return res
      .status(404)
      .json({
        error: "Experiência não encontrada ou não pertence a esta pessoa",
      });
  }
  return res.status(200).json(updatedExperiences[0]);
});

// Rota: DELETE /people/:personId/experiences/:experienceId
const remove = asyncHandler(async (req, res) => {
  const { personId, experienceId } = req.params;

  const deletedRows = await req.context.models.Experience.destroy({
    where: {
      objectId: experienceId,
      personId: personId,
    },
  });

  if (deletedRows === 0) {
    return res
      .status(404)
      .json({
        error: "Experiência não encontrada ou não pertence a esta pessoa",
      });
  }

  return res.status(204).send();
});

export default {
  getAll,
  create,
  update,
  remove,
};
