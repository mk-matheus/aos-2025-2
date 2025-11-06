import { Router } from "express";
import controllers from "../controllers";
import handleValidationErrors from "../middleware/validationHandler";
import {
  createExperienceRules,
  updateExperienceRules,
} from "../validators/experienceValidator";

// acessa o :personId da rota pai
const router = Router({ mergeParams: true });

// As rotas aqui são relativas a /people/:personId/experiences

router.get("/", controllers.experience.getAll);

router.post(
  "/",
  createExperienceRules, // regras de validação
  handleValidationErrors, // Coleta os erros (se houver)
  controllers.experience.create // Somente se passar, chama o controller
);

router.put(
  "/:experienceId",
  updateExperienceRules, // Roda as regras
  handleValidationErrors, // Coleta os erros
  controllers.experience.update // Chama o controller
);

router.delete("/:experienceId", controllers.experience.remove);

export default router;
