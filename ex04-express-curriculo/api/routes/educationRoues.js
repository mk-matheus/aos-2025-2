import { Router } from "express";
import controllers from "../controllers";
import handleValidationErrors from "../middleware/validationHandler";
import {
  createEducationRules,
  updateEducationRules,
} from "../validators/educationValidator";

const router = Router({ mergeParams: true });

router.get("/", controllers.education.getAll);

router.post(
  "/",
  createEducationRules,
  handleValidationErrors,
  controllers.education.create
);

router.put(
  "/:educationId",
  updateEducationRules,
  handleValidationErrors,
  controllers.education.update
);

router.delete("/:educationId", controllers.education.remove);

export default router;
