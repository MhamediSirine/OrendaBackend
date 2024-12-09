import { Router } from "express";
import {
  AddEmployee,
  login, resetPassword,
  sendPasswordResetCode,
  verifyResetCode,
} from "../controllers/employee.js";

export const router = Router();

router.post("/addEmploye", AddEmployee);
router.post("/login", login);
router.post("/send-reset-email", sendPasswordResetCode);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-code", resetPassword);