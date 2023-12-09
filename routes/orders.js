import express from "express";
import {
  getOrder,
  getALLOrder,
  getIncome,
  addOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order.js";
import { verifyToken, verifyTokenAdmin } from "../controllers/verifyToken.js";
const router = express.Router();

router.get("/", verifyTokenAdmin, getALLOrder);
router.get("/find/:id", getOrder);
router.get("/income", verifyTokenAdmin, getIncome);
router.post("/", verifyToken, addOrder);
router.put("/", verifyTokenAdmin, updateOrder);
router.delete("/", verifyTokenAdmin, deleteOrder);
export default router;
