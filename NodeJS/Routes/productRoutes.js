
import { createProduct, fetchProduct, fetchProducts } from "../Controller/productController.js";
// import cartItems from "../Module/cartModule.js";

export function routes(app){
    app.post("/product",createProduct);
    app.get("/products",fetchProducts);
    app.get("/product/:id",fetchProduct);
}