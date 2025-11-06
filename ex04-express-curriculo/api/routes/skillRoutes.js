import { Router } from "express";
import controllers from "../controllers";
import handleValidationErrors from "../middleware/validationHandler";
import {
  createSkillRules,
  updateSkillRules,
} from "../validators/skillValidator";

const router = Router({ mergeParams: true });

router.get("/", controllers.skill.getAll);

router.post(
  "/",
  createSkillRules,
  handleValidationErrors,
  controllers.skill.create
);

router.put(
  "/:skillId",
  updateSkillRules,
  handleValidationErrors,
  controllers.skill.update
);

router.delete("/:skillId", controllers.skill.remove);

export default router;
