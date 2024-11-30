const mongoose=require('mongoose');




const connetDB=(uri)=>{
   mongoose.connect(uri).then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log(err);
    })
}
module.exports=connetDB