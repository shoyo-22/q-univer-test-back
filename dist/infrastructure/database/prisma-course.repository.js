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
exports.PrismaCourseRepository = void 0;
const client_1 = require("@prisma/client");
const course_1 = require("../../domain/entities/course");
const prisma = new client_1.PrismaClient();
function mapPrismaCourseToDomain(course) {
    return new course_1.Course({
        id: course.id,
        title: course.title,
        imageUrl: course.imageUrl !== null ? course.imageUrl : undefined,
        thumbnailUrl: course.thumbnailUrl !== null ? course.thumbnailUrl : undefined,
    });
}
class PrismaCourseRepository {
    create(course) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdCourse = yield prisma.course.create({
                data: {
                    title: course.title,
                    imageUrl: course.imageUrl,
                    thumbnailUrl: course.thumbnailUrl,
                },
            });
            return mapPrismaCourseToDomain(createdCourse); // Use the mapping function
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield prisma.course.findMany();
            return courses.map(mapPrismaCourseToDomain);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield prisma.course.findUnique({ where: { id } });
            return course ? mapPrismaCourseToDomain(course) : null;
        });
    }
    update(id, course) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCourse = yield prisma.course.update({
                where: { id },
                data: course,
            });
            return mapPrismaCourseToDomain(updatedCourse);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.course.delete({ where: { id } });
        });
    }
}
exports.PrismaCourseRepository = PrismaCourseRepository;
