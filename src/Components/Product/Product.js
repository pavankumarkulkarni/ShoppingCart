import React from "react";
import style from "./Product.module.css";

export default function Product({ product, addToCart, openModal }) {
  return (
    <div className={style.product}>
      <img
        src={product.image}
        alt="{title}"
        onClick={(e) => openModal(product)}
      />
      <p>{product.title}</p>
      <div className={style.productprice}>
        <span>${product.price.toFixed(1)}</span>
        <button onClick={(e) => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}
