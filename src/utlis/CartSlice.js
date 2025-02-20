import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart",
    initialState : {
        items : [],
    },
    reducers : {
        addItem: (state, action) => {

            let item = state.items.find(
                (item) => item.id == action.payload.id
            );
            const data = {...action.payload, quantity: 1}

            if(!item){
                 state.items.push(data)
        }
            else{
                item.quantity++;
            }
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