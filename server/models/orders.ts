import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is mandatory"],
  },
  products: [
    {
      id: {
        type: String,
        required: [true, "Id is mandatory"],
      },
      title: {
        type: String,
        required: [true, "Title is mandatory"],
      },
      description: {
        type: String,
        required: [true, "Description is mandatory"],
      },
      category: {
        type: String,
        required: [true, "Category is mandatory"],
      },
      image: {
        type: String,
        required: [true, "Image is mandatory"],
      },
      price: {
        type: Number,
        required: [true, "Price is mandatory"],
      },
      rating: {
        rate: {
          type: Number,
          required: [true, "Rate is mandatory"],
        },
        count: {
          type: Number,
          required: [true, "Count is mandatory"],
        },
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is mandatory"],
      },
    },
  ],
  total: {
    type: Number,
    required: [true, "Total is mandatory"],
  },
  subtotal: {
    type: Number,
    required: [true, "Subtotal is mandatory"],
  },
  tax: {
    type: Number,
    required: [true, "Tax is mandatory"],
  },
  date: {
    type: Date,
    required: [true, "Date is mandatory"],
  },
  completed: {
    type: Boolean,
    required: [true, "Completed is mandatory"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is mandatory"],
  },
  currency: {
    type: String,
    required: [true, "Currency is mandatory"],
  },
});

OrderSchema.methods.toJSON = function () {
  const { __v, ...order } = this.toObject();
  return order;
};

export default model("Order", OrderSchema);
