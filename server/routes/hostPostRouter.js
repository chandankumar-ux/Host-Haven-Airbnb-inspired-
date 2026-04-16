import express from "express";
import { houseValidationSchema } from "../joiValidation/houseValidationSchema.js";
import validate from "../middlewares/joiMiddlewareValidation.js";
import hostChecker from "../middlewares/hostChecker.js";
import upload from "../middlewares/upload.js";
import { hostDashboardStats, getHostListings,createListing, deleteListing, getSingleListing, updateListing } from "../controller/hostPostController.js";
import asyncWrap from "../utils/asyncWrap.js";
const hostPostRouter=express.Router();
hostPostRouter.post("/listings",
    upload.fields([
    { name: "bedroomImages", maxCount: 5 },
    { name: "bathroomImages", maxCount: 5 },
    { name: "kitchenImages", maxCount: 5 },
    { name: "exteriorImages", maxCount: 5 },
    { name: "otherImages", maxCount: 10 },
  ]),
  validate(houseValidationSchema),
  hostChecker,
  createListing
);
hostPostRouter.get("/dashboard-stats",hostChecker,asyncWrap(hostDashboardStats));
hostPostRouter.get("/listings",hostChecker,asyncWrap(getHostListings));
hostPostRouter.delete("/listings/:id",hostChecker,asyncWrap(deleteListing));
hostPostRouter.put("/listings/:id", upload.fields([
    { name: "bedroomImages", maxCount: 5 },
    { name: "bathroomImages", maxCount: 5 },
    { name: "kitchenImages", maxCount: 5 },
    { name: "exteriorImages", maxCount: 5 },
    { name: "otherImages", maxCount: 10 },
  ]),hostChecker,asyncWrap(updateListing));
hostPostRouter.get("/listings/:id",hostChecker,asyncWrap(getSingleListing));

export default hostPostRouter;