const express=require('express');
const cors=require('cors');
const connetDB=require('./db');
const dotenv=require('dotenv');
dotenv.config();
const app=express();
const authentication=require('./routes/authentication');
const product=require('./routes/product');
const cart=require('./routes/Cart');
order=require('./routes/Order_management');
const port=process.env.PORT || 5000;
const uri=process.env.MONGO_DB_URI;
app.use(cors());
app.use(express.json());
 

app.use('/api/auth',authentication);
app.use('/api/products',product); 
app.use('/api/carts',cart); 
app.use('/api/orders',order);

connetDB(uri);
app.listen(port,()=>{
    console.log("server listening at port",port);
})