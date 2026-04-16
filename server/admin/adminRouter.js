import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { providerRequests } from "./dashboardController.js";
import { adminApproval,users,blockUnblockUser, getAllListings, toggleListingStatus, adminBookings } from "./dashboardController.js";
import {dashboardController} from "./dashboardController.js";
const adminRouter=express.Router();
adminRouter.get("/dashboard-stats",authMiddleware,dashboardController);
adminRouter.get("/provider-requests",authMiddleware,providerRequests);
adminRouter.get("/users",authMiddleware,users);
adminRouter.patch("/users",authMiddleware,blockUnblockUser);
adminRouter.get("/houses",authMiddleware,getAllListings);
adminRouter.patch(
  "/houses/:id/toggle",
  authMiddleware,
  toggleListingStatus
);
adminRouter.get("/bookings", authMiddleware, adminBookings);
adminRouter.post("/provider",adminApproval);

export default adminRouter;
