const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true 
    },
    products:[
       {
        products_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        title:{
            type:String,
            required:true
        } 
       }
    ],
   
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    payment_method:{
        type:String,
        required:true
    },
    total_amount:{
        type:Number,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("Order",orderSchema);