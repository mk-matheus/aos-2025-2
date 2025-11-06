import asyncHandler from "../utils/asyncHandler";

const getAll = asyncHandler(async (req, res) => {
  const { personId } = req.params;
  const educations = await req.context.models.Education.findAll({
    where: { personId: personId },
  });
  return res.status(200).json(educations);
});

const create = asyncHandler(async (req, res) => {
  const { personId } = req.params;
  const educationData = req.body;

  const person = await req.context.models.Person.findByPk(personId);
  if (!person) {
    return res.status(404).json({ error: "Pessoa (pai) não encontrada" });
  }

  const dataToSave = { ...educationData, personId: personId };
  const newEducation = await req.context.models.Education.create(dataToSave);
  return res.status(201).json(newEducation);
});

const update = asyncHandler(async (req, res) => {
  const { personId, educationId } = req.params;
  const data = req.body;

  const [affectedRows, updatedEducations] =
    await req.context.models.Education.update(data, {
      where: { objectId: educationId, personId: personId },
      returning: true,
    });

  if (affectedRows === 0) {
    return res
      .status(404)
      .json({
        error: "Education não encontrada ou não pertence a esta pessoa",
      });
  }

  return res.status(200).json(updatedEducations[0]);
});

const remove = asyncHandler(async (req, res) => {
  const { personId, educationId } = req.params;

  const deletedRows = await req.context.models.Education.destroy({
    where: { objectId: educationId, personId: personId },
  });

  if (deletedRows === 0) {
    return res
      .status(404)
      .json({
        error: "Education não encontrada ou não pertence a esta pessoa",
      });
  }

  return res.status(204).send();
});

export default { getAll, create, update, remove };
