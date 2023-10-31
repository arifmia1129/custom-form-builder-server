import { Router } from "express";
import { FormController } from "./form.controller";

const router = Router();

router.post("/create", FormController.createForm);
router.get("/", FormController.getForm);

router
  .route("/:id")
  .get(FormController.getFormById)
  .patch(FormController.updateFormById)
  .delete(FormController.deleteFormById);

export const FormRouter = router;
