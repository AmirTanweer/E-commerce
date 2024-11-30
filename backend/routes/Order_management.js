const express=require('express');
const router=express.Router();
const {body ,validationResult}=require('express-validator');
const fetchuser=require('../middleware/fetchuser');
const Order=require('../models/Order');
const Cart=require('../models/Cart');
//Route 1 - Create a new order using: POST "/api/order/createorder". Login required
router.post('/createorder',fetchuser,async(req,res)=>{
  const error=validationResult(req);
  if(!error.isEmpty()){ 
    return res.status(400).json({error: error.array()});
  }
  try{
   let cart=await Cart.findOne({user_id:req.user.id});
   
   let total_amount=0;
    for(let i=0;i<cart.products.length;i++){
        //  console.log(cart.products[i].price);
         total_amount+=cart.products[i].price*cart.products[i].quantity;
        
    }
    
    // console.log("products -> ",cart.products);
     let order=await Order.create({    
      user_id:req.user.id,
      products:cart.products, 
      address:req.body.address,
      status:"pending",
      payment_method:req.body.payment_method,
      total_amount:total_amount  
     });
     res.json(order); 
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

//Route 2 - Get all orders of a user using: GET "/api/order/getorders". Login required
router.get('/getorders',fetchuser,async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }
    try{
        let orders=await Order.find({user_id:req.user.id});
        res.json(orders);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//Route 3 - Cancel an order using: PUT "/api/order/cancelorder/:id". Login required
router.put('/cancelorder/:id',fetchuser,async(req,res)=>{
  const error=validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({error: error.array()});
  }
  try{
       let order=await Order.findById(req.params.id);
       if(!order){
        return res.status(404).send("Not Found");
       }
       if(order.user_id.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
       }
       order.status="cancelled";
       order=await order.save();
       res.json(order);
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports=router;