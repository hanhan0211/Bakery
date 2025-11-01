import Banner from "../models/banner.model.js";
import asyncHandler from "express-async-handler";

//create banner
const createBanner = asyncHandler(async(req,res) =>{
    const newBanner = Banner(req.body);
    const saveBanner = newBanner.save();

    if(!saveBanner){
        res.status(400);
        throw new Error("Banner was not created");
    }else{
        res.status(200).json(saveBanner);
    }
});

//delete banner
const deleteBanner = asyncHandler(async(req,res) =>{
    const banner = await Banner.findByAndDelete(req.params.id);
    if(banner){
        res.status(400);
        throw new Error("Banner was not deleted");
    }else{
        res.status(201).json("Banner was deleted successfully");
    }
});

//GET all banners
const getAllBanners = asyncHandler(async(req,res) =>{
    const banners = await Banner.find();
    if(!banners){
        res.status(400);
        throw new Error("Banners were not fetched or something went wrong")
    }else{
        res.status(200).json(banners);
    }
})

//GET random banner
const getRandomBanner = asyncHandler(async(req,res) =>{
    const banners = await Banner.find();

    if(!banners){
        res.status(400);
        throw new Error("Banners were not fetched or something went wrong")

    }else{
        const randomIndex = Math.floor(Math.random() * banners.lenght);
        const randomBanner = banners[randomIndex];
        res.status(200).json(randomBanner);
    }
});

export {getAllBanners, createBanner, deleteBanner, getRandomBanner};