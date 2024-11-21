import jwt from "jsonwebtoken";
import Employee from "../models/Employee.js";

export default async function Auth(req, res, next) {
  try {
    if (!req.headers.token) {
      return res.status(404).json({ message: "token not found" });
    }
    const token = req.headers.token;
    var decoded = jwt.verify(token, "signatureToken");
    console.log(decoded);

    var employee = await Employee.findById(decoded.id);
if(!employee){
    return res.status(404).json({message:"employee not found"})
}else{ 
req.employee = employee;
next();}
  } catch (error) {
    return res.status(500).json(error);
  }
}
