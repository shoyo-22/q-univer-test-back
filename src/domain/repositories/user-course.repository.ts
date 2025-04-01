export interface UserCourseRepository {
  enroll(userId: number, courseId: number): Promise<void>;
  getEnrolledCourses(userId: number): Promise<number[]>;
}
