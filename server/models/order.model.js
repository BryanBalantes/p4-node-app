import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
    },
    itemType: {
      type: String,
      required: [true, "Item type field is require"],
    },
    qty: {
      type: Number,
      required: [true, "Quantity field is required"],
    },
    size: {
      type: String,
      required: [true, "Size field is required"],
    },
    price: {
      type: Number,
      required: [true, "Price field is required"],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    image: {
      path: {
        type: String,
        required: [true, " Image path is reuired."],
      },
      filename: {
        type: String,
        required: [true, "Image filename is required."],
      },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);
export default Order;
