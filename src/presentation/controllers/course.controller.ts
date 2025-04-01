import { Request, Response } from 'express';
import { CourseService } from '../../application/services/course.service';

export class CourseController {
  constructor(private courseService: CourseService) {}

  async createCourse(req: Request, res: Response): Promise<void> {
    try {
      const { title } = req.body;
      // Assert the type of req.files
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const imageFile = files['image']?.[0]; // First file in 'image' field, or undefined if not present
      const thumbnailFile = files['thumbnail']?.[0]; // First file in 'thumbnail' field, or undefined
      const course = await this.courseService.createCourse(title, imageFile, thumbnailFile);
      res.status(201).json(course);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }


  async getAllCourses(req: Request, res: Response): Promise<void> {
    try {
      const courses = await this.courseService.getAllCourses();
      res.json(courses);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCourseById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const course = await this.courseService.getCourseById(id);
      if (course) {
        res.json(course);
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateCourse(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { title } = req.body;
      // Assert the type of req.files
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const imageFile = files['image']?.[0];
      const thumbnailFile = files['thumbnail']?.[0];
      const course = await this.courseService.updateCourse(id, title, imageFile, thumbnailFile);
      res.json(course);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }


  async deleteCourse(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.courseService.deleteCourse(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}