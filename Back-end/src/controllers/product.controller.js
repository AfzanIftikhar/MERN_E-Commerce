import categoryModel from "../models/Product_Models/Category.model.js";

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


async function allCategories(req, res) {
  try {
    const all_categories = await categoryModel.find();

    return res.status(200).json({
        success:true,
      message: "All categories are fetch successfully",
      all_categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
        success:false,
      message: "Unable to fetch categories",
    });
  }
}

export { createCategory, allCategories };
