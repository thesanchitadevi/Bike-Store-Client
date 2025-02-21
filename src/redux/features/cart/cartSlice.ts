/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Load cart data from localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : { items: [], count: 0 };
};

// Save cart data to localStorage
const saveCartToLocalStorage = (cart: any) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// type TCartItem = {
//   product: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string; // Add image property
// };

// const initialState = {
//   items: [] as TCartItem[],
//   count: 0,
// };
const initialState = loadCartFromLocalStorage(); // Load cart data from localStorage
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i: any) => i.product === item.product
      ); // Check if product exists

      if (existingItem) {
        // If the product exists, update its quantity
        existingItem.quantity += item.quantity; // Add the new quantity to the existing quantity
      } else {
        // If the product does not exist, add it to the cart
        state.items.push(item);
      }

      // Update the total count of items in the cart
      state.count += item.quantity;
      saveCartToLocalStorage(state); // Save cart data to localStorage
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((i: any) => i.product === itemId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          // If the item quantity is more than 1, decrease its quantity
          existingItem.quantity -= 1;
        } else {
          // If the item quantity is 1, remove it from the cart
          state.items = state.items.filter(
            (item: any) => item.product !== itemId
          );
        }

        // Update the total count of items in the cart
        state.count -= 1;
      }
      saveCartToLocalStorage(state); // Persist cart state
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((i: any) => i.product === itemId);

      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity
        state.count += 1; // Update total count
      } else {
        state.items = state.items.filter(
          (item: any) => item.product !== itemId
        );
        state.count -= 1;
      }

      saveCartToLocalStorage(state); // Persist cart state
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((i: any) => i.product === itemId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1; // Decrease quantity
          state.count -= 1; // Update total count
        } else {
          // If quantity is 1, remove the item
          state.items = state.items.filter(
            (item: any) => item.product !== itemId
          );
          state.count -= 1; // Update total count
        }
      }
      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      // Clear the entire cart
      state.items = [];
      state.count = 0;
      saveCartToLocalStorage(state);
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
  state.cart.items.map(
    (item: { price: number; quantity: number }) => item.price * item.quantity
  );

// Calculate total price for the entire cart
export const selectTotalPrice = (state: RootState) =>
  state.cart.items.reduce(
    (total: number, item: { price: number; quantity: number }) =>
      total + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;
