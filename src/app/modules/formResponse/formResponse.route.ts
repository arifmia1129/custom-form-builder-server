import { Router } from "express";
import { FormResponseController } from "./formResponse.controller";

const router = Router();

router.post("/create", FormResponseController.createFormResponse);
router.get("/", FormResponseController.getFormResponse);

router
  .route("/:id")
  .get(FormResponseController.getFormResponseById)
  .patch(FormResponseController.updateFormResponseById)
  .delete(FormResponseController.deleteFormResponseById);

export const FormResponseRouter = router;
