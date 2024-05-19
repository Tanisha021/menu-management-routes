const mongoose = require("mongoose")
// Name: String
// Image: URL
// Description: String
// Tax Applicability: Boolean
// Tax: Number, if applicable
// Base Amount: Number
// Discount: Number
// Total Amount: Number (Base - Discount)
const ItemSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
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
        default: false
    },
    tax:{
        type:Number,
        required:false
    },
    baseAmount:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        default: 0
    },
    totalAmount:{
        type:Number,
        required:false
    },
    parentType:{
        type:String,
        required:true,
        enum:['Category','SubCategory']
    },
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'parentType'
    }

})
const Item = mongoose.model("Item",ItemSchema);

module.exports= Item
