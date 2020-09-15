import React from "react";

export default function Product({ image, title, price, id }) {
  return (
    <div className="product">
      <img src={image} alt="{title}" />
      <p>{title}</p>
      <div className="product-price">
        <span>${price.toFixed(1)}</span>
        <button>Add to Cart</button>
      </div>
    </div>
  );
}
