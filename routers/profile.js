import {Router} from "express";
import {updateProfile} from "../controllers/employee.js";

export const profileRouter = Router();

profileRouter.post("/update", updateProfile);