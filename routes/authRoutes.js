import { Router } from "express";
import AuthController from "../controllers/authController.js";

const router = Router();

router.post("/login", AuthController.login);
router.post("/", AuthController.register);
export default router;