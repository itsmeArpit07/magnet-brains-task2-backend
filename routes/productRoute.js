import { Router } from "express";
import {
  addProductToCart,
  getProducts,
  removeOnevalueFromCart,
  removeProductFromCart,
} from "../controllers/productController.js";

const router = Router();

router.get("/getProducts", getProducts);
router.get("/addtocart/:id", addProductToCart);
router.get("/removeOneFromCart/:id", removeOnevalueFromCart);

export default router;
