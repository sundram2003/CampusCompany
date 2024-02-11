const { User } = require("../models/userModel");
const { hashPassword } = require("../utils/auth");
exports.register = async (req, res) => {
  try {
    //fetch data from req.body
    // console.log(req.body)
    const { firstName, lastName, email, password, confirmPassword, registrationNumber } = req.body;
    //check wheter all fields are present or not
    if (!firstName || !lastName || !email || !password || !registrationNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
    //check password and confirm password matches
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match"
      });
    }
    //check whether the user is already present or not
    const userDetail = await User.find({ email: email });
    if (userDetail.length != 0) {
      return res.status(401).json({
        success: false,
        message: "User already present",
        userDetail,
      });
    }
    //hash the password
    const hashedPassword = await hashPassword(password);
    //create entry in the database
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      registrationNumber,
    });
    //return success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    console.log("Error in register: ", error);
    return error;
  }

}