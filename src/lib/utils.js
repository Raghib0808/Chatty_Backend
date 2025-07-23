import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true, // Prevent JS access (XSS)
    secure: true, // HTTPS in production
    sameSite: "None", // "None" allows cross-origin cookies, required for Vercel/Render
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
