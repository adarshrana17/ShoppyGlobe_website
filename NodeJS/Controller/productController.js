import productModel from "../Model/productModel.js";

// Creating Products
export function createProduct(req,res){
const {title,price,rating,brand,stock,description} = req.body;

const newProduct = new productModel({
    title,
    price,
    rating,
    brand,
    stock,
    description
});

newProduct.save().then(data => {
    if(!data){
        return res.status(400).send("Semothing went wrong");
    }
    res.send(data);
}).catch((err) => res.status(500).json({message: err.message}))

}

// Fetching all Proucts

export function fetchProducts(req,res){
    productModel.find().then(data=>{
        if(data.length === 0){
            return res.status(404).json({message:"No Product Found!"})
        }
        res.send(data);
    }).catch((err)=>res.status(500).json({message:err.message}))
}

//Fetching single product

export function fetchProduct(req,res){
   const _id = req.params.id;
   productModel.findOne({_id}).then((product) =>{
      if(!product){
        return res.status(404).json({message:"No product found with this id"})
      }
      res.send(product);
   }).catch((err)=>res.status(500).json({message:err.message}))
}

