import mongoose from "mongoose";
import User from "./User.js";

const checkSchema = new mongoose.Schema({
  
  checkin:{
    type: Date,
    default:Date.now()
  },
  checkout:{
    type: Date
  
}
})

export const Employee = User.discriminator(
  "Employee",
  new mongoose.Schema({
    roleEmployee: {
      type: String,
      required: true,
    },
    check: {        
      type:[checkSchema]
    },
      code:{
        type:Number,
        required:false,
     
      },
  })
)

