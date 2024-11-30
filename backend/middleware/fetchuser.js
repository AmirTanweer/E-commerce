const express=require('express');
const jwt=require('jsonwebtoken');
const User=require('../models/User');
const secret='amir';
const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
    try{
        const data= jwt.verify(token,secret);
        req.user=data.user;
        
        next();
    }catch(error){
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
}
module.exports=fetchuser; 