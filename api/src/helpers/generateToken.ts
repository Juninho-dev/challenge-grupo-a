import jwt from "jsonwebtoken";

export function generateToken(params = {}, userId: string) {
  return jwt.sign(params, process.env.JWT_SECRET!, {
    expiresIn: "1d",
    subject: userId,
  });
}
