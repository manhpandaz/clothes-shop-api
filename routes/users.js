import express from "express";
import {
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUserStats,
} from "../controllers/user.js";
import {
  verifyTokenAndAuthorization,
  verifyTokenAdmin,
} from "../controllers/verifyToken.js";
const router = express.Router();

router.get("/", verifyTokenAdmin, getAllUser);
router.get("/stats", verifyTokenAdmin, getUserStats);
router.get("/find/:id", verifyTokenAdmin, getUser);
router.put("/:id", verifyTokenAndAuthorization, updateUser);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

export default router;
