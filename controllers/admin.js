<<<<<<< Updated upstream
import { Admin } from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function login(req, res) {

  const { email, password } = req.body;
=======
import { response } from "express";
import { Employee } from "../models/Employee.js";
import { sendEmail } from "./email.js";
import User from "../models/User.js"
import bodyParser from "body-parser";
>>>>>>> Stashed changes

  try {
    const admin = await Admin.findOne({
      email,
    });

    if (!admin) {
      return res.status(404).json({ message: "not found 404" });
    }

    const correctPassword = await bcrypt.compare(password, admin.password);

    if (correctPassword) {
      const token = jwt.sign({ id: admin._id }, "signatureToken");

      return res.status(200).json({ token: token });

    } else {
      return res.status(401).json({message: 'incorrect password'});
    }

    
  } catch (error) {
    res.status(500).json(error);
  }
<<<<<<< Updated upstream
}
=======

  export async function GetUser(req,res){

try{
  const userfound=await Employee.findById(req.body.id)
  if(userfound){
    return res.status(200).json({message:"user found",user:userfound})
  }else {    
    const employee = await Employee.create(req.body);
    return res.status(200).json({message:"user created",user:employee})

  }


}catch (error){
  console.log(error);
  response.status(500).json(error)
}

  }

  export async function GetAllUser(req,res){

    try{
      const usersfound=await Employee.find()
      
        return res.status(200).json({message:"users found",user:usersfound})
    
    }catch (error){
      console.log(error);
      response.status(500).json(error)
    }
    
      }

  

      export async function GetUserBy(req,res){

        try{
          const usersBy=await Employee.find(req.body)
          if(usersBy){
            return res.status(200).json({message:"users found",user:usersBy})

          }else {
            return res.status(404).json({message:"user not found"})

          }
        
        }catch (error){
          console.log(error);
          response.status(500).json(error)
        }
        
          }
>>>>>>> Stashed changes
