import { Router } from "express";
import {
  deleteOrder,
  getOrders,
  postOrder,
  putOrder,
} from "../controllers/orders";

const router = Router();

router.get("/", getOrders);
router.post("/", postOrder);
router.put("/:id", putOrder);
router.delete("/:id", deleteOrder);

export default router;
