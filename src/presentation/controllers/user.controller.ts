import { Request as ExpressRequest, Response } from "express";
import { UserService } from "../../application/services/user.service";
import { EnrollmentService } from "../../application/services/enrollment.service";

interface CustomRequest extends ExpressRequest {
  user?: any;
}

export class UserController {
  constructor(
    private userService: UserService,
    private enrollmentService: EnrollmentService
  ) {}

  async getProfile(req: CustomRequest, res: Response): Promise<void> {
    try {
      const userId = req.user.id;
      const profile = await this.userService.getProfile(userId);
      res.json({
        user: { id: profile.user.id, username: profile.user.username },
        enrolledCourses: profile.enrolledCourses,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async enroll(req: CustomRequest, res: Response): Promise<void> {
    try {
      const userId = req.user.id;
      const courseId = parseInt(req.params.courseId);
      await this.enrollmentService.enroll(userId, courseId);
      res.status(201).json({ message: "Enrolled successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
