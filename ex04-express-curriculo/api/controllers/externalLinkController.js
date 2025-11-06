import asyncHandler from "../utils/asyncHandler";

const getAll = asyncHandler(async (req, res) => {
  const { personId } = req.params;
  const links = await req.context.models.ExternalLink.findAll({
    where: { personId: personId },
  });
  return res.status(200).json(links);
});

const create = asyncHandler(async (req, res) => {
  const { personId } = req.params;
  const linkData = req.body;

  const person = await req.context.models.Person.findByPk(personId);
  if (!person) {
    return res.status(404).json({ error: "Pessoa (pai) não encontrada" });
  }

  const dataToSave = { ...linkData, personId: personId };
  const newLink = await req.context.models.ExternalLink.create(dataToSave);
  return res.status(201).json(newLink);
});

const update = asyncHandler(async (req, res) => {
  const { personId, externalLinkId } = req.params;
  const data = req.body;

  const [affectedRows, updatedLinks] =
    await req.context.models.ExternalLink.update(data, {
      where: { objectId: externalLinkId, personId: personId },
      returning: true,
    });

  if (affectedRows === 0) {
    return res
      .status(404)
      .json({
        error: "Link Externo não encontrado ou não pertence a esta pessoa",
      });
  }

  return res.status(200).json(updatedLinks[0]);
});

const remove = asyncHandler(async (req, res) => {
  const { personId, externalLinkId } = req.params;

  const deletedRows = await req.context.models.ExternalLink.destroy({
    where: { objectId: externalLinkId, personId: personId },
  });

  if (deletedRows === 0) {
    return res
      .status(404)
      .json({
        error: "Link Externo não encontrado ou não pertence a esta pessoa",
      });
  }

  return res.status(204).send();
});

export default { getAll, create, update, remove };
