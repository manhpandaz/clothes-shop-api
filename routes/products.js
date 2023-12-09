import express from "express";
import {
  getProduct,
  getALLProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";
import { verifyTokenAdmin } from "../controllers/verifyToken.js";
const router = express.Router();

router.post("/", verifyTokenAdmin, addProduct);
router.get("/find/:id", getProduct);
router.get("/", getALLProduct);
router.put("/update/:id", verifyTokenAdmin, updateProduct);
router.delete("/:id", verifyTokenAdmin, deleteProduct);
// router.get("/find/:title", verifyTokenAdmin, getALLProduct);

export default router;
