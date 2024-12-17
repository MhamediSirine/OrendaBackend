import { Router } from "express";
import { updateProfile , GetAllUser,
  GetUserBy, } from "../controllers/profileController.js";
import {AuthMiddleware} from "../middlware/Auth.js";

export const profileRouter = Router();

profileRouter.post("/update", AuthMiddleware, updateProfile);
profileRouter.get("/getallusers", GetAllUser);
profileRouter.get("/getuserby/:id", GetUserBy);
