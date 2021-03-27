import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { User } from "../models/users";

const TOKEN_SECRET = "secretTokenThatShouldBeInADotenvFile";

export const hashPassword = async (password: string) => {
  const salt = await bcryptjs.genSalt();
  const hashedPassword = await bcryptjs.hash(password, salt);
  console.log(password);
  console.log(hashedPassword);
  return hashedPassword;
};

export const generateToken = (userId: number) =>
  jwt.sign(userId.toString(), TOKEN_SECRET);

const decodeToken = (token: string) =>
  jwt.verify(token, TOKEN_SECRET) as string;

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.userId) {
    return next();
  }

  res.status(401);
  res.json({ error: "User not authenticated" });
};

export const jwtAuthenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (!token) {
    return next();
  }

  try {
    const userId = parseInt(decodeToken(token));

    const user = await User.findOne({ where: { id: userId } });
    if (user) req.userId = userId;
  } catch (e) {
    console.log("ERROR: ", e);
    return next();
  }

  next();
};
