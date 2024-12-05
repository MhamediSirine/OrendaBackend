import bodyParser from "body-parser";
import express, { json } from "express";
import mongoose from "mongoose";
import cors from 'cors';
import User from "./models/User.js";
import {router} from "./routers/authentification.js"
import checkrouter from "./routers/pointage.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())


app.use("/employee",router)
app.use("/auth",router)
app.use("/check",checkrouter)

mongoose
  .connect("mongodb://127.0.0.1:27017/Pointage")
  .then(() => {
    app.listen(3000, () => {
      console.log("i'm running");
    });

  })
  .catch((error) => {
    console.log(error);
  });



