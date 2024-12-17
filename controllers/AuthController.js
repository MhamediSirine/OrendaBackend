import { Employee } from "../models/Employee.js";
import { sendEmail } from "./email.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Admin } from "../models/Admin.js";
import User from "../models/User.js";
import {response} from "express";

function getRandomFiveDigitNumber() {
  return Math.floor(10000 + Math.random() * 90000);
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
      "Orenda account",
      `Your orenda password : ${request.body.password}`
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

export async function createAdmin(req, res) {
  const { name, lastName, adress, email, password, Salaire, experience } = req.body;

  const hashedPassword = await bcrypt.hashSync(password, 10);

  const admin = await Admin.create({
    name, lastName, adress, email, password: hashedPassword, Salaire, experience,
  });

  res.status(200).json({
    message: "admin has been created successfully",
  })

}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  if (!user) return res.status(404).json({
    message: "Did not find any account with given email",
  })

  let correctPassword = await bcrypt.compare(password, user.password);

  if (!correctPassword) return res.status(401).json({
    message: "Invalid password",
  });

  const token = jwt.sign({id: user._id}, "signatureToken");

  return res.status(200).json({
    token, message: "Login Successful", role: user.role, userData: user,
  })

}


export async function sendPasswordResetCode(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      let randomCode = getRandomFiveDigitNumber();
      user.code = randomCode;

      await User.updateOne({ email }, { $set: { code: randomCode } });

      await sendEmail(
          req.body.email,
          "Email verification",
          `the code is : ${randomCode}`
      );

      res.status(200).json({
        message: "Email with reset code has been sent",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function resetEmployeePassword(request, response) {
  const { email, code, newPassword } = request.body;

  const user = await User.findOne({ email });

  if (!user)
    return response.status(404).json({ message: "user not found" });

  if (user.code !== code)
    return response.status(400).json({ message: "Reset code is invalid" });

  const hashedPassword = await bcrypt.hashSync(newPassword, 10);

  await User.updateOne({ email }, { $set: { password: hashedPassword } });

  return response.status(200).json({
    message: "Password has been updated successfully",
  });

}
