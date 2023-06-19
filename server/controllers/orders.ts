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

export const putOrder = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    ok: true,
    msg: `putOrder ${id}`,
  });
};

export const deleteOrder = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    ok: true,
    msg: `deleteOrder ${id}`,
  });
};
