const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
    },
    category:{
        type:String,
    },
    image:{
        type:String,
        default:null
    },
    stockcount:{
        type:Number
    }
    
    

})
module.exports=mongoose.model("Product",productSchema);
