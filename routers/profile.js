import { Router } from "express";
import { updateProfile , GetAllUser,
  GetUserBy, } from "../controllers/profileController.js";

export const profileRouter = Router();

profileRouter.post("/update", updateProfile);
profileRouter.get("/getallusers", GetAllUser);
profileRouter.get("/getuserby/:id", GetUserBy);
