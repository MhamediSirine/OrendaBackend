import { Admin } from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function login(req, res) {

  const { email, password } = req.body;

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
}
