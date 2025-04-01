import { User } from "../entities/user";

export interface UserRepository {
  create(user: User): Promise<User>;
  findByUsername(username: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
}
