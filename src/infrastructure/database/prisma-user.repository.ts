import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user.repository";

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        username: user.username,
        password: user.password,
      },
    });

    return new User(createdUser);
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    return user ? new User(user) : null;
  }

  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user ? new User(user) : null;
  }
}
