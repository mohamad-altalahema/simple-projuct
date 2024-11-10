import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/api";
import { CartContext } from "./../context/cartContext";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = () => {
    addToCart(product);
  };
  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (err) {
        console.log("Error Fetching Product");
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, []);

  if (loading) return <p>Loading Product...</p>;
  if (!product) return <p>Product not found.</p>;
  return (
    <div className="p-6">
      <div className="bg-white shadow-lg rounded p-6">
        <h2>{product.title}</h2>
        <img src={product.thumbnail} alt="product" />
        <p className="text-lg">{product.description}</p>
        <p className="text-2xl font-bold mt-4">{product.price}</p>
        <button onClick={handleAddToCart} className="mt-4 bg-blue-600 text-white rounded px-4 py-2">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
