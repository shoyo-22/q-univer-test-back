import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { PrismaUserRepository } from "../../infrastructure/database/prisma-user.repository";
import { AuthService } from "../../application/services/auth.service";

const router = Router();
const userRepository = new PrismaUserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
router.post("/logout", authController.logout.bind(authController));

export { router as authRoutes };
