import { Router } from "express";

import {
  AddEmployee,
  login,
  sendPasswordResetCode,
  resetEmployeePassword, createAdmin,
} from "../controllers/AuthController.js";
import {AuthMiddleware} from "../middlware/Auth.js";


export const router = Router();

router.post("/addEmploye", AuthMiddleware, AddEmployee);
router.post("/admin", createAdmin);
router.post("/login", login);
router.post("/send-reset-email", sendPasswordResetCode);
router.post("/handleReset",resetEmployeePassword);
