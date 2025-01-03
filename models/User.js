import mongoose from "mongoose";

const UserShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      unique: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    adress: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
      required: false,
    },
    Salaire: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
      code:{
          type:Number,
          required:false,
      },
  },
  { discriminatorKey: "role" }
);
export default mongoose.model("User", UserShema);
