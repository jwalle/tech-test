import express, { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { generateToken, hashPassword } from "./routeHelper";
import { User } from "../models/users";

const router = express.Router();

// @route POST /auth
// @desc authenticate an user or create a new one
// @access Public

router.post("/auth", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (user) {
      if (await bcryptjs.compare(password, user.password)) {
        const token = generateToken(user.id);
        res.status(200).send({ token, userId: user.id });
      } else {
        res.status(400).send({ msg: "Wrong password" });
      }
    } else {
      const newUser = await User.create({
        username,
        password: await hashPassword(password),
      });
      if (!newUser) throw Error("Something went wrong during cart creation");
      const token = generateToken(newUser.id);
      res.status(200).send({ token, userId: newUser.id });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: e });
  }
});

export { router as authRouter };
