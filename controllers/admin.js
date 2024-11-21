import { Employee } from "../models/Employee.js";
import { sendEmail } from "./email.js";

export async function AddEmployee(request, response) {
  try {
    const employee = await Employee.create(request.body);
    await sendEmail(
      request.body.email,
      "Email verification",
      `the code is : ${request.body.password}`
    );
    response.status(200).json("created");
  } catch (error) {
    console.log(error);
    response.status(500).json("errrrrrrrrrreur");
  }

}
export async function login(req,res) {
    try {
        const employee= await Employee.findOne({
            email:req.body.email,
            password:req.body.password
        })
        if(!employee){
            return res.status(404).json({message:"not found 404"})
        }
  
        
        const token = jwt.sign({id:employee._id},"signatureToken")

        return res.status(200).json({token:token})
    } catch (error) {

        res.status(500).json(error)
        
    }
  }
