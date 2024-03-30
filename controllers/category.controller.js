const category_model = require("../models/category.model");

// Create New Category
exports.createNewCategory = async (req, res) => {
  const category_data = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    availability: req.body.availability,
    shippingInformation: req.body.shippingInformation,
    //category:req.body.category
  };
  try {
    const category = await category_model.create(category_data);
    return res.status(201).send(category);
  } catch (error) {
    console.log("error while creating the category", error);
    return res.status(500).send({
      message: "error while creating the category",
    });
  }
};

// New Functions: Delete, Edit, Retrieve, Retrieve All Categories

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const deletedCategory = await category_model.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error while deleting category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Edit Category
exports.editCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updatedCategory = await category_model.findByIdAndUpdate(
      categoryId,
      req.body,
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error while updating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Retrieve (Get) Category
exports.getCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await category_model.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Error while retrieving category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Retrieve All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await category_model.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error while retrieving categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
