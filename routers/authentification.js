import { Router } from "express";
import {AddEmployee,login} from "../controllers/admin.js"


export const router=Router()

router.post("/addEmploye", AddEmployee);
router.post("/login", login);