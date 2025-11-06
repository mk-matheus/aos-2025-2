import { Router } from "express";
import controllers from "../controllers";
import handleValidationErrors from "../middleware/validationHandler";
import {
  createResumeRules,
  updateResumeRules,
} from "../validators/resumeValidator";

const router = Router({ mergeParams: true });

router.get("/", controllers.resume.getAll);

router.post(
  "/",
  createResumeRules,
  handleValidationErrors,
  controllers.resume.create
);

router.put(
  "/:resumeId",
  updateResumeRules,
  handleValidationErrors,
  controllers.resume.update
);

router.delete("/:resumeId", controllers.resume.remove);

export default router;
