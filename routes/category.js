const express = require("express")
const {generateCategory,getAllCategories,getByIdCategories,editCategories}=require("../controllers/category")

const router=express.Router()

router.post("/create",generateCategory)
router.get("/",getAllCategories)
router.get("/:id",getByIdCategories)
router.put("/:id",editCategories)
module.exports=router;