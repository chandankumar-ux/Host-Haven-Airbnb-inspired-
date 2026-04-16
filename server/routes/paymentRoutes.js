import express from "express";
import { createOrder, verifyPayment } from "../controller/paymentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", authMiddleware, createOrder);
paymentRouter.post("/verify", authMiddleware, verifyPayment);

export default paymentRouter;
