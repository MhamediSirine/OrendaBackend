import { Router } from "express";

import {
  AddEmployee,
  login,
  sendPasswordResetCode,
  resetEmployeePassword,
} from "../controllers/AuthController.js";


export const router = Router();

router.post("/addEmploye", AddEmployee);
router.post("/login", login);
router.post("/send-reset-email", sendPasswordResetCode);
router.post("/handleReset",resetEmployeePassword);
