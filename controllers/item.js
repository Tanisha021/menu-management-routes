const SubCategory = require("../models/SubCategory")
const Category = require("../models/Category");
const Item = require("../models/Item")

// Items will be created under a sub-category or a category
async function generateItems(req,res){
    const {name,image,desc,tax_Applicability,tax,baseAmount,discount,subCategoryId,categoryId}=req.body
    try{
        let parent
        if (subCategoryId) {
            parent = await SubCategory.findById(subCategoryId);
        } else {
            parent = await Category.findById(categoryId);
        }

        // Calculate total amount
        const totalAmount = baseAmount - (discount || 0);

        const item = new Item({
            name,
            image,
            desc,
            tax_Applicability,
            tax,
            baseAmount,
            discount,
            totalAmount,
            parentType: subCategoryId ? 'SubCategory' : 'Category',
            parentId: subCategoryId || categoryId
        });
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// API to get all items 
async function getAllItems(req,res){
    try{
        const allItems = await Item.find();
        if (allItems.length === 0) {
            return res.status(404).json({ error: "No subcategories found" });
        }

        // Return the items
        res.json(allItems);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// API to get all items under a category
async function getAllItemsOfCategory(req,res){
    try{
        const categoryItems = await Item.find({ categoryId: req.params.categoryId });
        res.json(categoryItems)
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// API to get all items under a sub-category
async function getAllItemsOfSubCategory(req,res){
    try{
        const subCategoryItems = await Item.findOne({ subCategoryId: req.params.subCategoryId});
        res.json(subCategoryItems)
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// API to get an item by name or ID along with its attributes
async function getItemById(req,res){
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
async function getItemByName(req,res){
    try {
        const item = await Item.findOne({ name: req.params.name });
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Edit Items :API to edit item attributes
async function editItems(req,res){
    const updates =req.body
    try{
        const editeditem = await Item.findByIdAndUpdate(
            req.params.id,
            {$set:updates},
            {new:true,runValidators:true}
        )
        res.json(editeditem);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// API to search the item by its name
async function searchItems(req,res){
    const itemName = req.query.name;
    try {
        const items = await Item.findOne({ name: { $regex: new RegExp(itemName, 'i') } });

        if (items.length === 0) {
            return res.status(404).json({ error: 'No items found' });
        }

        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports={
    generateItems,
    getAllItems,
    getAllItemsOfCategory,
    getAllItemsOfSubCategory,
    getItemById,
    getItemByName,
    editItems,
    searchItems
}