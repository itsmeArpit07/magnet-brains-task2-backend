import Cart from "../models/cartSchema.js";
import Product from "../models/productModel.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json(new ApiResponse(200, products, "success"));
});

export const addProductToCart = asyncHandler(async (req, res, next) => {
  const product = await Cart.findOne({ productID: req.params.id });

  if (product) {
    const updated = await Cart.findOneAndUpdate(
      { productID: req.params.id },
      { $inc: { count: 1 } },
      {
        new: true,
      }
    );
    res.status(200).json(new ApiResponse(200, updated, "success"));
  } else {
    const newItem = new Cart({ productID: req.params.id, count: 1 });
    await newItem.save();
    res.status(200).json(new ApiResponse(200, newItem, "success"));
  }
});

export const removeProductFromCart = asyncHandler(async (req, res, next) => {
  const product = await Cart.findOne({ productID: req.params.id });
  if (product) {
    await Cart.deleteOne({ productID: req.params.id });
  }
  res.status(200).json(new ApiResponse(200, product, "success"));
});

export const removeOnevalueFromCart = asyncHandler(async (req, res, next) => {
  const product = await Cart.findOne({ productID: req.params.id });
  if (product) {
    const updated = await Cart.findOneAndUpdate(
      { productID: req.params.id },
      { $inc: { count: -1 } },
      {
        new: true,
      }
    );
    res.status(200).json(new ApiResponse(200, updated, "success"));
  }
});
