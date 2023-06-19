import { Request, Response } from "express";
import User from "../models/user";

const bcryptjs = require("bcryptjs");

export const postLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Verify email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User not found",
      });
    }

    // Verify password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid password",
      });
    }

    res.json({
      ok: true,
      msg: "Login successfully",
      data: {
        user: {
          uid: user.id,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

export const postRegister = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      msg: "Email and password are mandatory",
    });
  }

  // Verify email exists
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      ok: false,
      msg: "User already exists",
    });
  }

  const newUser = new User({ email, password });

  const salt = bcryptjs.genSaltSync();
  newUser.password = bcryptjs.hashSync(password, salt);

  await newUser.save();

  res.json({
    ok: true,
    msg: "User created successfully",
    data: {
      user: { uid: newUser.id, email: newUser.email },
    },
  });
};
