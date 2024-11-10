import React, { useContext } from "react";

import { CartContext } from "../context/cartContext";
const Cart = () => {
  const { state , addToCart ,removeProduct, deleteProduct } = useContext(CartContext);

  let { products, totalPrice } = state;
  console.log(state);
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Shopping Cart</h2>
      {products?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {products?.map((item) => (
              <li
                key={item.id}
                className="bg-white shadow-lg rounded flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-500">Quantity:<span className="text-2xl"> {item.quantity} </span> </p>
                  <p className="text-lg font-bold">
                    Price: ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className = "flix space-x-2">
                  <button onClick={()=> addToCart(item) } className="bg-green-500 text-white px-3 py-1 rounded">+</button>
                  <button onClick={()=> removeProduct(item.id) }  className="bg-yellow-500 text-white px-3 py-1 rounded">-</button>
                  <button onClick={()=> deleteProduct(item.id) }  className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </div>



              </li>
            ))}
          </ul>

          <div className="mt-6 text-left text-3xl font-bold">

            totalPrice:${totalPrice.toFixed(2)}
            
             </div>

          
        </div>
      )}
    </div>
  );
};

export default Cart;
