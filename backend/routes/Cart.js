const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const fetchuser=require('../middleware/fetchuser');
const Cart=require('../models/Cart');
const Product=require('../models/Product');
const {body,validationResult}=require('express-validator');
  
//Route 1 - Add a product to cart using :POST "/api/cart/addtocart". Login required

router.post('/addtocart/:productid',fetchuser,async(req,res)=>{
   const error=validationResult(req);
   if(!error.isEmpty()){
       return res.status(400).json({error: error.array()});
   }
   try{
     
    let cart=await Cart.findOne({user_id:req.user.id});
    let productPresent=await Cart.findOne({products:{$elemMatch:{products_id:req.params.productid}}});

  
   
       let product=await Product.findById(req.params.productid);
       if(!product){
           res.status(404).send("Not Found");
       }
       let temp_product={
           products_id:product._id,
           quantity:req.body.quantity,
           price:product.price,
           title:product.title
       }
     
         
           if(cart){
               if(productPresent){
                res.send("Product already present in cart");
               }
               else{

                   cart=await Cart.findOneAndUpdate({user_id:req.user.id},{$push:{products:temp_product}});
               }
            }
            else{
                cart=await Cart.create({user_id:req.user.id,products:[temp_product]});
            }
       
      res.json(cart);
      
   }
   catch(error){
       console.error(error.message);
       res.status(500).send("Internal Server Error");
       }

       })


//Route 2 - Remove a product from cart using :DELETE "/api/cart/removefromcart/:id". Login required
router.delete('/removefromcart/:productid',fetchuser,async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }
    try{
        let cart=await Cart.findOne({user_id:req.user.id});
        if(!cart){
            res.status(404).send("Not Found");
        }
        const productPresent=await Cart.findOne({products:{$elemMatch:{products_id:req.params.productid}}});
        if(!productPresent){
            res.status(404).send("Product not present in cart or Not Found");
        }
        cart=await Cart.findOneAndUpdate({user_id:req.user.id},{$pull:{products:{products_id:req.params.productid}}}); 
        res.json(cart); 
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 3 - Get all products in cart of a user using :GET "/api/cart/getcart". Login required
router.get('/getcart',fetchuser,async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }
    try{ 
           let cart=await Cart.find({user_id:req.user.id});
           res.json(cart);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports=router;