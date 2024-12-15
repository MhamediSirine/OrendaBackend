import { Router } from "express";

import {
  AddEmployee,
  login,
  verifyResetCode,
  sendPasswordResetCode,
  resetPassword,
  handleReset,
} from "../controllers/AuthController.js";


export const router = Router();

router.post("/addEmploye", AddEmployee);
router.post("/login", login);
router.post("/send-reset-email", sendPasswordResetCode);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-code", resetPassword);
router.post("/handleReset",handleReset)
