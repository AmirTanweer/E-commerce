const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const {body,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs')
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const secret='amir';
//Route 1 - Create a User using: POST "/api/auth/register". No login required

router.post('/register',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be at least 5 characters').isLength({min:5})
],async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }
    try{
        let user=await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error: "Sorry a user with this email already exists"})
        }
       //password hash
       const salt= await bcrypt.genSaltSync(10);
      const secpassword=await bcrypt.hash(req.body.password,salt);

      user=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secpassword,
        isAdmin:req.body.isAdmin
    })
   const data={
    user:{id:user.id}
   }

     authToken=jwt.sign(data,secret)
    res.json(authToken);

   }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
   }
})

//Route 2 - Login a User using: POST "/api/auth/login". No login required

router.post('/login',[
 body('email','Enter a valid email').isEmail(),
 body("password","Password cannot be blank").exists(),
],async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }
    try{
        let user=await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({error: "Invalid credentials! please try to login with correct credentials"});
        }
        const passwordFromDatabase=user.password; 
        const passwordFromUser=req.body.password;
     const password=await bcrypt.compare(passwordFromUser,passwordFromDatabase);
     if(!password){
        
        return res.status(400).json({error: "Invalid credentials! please try to login with correct credentials"});
     }
     const data={
        user:{id:user.id}
     }
     const authToken=jwt.sign(data,secret);
     res.json(authToken);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports=router