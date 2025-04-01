"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentService = void 0;
class EnrollmentService {
    constructor(userCourseRepository, courseRepository) {
        this.userCourseRepository = userCourseRepository;
        this.courseRepository = courseRepository;
    }
    enroll(userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.courseRepository.findById(courseId);
            if (!course)
                throw new Error("Course not found");
            const enrolledCourses = yield this.userCourseRepository.getEnrolledCourses(userId);
            if (enrolledCourses.includes(courseId))
                throw new Error("Already enrolled");
            yield this.userCourseRepository.enroll(userId, courseId);
        });
    }
    getEnrolledCourses(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseIds = yield this.userCourseRepository.getEnrolledCourses(userId);
            const courses = yield Promise.all(courseIds.map((id) => this.courseRepository.findById(id)));
            return courses.filter((course) => course !== null);
        });
    }
}
exports.EnrollmentService = EnrollmentService;
