import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function AuthMiddleware(req, res, next) {
  try {
    if (!req.headers.token) {
      return res.status(404).json({ message: "token not found" });
    }
    const token = req.headers.token;
    var decoded = jwt.verify(token, "signatureToken");
    console.log(decoded);

    var user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "employee not found" });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
