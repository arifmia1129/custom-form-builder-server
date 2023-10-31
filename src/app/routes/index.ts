import { Router } from "express";
import { FileRouter } from "../modules/file/file.route";
import { FormRouter } from "../modules/form/form.route";
import { FormResponseRouter } from "../modules/formResponse/formResponse.route";

const router = Router();

const moduleRoutes = [
  { path: "/file", route: FileRouter },
  { path: "/form", route: FormRouter },
  { path: "/form-response", route: FormResponseRouter },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
