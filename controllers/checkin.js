import { response } from "express";
import {Employee} from "../models/Employee.js";
import User from "../models/User.js"
import bodyParser from "body-parser";


export async function checkin(req, res) {

    const { email, latitude, longtitude } = req.body;

    try {
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found." });
        }

        let check = employee.check;

        if (!check || check.length === 0 || check.at(-1).checkout) {
            // Create a new check-in entry if no check history exists or the last entry has a checkout
            employee.check.push({ checkin: Date.now(), latitude, longtitude });
            await employee.save();
            return res.status(200).json({ message: "New check-in created." });
        }

        const lastCheck = check.at(-1);

        if (!lastCheck.checkout) {
            // Add checkout time and calculate duration
            const now = Date.now();
            lastCheck.checkout = now;

            // Calculate duration in milliseconds and convert to Date format
            const durationMs = now - lastCheck.checkin.getTime();
            lastCheck.duration = new Date(durationMs); // Stores the duration as a Date

            await employee.save();

            // Convert duration to a human-readable format (hours, minutes, seconds)
            const durationInSeconds = Math.floor(durationMs / 1000);
            const hours = Math.floor(durationInSeconds / 3600);
            const minutes = Math.floor((durationInSeconds % 3600) / 60);
            const seconds = durationInSeconds % 60;

            return res.status(200).json({
                message: "User checked out.",
                duration: `${hours} hours, ${minutes} minutes, ${seconds} seconds`,
            });
        }

        // If all cases are handled, fallback response
        return res.status(400).json({ message: "Invalid request." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred.", error });
    }
}
