import cartModel from "../Model/cartModel.js";
import productModel from "../Model/productModel.js";



// Adding items to cart
export async function addingCartItem(req, res) {
    try {
        const id = req.params.id;

        // Find the product in the products collection
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if the product already exists in the cart using productId
        let cartItem = await cartModel.findOne({ productId: id });

        if (cartItem) {
            // If the product exists, increase the quantity
            cartItem.quantity += 1;
            await cartItem.save();
        } else {
            // Add a new item to the cart
            cartItem = new cartModel({
                productId: id, // Store the product ID
                title: product.title,
                price: product.price,
                quantity: 1
            });
            await cartItem.save();
        }

        return res.status(200).json({ message: "Product added to cart", cartItem });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};




// Fetching Cart Items
export function fetchCartItems(req, res) {
    cartModel.find()
        .then(data => {
            if (data.length == 0) {
                return res.status(404).json({ message: "No products found in the cart!" });
            }
            res.status(200).json(data); // Ensure a proper response
        })
        .catch(err => res.status(500).json({ message: "Internal Server Error", error: err.message }));
}

// Updating Product Quantity

export async function updateCartQuantity(req, res) {
    try {
        const  {id}  = req.params; // Product ID
        const  {quantity}  = req.body; // New quantity from request body

        if (quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        // Find the cart item
        const cartItem = await cartModel.findOne({ productId : id });

        if (!cartItem) {
            return res.status(404).json({ message: "Product not found in the cart" });
        }

        // Update the quantity
        cartItem.quantity = quantity;
        await cartItem.save();

        return res.status(200).json({ message: "Cart updated successfully", cartItem });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}


  // Delete product from cart

  export async function deleteCartProduct(req, res) {
    try {
        const { id } = req.params;

        // Check if product exists in the cart
        const product = await cartModel.findOne({ productId: id });

        if (!product) {
            return res.status(404).json({ message: "No Product Found in Cart!" });
        }

        // Delete the product from the cart
        await cartModel.deleteOne({ productId: id });

        res.status(200).json({ message: "Product removed from cart successfully" });
    } catch (error) {
        console.error("Error deleting cart product:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
}

