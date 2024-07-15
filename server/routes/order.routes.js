import { Router } from "express";
import multer from "multer";
import { storage } from "../config/storage.js";
import {
  createOrder,
  getAllOrder,
  getOrderById,
  softDeleteOrderById,
  deleteOrderById,
} from "../controllers/order.controller.js";
import { verifyAccessToken } from "../middlewares/auth.middlewares.js";

const orderRouter = Router();
const orderImage = multer({ storage });

orderRouter.post(
  "/",
  orderImage.single("order-image"),
  verifyAccessToken,
  createOrder
);
orderRouter.get("/", getAllOrder);
orderRouter.get("/:ordertId", getOrderById);
orderRouter.delete("/delete/:id", softDeleteOrderById);
orderRouter.delete("/:orderId/:imageFilename", deleteOrderById);

export default orderRouter;
