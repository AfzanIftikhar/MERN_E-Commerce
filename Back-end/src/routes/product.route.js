import Router from "express"
import {
  createCategory,
  allCategories,
} from "../controllers/product.controller.js";
import multer from "multer";


const productRouter = Router()


const upload = multer({
  storage:multer.memoryStorage()
})


// POST /api/product/category
productRouter.post("/category", createCategory )

// GET /api/product/allCategories
productRouter.get("/allCategories", allCategories);



export default productRouter