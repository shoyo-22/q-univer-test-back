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
exports.UserController = void 0;
class UserController {
    constructor(userService, enrollmentService) {
        this.userService = userService;
        this.enrollmentService = enrollmentService;
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const profile = yield this.userService.getProfile(userId);
                res.json({
                    user: { id: profile.user.id, username: profile.user.username },
                    enrolledCourses: profile.enrolledCourses,
                });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    enroll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const courseId = parseInt(req.params.courseId);
                yield this.enrollmentService.enroll(userId, courseId);
                res.status(201).json({ message: "Enrolled successfully" });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.UserController = UserController;
