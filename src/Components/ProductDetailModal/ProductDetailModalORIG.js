import React from "react";

export default function ProductDetailModal({ product, closeModal, addToCart }) {
  const handleClick = (e) => {
    if (e.target.className === "overlay") {
      closeModal();
    }
  };
  return (
    <div className="overlay" onClick={handleClick}>
      <div className="productModal">
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
        <button className="btnClose" onClick={closeModal}>
          X
        </button>
      </div>
    </div>
  );
}
