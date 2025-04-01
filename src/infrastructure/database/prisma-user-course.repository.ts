import { PrismaClient } from "@prisma/client";
import { UserCourseRepository } from "../../domain/repositories/user-course.repository";

const prisma = new PrismaClient();

export class PrismaUserCourseRepository implements UserCourseRepository {
  async enroll(userId: number, courseId: number): Promise<void> {
    await prisma.userCourse.create({
      data: { userId, courseId },
    });
  }

  async getEnrolledCourses(userId: number): Promise<number[]> {
    const userCourses = await prisma.userCourse.findMany({
      where: { userId },
      select: { courseId: true },
    });
    return userCourses.map((uc: { courseId: any }) => uc.courseId);
  }
}
