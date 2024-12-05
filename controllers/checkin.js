import { response } from "express";
import {Employee} from "../models/Employee.js";
import User from "../models/User.js"
import bodyParser from "body-parser";


export async function checkin(req,res) {
    try {
        const employee= await Employee.findById(req.body.id)
        let check = employee.check
        if(!check){
            employee.check.push({checkin:Date.now()})
            await employee.save()
            return res.status(201).json("new check in ");
        }
        console.log();
        
        console.log(check);
        
        if(check.at(check.length -1).checkout == undefined){
            employee.check.at(check.length -1).checkout = Date.now()
            await employee.save()
            return res.status(200).json("user checked out ");
        }else{
            employee.check.push({checkin:Date.now()})
            await employee.save()
            return res.status(201).json("new check in ");
        }



    }catch (error) {
            console.log(error);
            
            res.status(500).json(error)


    }
    


}