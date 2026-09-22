import Router from "express"
import {
  createCategory,
  allCategories,
} from "../controllers/product.controller.js";


const productRouter = Router()

// POST /api/product/category
productRouter.post("/category", createCategory )

// GET /api/product/allCategories
productRouter.get("/allCategories", allCategories);



export default productRouter