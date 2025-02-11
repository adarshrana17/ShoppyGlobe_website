import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart",
    initialState : {
        items : [],
    },
    reducers : {
        addItem: (state, action) => {
            const product = action.payload;
            state.items.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image || product.images?.[0],
                description: product.description,
                brand: product.brand,
                rating: product.rating
            });
        },
        
        removeItem: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        
        clearCart : (state,action) => {
            state.items.length = 0;
        },
        updateQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
              item.quantity = Math.max(1, action.payload.quantity);
            }
          },
    }
})
export const {addItem,removeItem,clearCart,updateQuantity} = cartSlice.actions;

export default cartSlice.reducer;