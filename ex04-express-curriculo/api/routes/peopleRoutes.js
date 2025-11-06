import { Router } from "express";
import controllers from "../controllers";

import handleValidationErrors from "../middleware/validationHandler";
import {
  createPersonRules,
  updatePersonRules,
} from "../validators/personValidator";

// Imports dos roteadores filhos
import experienceRoutes from "./experienceRoutes";
import educationRoutes from "./educationRoutes";
import externalLinkRoutes from "./externalLinkRoutes";
import resumeRoutes from "./resumeRoutes";
import skillRoutes from "./skillRoutes";

const router = Router();

// --- CRUD da Pessoa (Pai) ---
router.get("/", controllers.people.getAllPeople);

router.get("/:personId", controllers.people.getPersonById);

router.post(
  "/",
  createPersonRules,
  handleValidationErrors,
  controllers.people.createPerson
);

router.put(
  "/:personId",
  updatePersonRules,
  handleValidationErrors,
  controllers.people.updatePerson
);

router.delete("/:personId", controllers.people.deletePerson);

// Delegacoes das "filhas"
router.use("/:personId/experiences", experienceRoutes);
router.use("/:personId/externallinks", externalLinkRoutes);
router.use("/:personId/educations", educationRoutes);
router.use("/:personId/resumes", resumeRoutes);
router.use("/:personId/skills", skillRoutes);

export default router;
