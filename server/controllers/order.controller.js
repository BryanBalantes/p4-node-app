import Order from "../models/order.model.js";
import { cloudinary } from "../config/storage.js";

const createOrder = async (req, res) => {
  try {
    const { userId, itemType, qty, size, price, totalPrice } = req.body;
    const { path, filename } = req.file;

    // const result = await cloudinary.uploader.upload(req.file.path);

    const newOrder = new Order({
      userId,
      itemType,
      qty,
      size,
      price,
      totalPrice,
      image: {
        path,
        filename,
      },
    });
    await newOrder.save();
    res.status(201).send({
      message: "New Order created.",
      data: newOrder,
    });
  } catch (error) {
    console.error(error.message);
    res.status(res.statusCode).send({
      message: error.message,
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({ deleted: false })
      .select(["-updatedAt"])
      .sort({ createdAt: -1 })
      .populate({
        path: "userId",
        select: "name",
      });
    res.status(200).send({
      message: "List of Orders.",
      data: orders,
    });
  } catch (error) {
    console.error(error.message);
    res.status(res.statusCode).send({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const orderById = await Order.findById({ _id: orderId })
      .select("-updatedAt")
      .populate({
        path: "userId",
        select: "name",
      });

    res.status(200).send({
      message: `Order with ID ${orderId}`,
      data: orderById,
    });
  } catch (error) {
    console.error(error.message);
    res.status(res.statusCode).send({ message: error.message });
  }
};

const softDeleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!order) {
      return res.status(404).send({ error: "Order not found!" });
    }

    res.status(200).send({ message: "Order removed successfully", order });
  } catch (error) {
    console.error(error.message);
    res.status(res.statusCode).send({ message: error.message });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const { orderId, imageFilename } = req.params;

    const { deletedCount } = await Order.deleteOne({ _id: orderId });

    if (!deletedCount) {
      res.status(404).send({ message: "Order not found or already deleted." });
    }

    const result = await cloudinary.uploader.destroy(
      `image_item/${imageFilename}`
    );

    if (result.result !== "ok") {
      res
        .status(500)
        .send({ message: "Something went wrong while deleting the image." });
    }
    res.status(200).send({ message: "Order and image successfully deleted." });
  } catch (error) {
    console.error(error.message);
    res.status(res.statusCode).send({ message: error.message });
  }
};

export {
  createOrder,
  getAllOrder,
  getOrderById,
  softDeleteOrderById,
  deleteOrderById,
};
