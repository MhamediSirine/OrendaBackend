import { Router } from "express";
import { checkin } from "../controllers/checkin.js";

 const checkrouter=Router()

checkrouter.post("/checkin", checkin);

export default checkrouter