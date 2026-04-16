import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js";
import { getSingleHouse,getListings,searchListings } from "../controller/postController.js";
import asyncWrap from "../utils/asyncWrap.js";
const postRouter=express.Router();
postRouter.get("/listings/",asyncWrap(getListings));
postRouter.get("/listings/search", asyncWrap(searchListings));
postRouter.get("/listings/:id",asyncWrap(getSingleHouse));


export default postRouter;