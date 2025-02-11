import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [
        { id: 1, name: "Product 1", price: 19.99, quantity: 2 },
        { id: 2, name: "Product 2", price: 29.99, quantity: 1 },
        { id: 3, name: "Product 3", price: 39.99, quantity: 3 },
    ],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
    },
});

export const { updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
