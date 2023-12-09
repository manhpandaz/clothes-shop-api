import express from "express";

const router = express.Router();

router.post("/payment", payment);

export default router;
