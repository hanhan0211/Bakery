import{ratingProduct,getAllproducts, getProduct,createProduct, updateProduct, deleteProduct} from "../controller/product.coltroller.js";
import express from "express";
const router = express.Router();

//rating product route
router.put("/rating/:productId", ratingProduct);
//GET all products
router.get("/",getAllproducts);
//GET one product
router.get("/find/:id", getProduct);
//create product
router.post("/", createProduct);
//update product
router.put("/:id",updateProduct);

//delete product
router.delete("/:id", deleteProduct);

export default router;