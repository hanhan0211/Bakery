import express from "express";
const router = express.Router();
import {getAllBanners, createBanner, deleteBanner, getRandomBanner} from "../controller/banner.controller.js";

//create banner route
router.post("/", createBanner);
//GET all banner route
router.get("/",getAllBanners);
//delete banner route
router.delete("/:id", deleteBanner);
//get random banner route
router.get("/random", getRandomBanner);
export default router;