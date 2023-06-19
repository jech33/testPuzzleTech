import { Request, Response } from "express";
import Order from "../models/order";

export const getOrders = async (req: Request, res: Response) => {
  const { user } = req.query;
  if (!user) {
    return res.status(400).json({
      ok: false,
      msg: "User is mandatory",
    });
  }

  try {
    const orders = await Order.find({ user });
    res.json({
      ok: true,
      msg: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Orders retrieval failed - server error",
      error,
    });
  }
};

export const postOrder = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const newOrder = new Order(body);
    await newOrder.save();
    res.json({
      ok: true,
      msg: "Order created successfully",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Order creation failed",
      error,
    });
  }
};

export const putOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  const orderToDelete = await Order.findById(id);
  if (!orderToDelete) {
    return res.status(400).json({
      ok: false,
      msg: `Order ${id} not found`,
    });
  }

  try {
    await Order.findByIdAndUpdate(id, body);
    res.json({
      ok: true,
      msg: `Order ${id} updated successfully`,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Order update failed",
      error,
    });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const orderToDelete = await Order.findById(id);
  if (!orderToDelete) {
    return res.status(400).json({
      ok: false,
      msg: `Order ${id} not found`,
    });
  }

  try {
    await Order.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: `Order ${id} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Order deletion failed",
      error,
    });
  }
};
