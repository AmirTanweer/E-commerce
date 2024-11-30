const User=require('../models/User');
const isAdmin=async(req,res,next)=>{
    
    let tempuser= await User.findById(req.user.id)
   
    if(tempuser.isAdmin){
        req.user=req.user;
        next();
    }
    else{
        return res.status(401).json({error:"You are not authorized to add a product"});
    }
}
module.exports=isAdmin