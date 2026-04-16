import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getBookingDetails } from "../controller/bookingsController.js";
import asyncWrap from "../utils/asyncWrap.js";
const bookRouter=express.Router();
bookRouter.get("/:id",authMiddleware,asyncWrap(getBookingDetails));
export default bookRouter;