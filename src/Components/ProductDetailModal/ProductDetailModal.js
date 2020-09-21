import React from "react";
import { WithModal } from "../HOC/Modal";

function ProductDetail({ product, closeModal, addToCart }) {
  return (
    <>
      <div className="modal-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="modal-desc">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <div className="modalSizes">
          {product.availableSizes.map((size) => (
            <button className="BtnSize" key={size}>
              {size}
            </button>
          ))}
        </div>
        <div className="modalPrice">
          <span>${product.price}</span>
          <button onClick={(e) => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </>
  );
}

const ProductDetailWithModal = WithModal(ProductDetail);
export default ProductDetailWithModal;
