const express = require("express")
const {generateItems,getAllItems,getAllItemsOfCategory,getAllItemsOfSubCategory,getItemById,getItemByName,editItems,searchItems}=require("../controllers/item")

const router=express.Router()

// Get all items under a category
router.post("/create",generateItems)
router.get("/",getAllItems)
router.get('/category/:categoryId',getAllItemsOfCategory)
router.get('/subcategory/:subCategoryId',getAllItemsOfSubCategory)
router.get('/:id',getItemById)
router.get('/name/:name',getItemByName)
router.patch('/:id',editItems)
router.get('/search',searchItems)
//GET /api/items/search?name=Example%20Item
module.exports=router;



