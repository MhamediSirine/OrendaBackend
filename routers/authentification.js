import { Router } from "express";
import {AddEmployee,login,SendCodeResetPassword,verificatioCode,} from "../controllers/employee.js";
import {GetAllUser,GetUser,GetUserBy} from "../controllers/admin.js"

export const router = Router();

router.post("/addEmploye", AddEmployee);
router.post("/login", login);
router.post("/send-reset-email", SendCodeResetPassword);
router.post("/resetCode", verificatioCode);
router.post("/getuser",GetUser);
router.post("/getallusers",GetAllUser);
router.post("/getuserby",GetUserBy);

export default router
