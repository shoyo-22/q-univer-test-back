import { Router } from "express";
import { CourseController } from "../controllers/course.controller";
import { PrismaCourseRepository } from "../../infrastructure/database/prisma-course.repository";
import { CourseService } from "../../application/services/course.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../../infrastructure/file-storage/file-storage.service";

const router = Router();
const courseRepository = new PrismaCourseRepository();
const courseService = new CourseService(courseRepository);
const courseController = new CourseController(courseService);

router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  courseController.createCourse.bind(courseController)
);
router.get("/", courseController.getAllCourses.bind(courseController));
router.get("/:id", courseController.getCourseById.bind(courseController));
router.put(
  "/:id",
  authMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  courseController.updateCourse.bind(courseController)
);
router.delete(
  "/:id",
  authMiddleware,
  courseController.deleteCourse.bind(courseController)
);

export { router as courseRoutes };
