import { Request, Response } from "express";
import { AuthService } from "../../application/services/auth.service";

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await this.authService.register(username, password);
      res.status(201).json({ id: user.id, username: user.username });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const token = await this.authService.login(username, password);
      res.cookie("jwt", token, { httpOnly: true, secure: true, sameSite: 'lax' });
      res.json({ message: "Login successful" });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("jwt");
      res.json({ message: "Logout successful" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
