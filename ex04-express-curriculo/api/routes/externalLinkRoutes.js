import { Router } from "express";
import controllers from "../controllers";
import handleValidationErrors from "../middleware/validationHandler";
import {
  createExternalLinkRules,
  updateExternalLinkRules,
} from "../validators/externalLinkValidator";

const router = Router({ mergeParams: true });

router.get("/", controllers.externalLink.getAll);

router.post(
  "/",
  createExternalLinkRules,
  handleValidationErrors,
  controllers.externalLink.create
);

router.put(
  "/:externalLinkId",
  updateExternalLinkRules,
  handleValidationErrors,
  controllers.externalLink.update
);

router.delete("/:externalLinkId", controllers.externalLink.remove);

export default router;
