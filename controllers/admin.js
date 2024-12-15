import { Admin } from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { response } from "express";
import { Employee } from "../models/Employee.js";
import { sendEmail } from "./email.js";
import User from "../models/User.js"
import bodyParser from "body-parser";





