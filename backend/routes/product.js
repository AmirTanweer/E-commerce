const express=require('express');
const mongoose=require('mongoose');
const router=express.Router(); 
const fetchuser=require('../middleware/fetchuser');
const Product=require('../models/Product');
const User=require('../models/User');
const {body , validationResult}=require('express-validator');
const isAdmin = require('../middleware/isAdmin');

//Route 1 - Add a new Product using: POST "/api/product/addproduct". Login required
router.post('/addproduct',[
    body("title","Enter a valid title").isLength({min:3}),
    body("description","Description should be atleast 5 characters").isLength({min:5}),
    body("price","Enter a valid price").isNumeric(),
    body("stockcount","Enter a valid stockcount").isNumeric().exists()
],fetchuser,isAdmin,async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }
    try{ 
       
        const {title,description,price,category,image,stockcount}=req.body;
        const product=await Product.create({  
            userid:req.user.id,
            title,
            description,
            price,
            category,
            image, 
            stockcount
        });
        res.json(product);

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//Route 2 - Get all the products using: GET "/api/product/fetchallproducts". login required
router.get('/fetchallproducts',fetchuser,async(req,res)=>{
    const error=validationResult(req);  
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }
   try{ 
    const products=await Product.find({userid:req.user.id}).sort({date:-1}).select("-userid");
    res.json(products);
   }
   catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
   }
})

//Route 3 - Update an existing product using: PUT "/api/product/updateproduct/:id". Login required
router.put('/updateproduct/:id',[
    body("title","Enter a valid title").isLength({min:3}),
    body("description","Description should be atleast 5 characters").isLength({min:5}),
    body("price","Enter a valid price").isNumeric(),
    body("stockcount","Enter a valid stockcount").isNumeric().exists()
],fetchuser,isAdmin,async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }
    try{
             let newproduct={};
             if(req.body.title){newproduct.title=req.body.title};
             if(req.body.description){newproduct.description=req.body.description};
             if(req.body.price){newproduct.price=req.body.price};
             if(req.body.category){newproduct.category=req.body.category};
             if(req.body.image){newproduct.image=req.body.image};
             if(req.body.stockcount){newproduct.stockcount=req.body.stockcount};
             let product=await Product.findById(req.params.id);
             if(!product){
                res.status(404).send("Not Found");
             }
             if(product.userid.toString()!==req.user.id){
                res.status(401).send("Not Allowed");
             }
             product=await Product.findByIdAndUpdate(req.params.id,{$set:newproduct},{new:true});
             res.json(product);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 4 - Delete an existing product using: DELETE "/api/product/deleteproduct/:id". Login required

router.delete('/deleteproduct/:id',fetchuser,isAdmin,async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }
    try{
        let product=await Product.findById(req.params.id);
        if(!product){
            res.status(404).send("Not Found");
        }
        if(product.userid.toString()!==req.user.id){
            res.status(401).send("Not Allowed");
        }
        product=await Product.findByIdAndDelete(req.params.id);
        res.json({"Success":"Product has been deleted"});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//Route 5 -Get a specific product using: GET "/api/product/getproduct/:id". Login required
router.get('/getproduct/:id',fetchuser,async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }
    try{
       let product=await Product.findById(req.params.id);
       if(!product){
        res.status(404).send("Not Found");
       }
       res.json(product);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports=router;