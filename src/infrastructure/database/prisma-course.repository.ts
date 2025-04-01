import { PrismaClient, Course as PrismaCourse } from "@prisma/client";
import { Course } from "../../domain/entities/course";
import { CourseRepository } from "../../domain/repositories/course.repository";

const prisma = new PrismaClient();

function mapPrismaCourseToDomain(course: PrismaCourse): Course {
  return new Course({
    id: course.id,
    title: course.title,
    imageUrl: course.imageUrl !== null ? course.imageUrl : undefined,
    thumbnailUrl:
      course.thumbnailUrl !== null ? course.thumbnailUrl : undefined,
  });
}

export class PrismaCourseRepository implements CourseRepository {
  async create(course: Course): Promise<Course> {
    const createdCourse = await prisma.course.create({
      data: {
        title: course.title,
        imageUrl: course.imageUrl,
        thumbnailUrl: course.thumbnailUrl,
      },
    });
    return mapPrismaCourseToDomain(createdCourse); // Use the mapping function
  }

  async findAll(): Promise<Course[]> {
    const courses = await prisma.course.findMany();
    return courses.map(mapPrismaCourseToDomain);
  }

  async findById(id: number): Promise<Course | null> {
    const course = await prisma.course.findUnique({ where: { id } });
    return course ? mapPrismaCourseToDomain(course) : null;
  }

  async update(id: number, course: Partial<Course>): Promise<Course> {
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: course,
    });
    return mapPrismaCourseToDomain(updatedCourse);
  }

  async delete(id: number): Promise<void> {
    await prisma.course.delete({ where: { id } });
  }
}
