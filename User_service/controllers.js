import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./model.js";
import { publishUserLogin } from "./producer.js";


// ================= SIGNUP =================
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // 🔎 Basic validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ errors: ["All fields are required"] });
    }

    if (password.length < 6) {
      return res.status(400).json({ errors: ["Password must be at least 6 characters"] });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: ["User already exists"] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // 🔐 Generate JWT
    const token = jwt.sign(
      { id: newUser._id, role: "user" },
      process.env.JWT_PASSWORD,
      { expiresIn: "1d" }
    );

    // 📨 Publish login/signup event
    publishUserLogin({
      userId: newUser._id.toString(),
      email: newUser.email,
      name: `${newUser.firstName} ${newUser.lastName}`,
    }).catch(err => console.error("RabbitMQ publish failed:", err));

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ errors: ["Error in signup"] });
  }
};



// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ errors: ["Email and password are required"] });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ errors: ["Invalid credentials"] });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ errors: ["Invalid credentials"] });
    }

    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_PASSWORD,
      { expiresIn: "1d" }
    );

    publishUserLogin({
      userId: user._id.toString(),
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    }).catch(err => console.error("RabbitMQ publish failed:", err));

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ errors: ["Error in login"] });
  }
};



// ================= LOGOUT =================
export const logout = async (req, res) => {
  res.status(200).json({
    message: "Logout successful. Remove token from client storage.",
  });
};
