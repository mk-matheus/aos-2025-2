import asyncHandler from "../utils/asyncHandler";

const getAll = asyncHandler(async (req, res) => {
  const { personId } = req.params;
  const resumes = await req.context.models.Resume.findAll({
    where: { personId: personId },
  });
  return res.status(200).json(resumes);
});

const create = asyncHandler(async (req, res) => {
  const { personId } = req.params;
  const resumeData = req.body;

  const person = await req.context.models.Person.findByPk(personId);
  if (!person) {
    return res.status(404).json({ error: "Pessoa (pai) não encontrada" });
  }

  const dataToSave = { ...resumeData, personId: personId };
  const newResume = await req.context.models.Resume.create(dataToSave);
  return res.status(201).json(newResume);
});

const update = asyncHandler(async (req, res) => {
  const { personId, resumeId } = req.params;
  const data = req.body;

  const [affectedRows, updatedResumes] = await req.context.models.Resume.update(
    data,
    {
      where: { objectId: resumeId, personId: personId },
      returning: true,
    }
  );

  if (affectedRows === 0) {
    return res
      .status(404)
      .json({ error: "Resume não encontrado ou não pertence a esta pessoa" });
  }

  return res.status(200).json(updatedResumes[0]);
});

const remove = asyncHandler(async (req, res) => {
  const { personId, resumeId } = req.params;

  const deletedRows = await req.context.models.Resume.destroy({
    where: { objectId: resumeId, personId: personId },
  });

  if (deletedRows === 0) {
    return res
      .status(404)
      .json({ error: "Resume não encontrado ou não pertence a esta pessoa" });
  }

  return res.status(204).send();
});

export default { getAll, create, update, remove };
