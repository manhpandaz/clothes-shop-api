import express from "express";
import {
  addCart,
  getCart,
  getALLCart,
  updateCart,
  deleteCart,
} from "../controllers/cart.js";
import {
  verifyTokenAdmin,
  verifyToken,
  verifyTokenAndAuthorization,
} from "../controllers/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addCart);
router.get("/:id", verifyTokenAndAuthorization, getCart);
router.get("/", verifyTokenAdmin, getALLCart);
router.put("/", verifyTokenAndAuthorization, updateCart);
router.delete("/", verifyTokenAdmin, deleteCart);

export default router;
