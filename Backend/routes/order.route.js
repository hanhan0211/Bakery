import express from "express";
const router = express.Router();
import  {getAllOrders, getUserOrder, deleteOrder, createOrder, updateOrder} from "../controller/order.controller.js";
import protect from "../Middleware/auth.middleware.js";
//create order route
router.post("/", createOrder);

// update order route
router.put("/:id", updateOrder);

//get all order route
router.get("/", protect, getAllOrders);

//delete order
router.delete("/:id", deleteOrder);

//get users order route
router.get("/find/:userId", getUserOrder);
export default router;