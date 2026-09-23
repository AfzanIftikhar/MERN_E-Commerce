
import config from "../config/config.js";
import categoryModel from "../models/Product_Models/Category.model.js";
import productModel from "../models/Product_Models/product.model.js";
import listingModel from "../models/Product_Models/Productlisting.model.js";
import { uploadImage } from "../services/storage.service.js";
import jwt from "jsonwebtoken"


// Creating a category
async function createCategory(req, res) {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name  is required",
      });
    }

    const category = await categoryModel.create({
      name,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error.name);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}


// fetching all the categories
async function allCategories(req, res) {

  try {

    const all_categories = await categoryModel.find();

    return res.status(200).json({
        success:true,
      message: "All categories are fetch successfully",
      all_categories,
    });
  }
  
  catch (error) {
    console.log(error);
    res.status(500).json({
        success:false,
      message: "Unable to fetch categories",
    });
  }
}

// Creating product
async function createProduct(req,res) {
  try {
    const { name, description, categoryId } = req.body;

    if (!name || !description || !categoryId) {
      return res.status(400).json({
        message: "Failed to fetch Data",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }
    const findCategoryId = await categoryModel.findById(categoryId);

    if (!findCategoryId) {
      return res.status(404).json({
        message: "Category is not found",
      });
    }

    const uploadResult = await uploadImage(req.file.buffer.toString('base64'));
    const imageUrl = uploadResult.url;

    const product = await productModel.create({
      name,
      description,
      image: imageUrl,
      category: categoryId,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Failed to create a product"
    })
  }


}

// Creating Listing 
async function create_listing(req,res) {

  try {
    const { productId, price, stock } = req.body;

    if (
      !productId ||
      price === undefined ||
      price <= 0 ||
      stock === undefined ||
      stock < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid productId, price, and stock",
      });
    }

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    const isProductExist = await productModel.findById(productId);

    if (!isProductExist) {
      return res.status(404).json({
        success: false,
        message: "Product does not exist",
      });
    }

    const exist_listing = await listingModel.findOne({
      productId: productId,
      sellerId: decoded.id,
    });

    if (exist_listing) {
      return res.status(409).json({
        success: false,
        message: "Listing already present",
      });
    }

    const listing = await listingModel.create({
      productId,
      price,
      sellerId: decoded.id,
      stock,
    });

    res.status(201).json({
      success: true,
      message: "Listing created successfully",
      listing,
    });


  } catch (error) {
      console.log(error)
      res.status(500).json({
        success:false,
        message:"Internal server error"
      })
  }
}


// Updating listing
async function update_listing(req,res){
  try {
    
    const token = req.headers.authorization?.split(" ")[1]
    const { id } = req.params;
    const {price , stock} = req.body

    if(!token){
      return res.status(403).json({
        success:false,
        message:"Invalid token"
      })
    }

    const decoded = jwt.verify(token , config.JWT_SECRET)

   
    if(price == undefined || price <= 0 || stock == undefined || stock < 0){
      return res.status(400).json({
        success:false,
        message:"price or stock must be greater or equal to 0"
      })
    }

    const listing = await listingModel.findById(id)

     if (!listing) {
       return res.status(404).json({
         success: false,
         message: "listing not found",
       });
     }
     if (decoded.id !== listing.sellerId.toString()) {
       return res.status(403).json({
         success: false,
         message: "Invalid User",
       });
     }

     const updated_list = await listingModel.findByIdAndUpdate(listing._id, {price,stock}, {new:true}) 
   
    let message = "Listing updated successfully";
    if (updated_list.stock === 0) {
      message = "Listing updated successfully - Out of stock";
    }

    

    res.status(200).json({
      success:true,
      message:"Listing updated successfully",
      updated_list

    })



  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:"Internal server error"
    })
  }
}




export {
  createCategory,
  allCategories,
  createProduct,
  create_listing,
  update_listing,
};
