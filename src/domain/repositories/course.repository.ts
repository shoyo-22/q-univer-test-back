import { Course } from "../entities/course";

export interface CourseRepository {
  create(course: Course): Promise<Course>;
  findAll(): Promise<Course[]>;
  findById(id: number): Promise<Course | null>;
  update(id: number, course: Partial<Course>): Promise<Course>;
  delete(id: number): Promise<void>;
}
