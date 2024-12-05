import { Router } from "express";
import {
  AddEmployee,
  login,
  SendCodeResetPassword,
  verificatioCode,
} from "../controllers/employee.js";

export const router = Router();

router.post("/addEmploye", AddEmployee);
router.post("/login", login);
router.post("/send-reset-email", SendCodeResetPassword);
router.post("/resetCode", verificatioCode);
