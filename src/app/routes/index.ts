import { Router } from "express";
import { FileRouter } from "../modules/file/file.route";

const router = Router();

const moduleRoutes = [{ path: "/file", route: FileRouter }];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
