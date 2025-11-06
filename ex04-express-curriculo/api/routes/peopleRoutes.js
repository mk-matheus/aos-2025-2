// api/routes/peopleRoutes.js
import { Router } from "express";
import controllers from "../controllers";

// ADICIONE ESTES IMPORTS AQUI:
import handleValidationErrors from "../middleware/validationHandler";
import {
  createPersonRules,
  updatePersonRules,
} from "../validators/personValidator";

// IMPORTAR ROTEADORES FILHOS (você já deve ter isso)
import experienceRoutes from "./experienceRoutes";
// ... (imports dos outros filhos)
import externalLinkRoutes from "./externalLinkRoutes";

const router = Router();

// --- CRUD da Pessoa (Pai) ---
router.get("/", controllers.people.getAllPeople);

router.get("/:personId", controllers.people.getPersonById);

// APLIQUE AS REGRAS AQUI
router.post(
  "/",
  createPersonRules,
  handleValidationErrors,
  controllers.people.createPerson
);

// APLIQUE AS REGRAS AQUI
router.put(
  "/:personId",
  updatePersonRules,
  handleValidationErrors,
  controllers.people.updatePerson
);

router.delete("/:personId", controllers.people.deletePerson);

// --- DELEGAÇÃO PARA ROTAS FILHAS ---
router.use("/:personId/experiences", experienceRoutes);
// ... (use dos outros filhos)
router.use("/:personId/externallinks", externalLinkRoutes);

export default router;
