import React, { act, createContext, useReducer } from "react";

export const CartContext = createContext();

/*
ADD_PRODUCT


REMOVE_PRODUCT
1 check if the product exist
2 if the product not exist then no change
3 if exist, decrement the quantity by 1 (quantity > 1)
4 remove product if quantity = 1 
5 calc new total price

DELETE_PRODUCT
1 filter the products directly
2 calc new total price
*/
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      // 1 check if the product exist
      const existingProductIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      // 2 if exist increment quantity
      let updatedProducts;
      if (existingProductIndex >= 0) {
        const updatedProduct = {
          ...state.products[existingProductIndex],
          quantity: state.products[existingProductIndex].quantity + 1,
        };
        updatedProducts = [...state.products];
        updatedProducts[existingProductIndex] = updatedProduct;
      } else {
        // 3 if not exist, add the product with quantity = 1
        updatedProducts = [
          ...state.products,
          { ...action.payload, quantity: 1 },
        ];
      }
      // 4 calc new total price
      const newTotalPrice = updatedProducts.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      return { ...state, products: updatedProducts, totalPrice: newTotalPrice };
    }
    case "REMOVE_PRODUCT": {
      // 1 check if the product exist
      const existingProductIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      // 2 if the product not exist then no change
      if (existingProductIndex < 0) return state;

      const existingProduct = state.products[existingProductIndex];
      // 3 if exist, decrement the quantity by 1 (quantity > 1)
      let updatedProducts;
      if (existingProduct.quantity > 1) {
        const updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity - 1,
        };
        updatedProducts = [...state.products];
        updatedProducts[existingProductIndex] = updatedProduct;
      } else {
        // 4 remove product if quantity = 1
        updatedProducts = state.products.filter(
          (item) => item.id !== action.payload.id
        );
      }
      // 5 calc new total price
      const newTotalPrice = updatedProducts.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      return { ...state, products: updatedProducts, totalPrice: newTotalPrice };
    }
    case "DELETE_PRODUCT": {
      // 1 filter the products directly
      const updatedProducts = state.products.filter(
        (item) => item.id !== action.payload.id
      );
      // 2 calc new total price
      const newTotalPrice = updatedProducts.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      return { ...state, products: updatedProducts, totalPrice: newTotalPrice };
    }
    default:
      return state;
  }
};

const initialState = {
  totalPrice: 0,
  products: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const addToCart = (product) => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
  };
  const removeProduct = (id) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: { id } });
  };
  const deleteProduct = (id) => {
    dispatch({ type: "DELETE_PRODUCT", payload: { id } });
  };

  return (
    <CartContext.Provider
      value={{ state, addToCart, removeProduct, deleteProduct }}
    >
      {children}
    </CartContext.Provider>
  );
};
