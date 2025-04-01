import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { PrismaUserRepository } from "../../infrastructure/database/prisma-user.repository";
import { PrismaUserCourseRepository } from "../../infrastructure/database/prisma-user-course.repository";
import { PrismaCourseRepository } from "../../infrastructure/database/prisma-course.repository";
import { UserService } from "../../application/services/user.service";
import { EnrollmentService } from "../../application/services/enrollment.service";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const userRepository = new PrismaUserRepository();
const courseRepository = new PrismaCourseRepository();
const userCourseRepository = new PrismaUserCourseRepository();
const enrollmentService = new EnrollmentService(
  userCourseRepository,
  courseRepository
);
const userService = new UserService(userRepository, enrollmentService);
const userController = new UserController(userService, enrollmentService);

router.get(
  "/profile",
  authMiddleware,
  userController.getProfile.bind(userController)
);
router.post(
  "/enroll/:courseId",
  authMiddleware,
  userController.enroll.bind(userController)
);

export { router as userRoutes };
