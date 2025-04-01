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
exports.CourseController = void 0;
class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    createCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { title } = req.body;
                // Assert the type of req.files
                const files = req.files;
                const imageFile = (_a = files['image']) === null || _a === void 0 ? void 0 : _a[0]; // First file in 'image' field, or undefined if not present
                const thumbnailFile = (_b = files['thumbnail']) === null || _b === void 0 ? void 0 : _b[0]; // First file in 'thumbnail' field, or undefined
                const course = yield this.courseService.createCourse(title, imageFile, thumbnailFile);
                res.status(201).json(course);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    getAllCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield this.courseService.getAllCourses();
                res.json(courses);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getCourseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const course = yield this.courseService.getCourseById(id);
                if (course) {
                    res.json(course);
                }
                else {
                    res.status(404).json({ message: 'Course not found' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    updateCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const id = parseInt(req.params.id);
                const { title } = req.body;
                // Assert the type of req.files
                const files = req.files;
                const imageFile = (_a = files['image']) === null || _a === void 0 ? void 0 : _a[0];
                const thumbnailFile = (_b = files['thumbnail']) === null || _b === void 0 ? void 0 : _b[0];
                const course = yield this.courseService.updateCourse(id, title, imageFile, thumbnailFile);
                res.json(course);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    deleteCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                yield this.courseService.deleteCourse(id);
                res.status(204).send();
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.CourseController = CourseController;
