import { addingCartItem, deleteCartProduct, fetchCartItems, updateCartQuantity } from "../Controller/cartController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
export function cartRoutes(app){
app.post("/cart/:id",verifyToken,addingCartItem);
app.get("/cart",verifyToken, fetchCartItems);
app.put("/cart/:id",verifyToken,updateCartQuantity);
app.delete("/cart/:id",verifyToken,deleteCartProduct)
}