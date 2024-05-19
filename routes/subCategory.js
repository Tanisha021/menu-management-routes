const express = require("express")
const {generateSubCategory,getAllSubCategories,generateSubCategoryByCategory,getSubCategoryById,editSubcategories}=require("../controllers/subCategory")

const router=express.Router()

router.post("/create",generateSubCategory)
router.get("/",getAllSubCategories)
router.get("/category/:categoryId",generateSubCategoryByCategory)
router.get("/:id",getSubCategoryById,)
router.patch("/:id",editSubcategories)

module.exports=router;