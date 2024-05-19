const SubCategory = require("../models/SubCategory")
const Category = require("../models/Category");
// const { json } = require("body-parser");

// generate subcategory
async function generateSubCategory(req,res){
    const {categoryId,name,image,desc,tax_Applicability,tax}=req.body
    try{
        const category = await Category.findById(categoryId)
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        const subCategory = new SubCategory({
            categoryId:categoryId,
            name,
            image,
            desc,
            tax_Applicability,
            tax
        })
        await subCategory.save();
        return res.json(subCategory);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
// all subcategories
async function getAllSubCategories(req,res){
    try {
        const subCategories = await SubCategory.find();

        // Check if there are no subcategories found
        if (subCategories.length === 0) {
            return res.status(404).json({ error: "No subcategories found" });
        }

        // Return the subcategories
        res.json(subCategories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Get all subcategories under a category
async function generateSubCategoryByCategory(req,res){
    const {categoryId} = req.params;
    try{
        const subcategories = await SubCategory.find({categoryId:categoryId})

        if(subcategories.length==0){
            return res.status(404).json({ error: "No subcategories found for this category" });
        }
        res.json(subcategories)
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

//get subcategories by id
async function getSubCategoryById(req,res){
    try{
        const idSubcategories = await SubCategory.findById(req.params.id)
        res.json(idSubcategories)
    }catch (err) {
        res.status(500).send('Server Error');
    }
}

// edit subcategory
async function editSubcategories(req,res){
    const updates =req.body
    try{
        const subCategory = await SubCategory.findByIdAndUpdate(
            req.params.id,
            {$set:updates},
            {new:true,runValidators:true}
        )
        // If subcategory not found, return 404
        if (!subCategory) {
            return res.status(404).json({ error: "Sub-category not found" });
        }
        // Return the updated subcategory
        res.json(subCategory);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
module.exports={
    generateSubCategory,
    getAllSubCategories,
    generateSubCategoryByCategory,
    getSubCategoryById,
    editSubcategories
}