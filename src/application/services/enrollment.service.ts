import { UserCourseRepository } from "../../domain/repositories/user-course.repository";
import { CourseRepository } from "../../domain/repositories/course.repository";
import { Course } from "../../domain/entities/course";

export class EnrollmentService {
  constructor(
    private userCourseRepository: UserCourseRepository,
    private courseRepository: CourseRepository
  ) {}

  async enroll(userId: number, courseId: number): Promise<void> {
    const course = await this.courseRepository.findById(courseId);
    if (!course) throw new Error("Course not found");
    const enrolledCourses = await this.userCourseRepository.getEnrolledCourses(
      userId
    );
    if (enrolledCourses.includes(courseId)) throw new Error("Already enrolled");
    await this.userCourseRepository.enroll(userId, courseId);
  }

  async getEnrolledCourses(userId: number): Promise<Course[]> {
    const courseIds = await this.userCourseRepository.getEnrolledCourses(
      userId
    );
    const courses = await Promise.all(
      courseIds.map((id) => this.courseRepository.findById(id))
    );
    return courses.filter((course) => course !== null) as Course[];
  }
}
