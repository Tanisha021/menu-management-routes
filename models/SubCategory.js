const mongoose = require("mongoose")
// Name: String
// Image: URL
// Description: String
// Tax Applicability: Boolean, Default: Category tax applicability 
// Tax: Number, Default: Category tax number

const SubCategorySchema= new mongoose.Schema({
    categoryId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    },
    name:{
        type:String,
        required:true,
        unique: true
    },
    image:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    tax_Applicability:{
        type:Boolean,
        required:true,
        default: false
    },
    tax:{
        type:Number,
        default: 0 ,
        required:false
    }
})
const SubCategory = mongoose.model("Subcategory",SubCategorySchema);

module.exports= SubCategory