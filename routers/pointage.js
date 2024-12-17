import { Router } from "express";
import { checkin } from "../controllers/checkin.js";
import {AuthMiddleware} from "../middlware/Auth.js";

 const checkrouter=Router()

checkrouter.post("/checkin", AuthMiddleware, checkin);

export default checkrouter