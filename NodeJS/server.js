import express from "express";
import mongoose from "mongoose";
import { routes } from "./Routes/productRoutes.js";
import { cartRoutes } from "./Routes/cartRoutes.js";
import { userRoutes } from "./Routes/userRoutes.js";

 mongoose.connect("mongodb://localhost:27017");

 const db = mongoose.connection;

 

db.on("open",()=>{
    console.log("Connected Successfully");
})
db.on("error",()=>{
    console.log("connection failed")
})

const app = express();

app.listen(5100,()=>{
    console.log("Server is running in port 5100")
})

app.use(express.json())
routes(app);
cartRoutes(app);
userRoutes(app);


//Creating Products
