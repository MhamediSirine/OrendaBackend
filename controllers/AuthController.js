import { Employee } from "../models/Employee.js";
import { sendEmail } from "./email.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Admin } from "../models/Admin.js";

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

      return res
        .status(200)
        .json({
          token: token,
          message: "success ",
          role: employee.role,
          userData: employee,
        });
    } else {
      return res.status(401).json({ message: "Password incorrect" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
export async function loginAdmin(req, res) {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({
      email,
    });

    if (!admin) {
      return res.status(404).json({ message: "not found 404" });
    }

    let correctPassword = await bcrypt.compare(password, admin.password);

    if (correctPassword) {
      const token = jwt.sign({ id: admin._id }, "signatureToken");

      return res.status(200).json({
        token: token,
        message: "success ",
        role: admin.role,
        userData: admin,
      });
    } else {
      return res.status(401).json({ message: "Password incorrect" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}


export async function sendPasswordResetCode(req, res) {
  const { email } = req.body;
  try {
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(404).json({ message: "User not found" });
    } else {
      let randomCode = getRandomFiveDigitNumber();
      employee.code = randomCode;
      await Employee.create(employee);

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

export async function resetEmployeePassword(request, response) {
  const { email, code, newPassword } = request.body;

  const employee = await Employee.findOne({ email });

  if (!employee)
    return response.status(404).json({ message: "Employee not found" });

  if (employee.code !== code)
    return response.status(400).json({ message: "Reset code is invalid" });

  const hashedPassword = await bcrypt.hashSync(newPassword, 10);

  await Employee.updateOne({ email }, { $set: { password: hashedPassword } });

  return response.status(200).json({
    message: "Password has been updated successfully",
  });
}
