import React from "react";

export default function Product({ product, addToCart }) {
  return (
    <div className="product">
      <img src={product.image} alt="{title}" />
      <p>{product.title}</p>
      <div className="product-price">
        <span>${product.price.toFixed(1)}</span>
        <button onClick={(e) => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}
