import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user";
import { EnrollmentService } from "./enrollment.service";
import { Course } from "../../domain/entities/course";

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private enrollmentService: EnrollmentService
  ) {}

  async getProfile(
    userId: number
  ): Promise<{ user: User; enrolledCourses: Course[] }> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found");
    const enrolledCourses = await this.enrollmentService.getEnrolledCourses(
      userId
    );
    return { user, enrolledCourses };
  }
}
