import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart, updateQuantity } from "../utlis/CartSlice";
import Header from "./Header";
import Footer from "./footer";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <>
      <Header showPopularProducts={false}  showHeroSection={false} showFooter={false} />
      <div className="p-6 bg-gray-200 min-h-screen pt-16">
        <h1 className="text-2xl font-bold mb-10 text-center">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-4 max-w-7xl mx-auto">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </div>
                 
                 <div className="flex gap-5">

                {/* Quantity Modification */}
                <div className="flex items-center space-x-1">
                  <button    className="bg-gray-300 px-3 py-1 rounded text-lg"    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: (item.quantity || 1) - 1 }))}    disabled={(item.quantity || 1) <= 1}  >    -  </button>
                  <span className="text-lg font-semibold">{item.quantity || 1}</span>
                  <button   className="bg-gray-300 px-3 py-1 rounded text-lg"   onClick={() => dispatch(updateQuantity({ id: item.id, quantity: (item.quantity || 1) + 1 }))} >   + </button>
                </div>

                {/* Remove Button */}
                <button   onClick={() => dispatch(removeItem(item.id))}   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" >   Remove </button>
              </div>

              </div>
            ))}

            {/* Clear Cart */}
            <div className="text-right mt-6">
              <button  onClick={() => dispatch(clearCart())}  className="bg-gray-700 text-white px-5 py-2 rounded-lg mt-4 hover:bg-gray-900">Clear Cart</button>
            </div>
          </div>
          
        )}
      </div>
      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default Cart;
