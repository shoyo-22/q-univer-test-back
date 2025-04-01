"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoutes = void 0;
const express_1 = require("express");
const course_controller_1 = require("../controllers/course.controller");
const prisma_course_repository_1 = require("../../infrastructure/database/prisma-course.repository");
const course_service_1 = require("../../application/services/course.service");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const file_storage_service_1 = require("../../infrastructure/file-storage/file-storage.service");
const router = (0, express_1.Router)();
exports.courseRoutes = router;
const courseRepository = new prisma_course_repository_1.PrismaCourseRepository();
const courseService = new course_service_1.CourseService(courseRepository);
const courseController = new course_controller_1.CourseController(courseService);
router.post("/", auth_middleware_1.authMiddleware, file_storage_service_1.upload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
]), courseController.createCourse.bind(courseController));
router.get("/", courseController.getAllCourses.bind(courseController));
router.get("/:id", courseController.getCourseById.bind(courseController));
router.put("/:id", auth_middleware_1.authMiddleware, file_storage_service_1.upload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
]), courseController.updateCourse.bind(courseController));
router.delete("/:id", auth_middleware_1.authMiddleware, courseController.deleteCourse.bind(courseController));
