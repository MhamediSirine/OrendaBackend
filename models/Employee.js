import mongoose from "mongoose";
import User from "./User.js";

export const Employee = User.discriminator(
  "Employee",
  new mongoose.Schema({
    roleEmployee: {
      type: String,
      required: true,
    },
  })
);
