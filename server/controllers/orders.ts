import { Request, Response } from "express";

export const getOrders = (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: "getOrders",
  });
};

export const postOrder = (req: Request, res: Response) => {
  const body = req;
  res.json({
    ok: true,
    msg: "postOrder",
  });
};
