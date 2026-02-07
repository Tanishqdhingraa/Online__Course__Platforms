import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  let token;

  // 1️⃣ Check Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2️⃣ If not in header, check cookies
  if (!token && req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD);

    req.user = {
      id: decoded.id,
      role: decoded.role || "user", // default role
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
