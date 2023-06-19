import { Request, Response } from "express";

export const postLogin = (req: Request, res: Response) => {
  const { body } = req;
  res.json({
    ok: true,
    msg: "postLogin",
    body,
  });
};

export const postRegister = (req: Request, res: Response) => {
  const { body } = req;
  res.json({
    ok: true,
    msg: "postRegister",
    body,
  });
};
