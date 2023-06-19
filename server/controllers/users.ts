import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: "getUsers",
  });
};
