import { Router } from "express";
<<<<<<< Updated upstream
import {
  AddEmployee,
  login,
  SendCodeResetPassword,
  verificatioCode,
} from "../controllers/employee.js";
=======
import {AddEmployee,GetAllUser,GetUser,GetUserBy,login} from "../controllers/admin.js"
>>>>>>> Stashed changes

export const router = Router();

router.post("/addEmploye", AddEmployee);
router.post("/login", login);
<<<<<<< Updated upstream
router.post("/send-reset-email", SendCodeResetPassword);
router.post("/resetCode", verificatioCode);
=======
router.post("/getuser",GetUser);
router.post("/getallusers",GetAllUser);
router.post("/getuserby",GetUserBy);

export default router
>>>>>>> Stashed changes
