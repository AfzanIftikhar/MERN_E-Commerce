import Router from "express"
import {
  createCategory,
  allCategories,
  createProduct,
  create_listing,
} from "../controllers/product.controller.js";
import multer from "multer";


const productRouter = Router()


const upload = multer({
  storage:multer.memoryStorage(),
  limit:{fileSize : 5 * 1024 * 1024}
})


// POST /api/products/category
productRouter.post("/category", createCategory )

// GET /api/products/allCategories
productRouter.get("/allCategories", allCategories);

// POST /api/products/product
productRouter.post("/product",upload.single("image"),  createProduct);

// POST /api/products/listings
productRouter.post("/listing", create_listing)


export default productRouter