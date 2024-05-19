const mongoose = require("mongoose")
// Name: String
// Image: URL
// Description: String
// Tax Applicability: Boolean
// Tax: Number, if applicable
// Tax type

const CategorySchema= new mongoose.Schema({
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
    taxApplicability:{
        type:Boolean,
        default:0,
    },
    taxNo:{
        type:Number,
        required:false
    },
    taxType:{
        type:String,
        required:false
    }
})
const Category = mongoose.model("category",CategorySchema);

module.exports= Category