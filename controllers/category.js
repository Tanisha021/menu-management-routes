const Category = require("../models/Category")

async function generateCategory(req,res){
    const {name,image,desc,taxApplicability,taxNo,taxType}=req.body;
       try{
       const category=await Category.create({
        name,
        image,
        desc,
        taxApplicability,
        taxNo,
        taxType
       }) 
       return res.json(category);
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error')
    }
}       

async function getAllCategories(req,res){
    try{
        const allCategories = await Category.find({})
        res.json(allCategories)
    }catch (err) {
        res.status(500).send('Server Error');
    }
}

async function getByIdCategories(req,res){
    try{
        const idCategorie = await Category.findById(req.params.id)
        res.json(idCategorie)
    }catch (err) {
        res.status(500).send('Server Error');
    }
}

async function editCategories(req,res){
    const {name,image,desc,taxApplicability,taxNo,taxType}=req.body;
    try{
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {name,image,desc,taxApplicability,taxNo,taxType},
            {new:true}
        );
        res.json(category)
    }catch (err) {
        res.status(500).send('Server Error');
    }
}
module.exports={
    generateCategory,
    getAllCategories,
    getByIdCategories,
    editCategories
}