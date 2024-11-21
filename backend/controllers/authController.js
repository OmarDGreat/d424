import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// Signup user
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password }); // Do not hash the password here

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error });
  }
};


// Login user
// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    console.log("User Found:", user); // Log user data
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" }); // User not found
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password Valid:", isPasswordValid); // Log password comparison result
    console.log('Input Password:', password);
    console.log('Stored Hashed Password:', user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" }); // Password mismatch
    }

    // If email and password are correct, return user and token
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });

    console.log("Password Input:", password);
    console.log("Stored Password Hash:", user.password);
    console.log("Password Valid:", isPasswordValid);  

  } catch (error) {
    console.error("Login Error:", error); // Log any other errors
    res.status(500).json({ message: "Failed to login user", error });
  }
};