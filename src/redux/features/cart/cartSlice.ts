// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TCartItem = {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image: string; // Add image property
};

const initialState = {
  items: [] as TCartItem[],
  count: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.product === item.product);

      if (existingItem) {
        // If the item already exists, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If the item is new, add it to the cart with quantity 1
        state.items.push({ ...item, quantity: 1 });
      }

      // Update the total count of items in the cart
      state.count += 1;
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((i) => i.product === itemId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          // If the item quantity is more than 1, decrease its quantity
          existingItem.quantity -= 1;
        } else {
          // If the item quantity is 1, remove it from the cart
          state.items = state.items.filter((item) => item.product !== itemId);
        }

        // Update the total count of items in the cart
        state.count -= 1;
      }
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((i) => i.product === itemId);

      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity
        state.count += 1; // Update total count
      }
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((i) => i.product === itemId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1; // Decrease quantity
          state.count -= 1; // Update total count
        } else {
          // If quantity is 1, remove the item
          state.items = state.items.filter((item) => item.product !== itemId);
          state.count -= 1; // Update total count
        }
      }
    },
    clearCart: (state) => {
      // Clear the entire cart
      state.items = [];
      state.count = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) => state.cart.count;

// Calculate subtotal for each item
export const selectSubtotal = (state: RootState) =>
  state.cart.items.map((item) => item.price * item.quantity);

// Calculate total price for the entire cart
export const selectTotalPrice = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;
