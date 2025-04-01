import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user";
import { hashPassword, verifyPassword } from "../../utils/password.utils";
import { generateToken } from "../../utils/jwt.utils";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(username: string, password: string): Promise<User> {
    const hashedPassword = await hashPassword(password);
    const user = new User({ username, password: hashedPassword });
    return this.userRepository.create(user);
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new Error("User not found");
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) throw new Error("Invalid password");
    return generateToken({ id: user.id, username: user.username });
  }
}
