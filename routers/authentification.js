import { Router } from "express";

import {AddEmployee,login,SendCodeResetPassword,verifyResetCode,sendPasswordResetCode,} from "../controllers/employee.js";
import {GetAllUser,GetUser,GetUserBy,loginAdmin} from "../controllers/admin.js";


export const router = Router();

router.post("/addEmploye", AddEmployee);
router.post("/login", login);
router.post("/getuser",GetUser);
router.post("/getallusers",GetAllUser);
router.post("/getuserby",GetUserBy);
router.post("/loginadmin",loginAdmin);
router.post("/send-reset-email", sendPasswordResetCode);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-code", resetPassword);

