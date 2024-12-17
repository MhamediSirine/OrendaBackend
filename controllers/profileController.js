import { Employee } from "../models/Employee.js";
import User from "../models/User.js";


export async function updateProfile(request, response) {
  const { name, lastName, adress, email } = request.body;

  const user = await User.findOne({ email });

  if (!user) return response.status(404).json({ message: "User not found" });

  await User.updateOne(
    { email },
    {
      $set: {
        name,
        lastName,
        adress,
      },
    },
    { upsert: true }
  );

  return response.status(200).json({
    message: "updated",
  });
}
export async function GetAllUser(req, res) {
  try {
    const usersfound = await Employee.find();

    return res.status(200).json({ message: "users found", user: usersfound });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
}

export async function GetUserBy(req, res) {
  try {
    const usersBy = await Employee.find(req.params.id);
    if (usersBy) {
      return res.status(200).json({ message: "users found", user: usersBy });
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
}
