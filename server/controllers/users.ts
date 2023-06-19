import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: "getUsers",
  });
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    ok: true,
    msg: `getUser ${id}`,
  });
};

export const postUser = (req: Request, res: Response) => {
  const body = req;
  res.json({
    ok: true,
    msg: "postUser",
  });
};
