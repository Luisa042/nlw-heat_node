import { Request, Response } from "express";
import { UserProfileService } from "../services/UserProfileService";

class UserProfileController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;
    const service = new UserProfileService();
    const result = await service.execute(user_id);
    return res.json(result);
  }
}

export { UserProfileController };
