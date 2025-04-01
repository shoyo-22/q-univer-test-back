import { CourseRepository } from "../../domain/repositories/course.repository";
import { Course } from "../../domain/entities/course";
import { getFileUrl } from "../../infrastructure/file-storage/file-storage.service";

export class CourseService {
  constructor(private courseRepository: CourseRepository) {}

  async createCourse(
    title: string,
    imageFile?: Express.Multer.File,
    thumbnailFile?: Express.Multer.File
  ): Promise<Course> {
    const imageUrl = imageFile ? getFileUrl(imageFile.filename) : undefined;
    const thumbnailUrl = thumbnailFile
      ? getFileUrl(thumbnailFile.filename)
      : undefined;
    const course = new Course({ title, imageUrl, thumbnailUrl });
    return this.courseRepository.create(course);
  }

  async getAllCourses(): Promise<Course[]> {
    return this.courseRepository.findAll();
  }

  async getCourseById(id: number): Promise<Course | null> {
    return this.courseRepository.findById(id);
  }

  async updateCourse(
    id: number,
    title?: string,
    imageFile?: Express.Multer.File,
    thumbnailFile?: Express.Multer.File
  ): Promise<Course> {
    const updateData: Partial<Course> = {};
    if (title) updateData.title = title;
    if (imageFile) updateData.imageUrl = getFileUrl(imageFile.filename);
    if (thumbnailFile)
      updateData.thumbnailUrl = getFileUrl(thumbnailFile.filename);
    return this.courseRepository.update(id, updateData);
  }

  async deleteCourse(id: number): Promise<void> {
    return this.courseRepository.delete(id);
  }
}
