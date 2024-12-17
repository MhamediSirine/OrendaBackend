import mongoose from "mongoose";
import User from "./User.js";

export const Admin = User.discriminator('admin', new mongoose.Schema({
    experience:{
        type:String,
        required:false
    }
}))

