import express from "express";
const router = express.Router();
import {getAllUsers, getUser, deleteUser, updateUser} from "../controller/auth.controller.js";

//GET all users route
router.get("/", getAllUsers);

//delete user route
router.delete("/:id", deleteUser);

//update user route
router.put("/:id", updateUser);

//GET one user
router.get("/find/:userId", getUser);

export default router;