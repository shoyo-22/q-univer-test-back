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
exports.CourseService = void 0;
const course_1 = require("../../domain/entities/course");
const file_storage_service_1 = require("../../infrastructure/file-storage/file-storage.service");
class CourseService {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    createCourse(title, imageFile, thumbnailFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageUrl = imageFile ? (0, file_storage_service_1.getFileUrl)(imageFile.filename) : undefined;
            const thumbnailUrl = thumbnailFile
                ? (0, file_storage_service_1.getFileUrl)(thumbnailFile.filename)
                : undefined;
            const course = new course_1.Course({ title, imageUrl, thumbnailUrl });
            return this.courseRepository.create(course);
        });
    }
    getAllCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.courseRepository.findAll();
        });
    }
    getCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.courseRepository.findById(id);
        });
    }
    updateCourse(id, title, imageFile, thumbnailFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateData = {};
            if (title)
                updateData.title = title;
            if (imageFile)
                updateData.imageUrl = (0, file_storage_service_1.getFileUrl)(imageFile.filename);
            if (thumbnailFile)
                updateData.thumbnailUrl = (0, file_storage_service_1.getFileUrl)(thumbnailFile.filename);
            return this.courseRepository.update(id, updateData);
        });
    }
    deleteCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.courseRepository.delete(id);
        });
    }
}
exports.CourseService = CourseService;
