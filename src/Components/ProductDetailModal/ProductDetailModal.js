import React from "react";
import { WithModal } from "../HOC/Modal";
import style from "./ProductDetailModal.module.css";

function ProductDetail({ product, closeModal, addToCart }) {
  return (
    <div className={style.productModal}>
      <div className={style.modalimage}>
        <img src={product.image} alt={product.title} />
      </div>
      <div className={style.modaldesc}>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <div className="modalSizes">
          {product.availableSizes.map((size) => (
            <button className={style.BtnSize} key={size}>
              {size}
            </button>
          ))}
        </div>
        <div className={style.modalPrice}>
          <span>${product.price}</span>
          <button onClick={(e) => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

const ProductDetailWithModal = WithModal(ProductDetail);
export default ProductDetailWithModal;
