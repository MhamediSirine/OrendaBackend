import { Employee } from "../models/Employee.js";
import { sendEmail } from "./email.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


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
      return res.status(200).json({ token: token, message: "success ", role: employee.role });
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

export async function verifyResetCode(req, res) {
  const { email, code } = req.body;
  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: "User not found" });
    } else {
      let resetCode = parseInt(code);
      if (resetCode === employee.code) {
        return res.status(200).json({
          message: "verified",
        });
      }

      return res.status(401).json({
        message: "code incorrect",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function resetPassword(request, response) {
  const { email, newPassword } = request.body;

  const employee = await Employee.findOne({ email });

  if (!employee)
    return response.status(404).json({ message: "User not found" });

  const cryptedPassword = await bcrypt.hashSync(newPassword, 10);

  await Employee.updateOne({ email }, { $set: { password: cryptedPassword } });

  return response.status(200).json({
    message: "password updated successfully",
  });
}


export async function handleReset(req, res) {
  const { email, code, newPassword } = req.body;

  try {
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetCode = parseInt(code);
    if (resetCode !== employee.code) {
      return res.status(401).json({ message: "Code incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Employee.updateOne({ email }, { $set: { password: hashedPassword } });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


