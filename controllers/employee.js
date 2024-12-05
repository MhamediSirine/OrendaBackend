import { Employee } from "../models/Employee.js";
import { sendEmail } from "./email.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


function getRandomFiveDigitNumber() {
  const randomNumber = Math.floor(10000 + Math.random() * 90000);
  return randomNumber;
}



export async function AddEmployee(request, response) {
  try {
    const { name, lastName, adress, email, password, Salaire, roleEmployee } =
      request.body;

    const cryptedPassword = await bcrypt.hashSync(password, 10);

    const existingEmployee = await Employee.findOne({ email }).exec();

    if (existingEmployee)
      return response.status(400).json({ message: "Email already in use" });

    const employee = await Employee.create({
      name,
      lastName,
      adress,
      email,
      password: cryptedPassword,
      Salaire,
      roleEmployee,
    });

    await sendEmail(
      request.body.email,
      "Email verification",
      `the code is : ${request.body.password}`
    );

    response.status(200).json({
      message: "created",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "errrrrrrrrrreur",
    });
  }
}
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const employee = await Employee.findOne({
      email,
    });

    if (!employee) {
      return res.status(404).json({ message: "not found 404" });
    }

    let correctPassword = await bcrypt.compare(password, employee.password);

    if (correctPassword) {
      const token = jwt.sign({ id: employee._id }, "signatureToken");
      return res.status(200).json({ token: token });
    } else {
      return res.status(401).json({ message: "Password incorrect" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function SendCodeResetPassword(req,res){
  const {email}=req.body
try {
        const employee = await Employee.findOne({ email });
        if (!employee) {
          return res.status(404).json({ message: "User not found" });
        } else {
          let randomCode = getRandomFiveDigitNumber();
          employee.code=randomCode;
          Employee.create(employee);
          await sendEmail(
            req.body.email,
            "Email verification",
            `the code is : ${randomCode}`
          );
          res.status(200).json({
            message: "sended",
          });
        }
    

  
} catch (error) {
  console.log(error);
  
     res.status(500).json(error);
  
}

}

export async function verificatioCode (req,res){
  const { email,code } = req.body;
  try {
     const employee = await Employee.findOne({ email });
        if (!employee) {
          return res.status(404).json({ message: "User not found" });
        } else {
          let resetCode=parseInt(code);
          if (resetCode==employee.code){
            return res.status(200).json({
              message:"verified"
            })

          }
          console.log(employee);
          console.log(resetCode);
          
          
          return res.status(401).json({
            message:"code incorrect"
          })
        }
    
  } catch (error) {
    res.status(500).json(error);
    
  }

}

export async function changePassword(req,res){
  const{email,newPassword} =req.body

  
}


