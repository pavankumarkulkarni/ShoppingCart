import React from "react";

export default function Cart({ cartItems, removeFromCart }) {
  const itemsCount =
    cartItems.length === 0 ? 0 : cartItems.reduce((a, b) => a + b.count, 0);
  const totalPrice =
    cartItems.length === 0
      ? 0
      : cartItems.reduce((a, b) => a + b.price * b.count, 0);
  return (
    <div className="cart">
      <div className="cart-header">
        {cartItems.length === 0
          ? "Cart is empty"
          : `You have ${itemsCount} items in cart.`}
      </div>

      {cartItems.map((item) => {
        return (
          <div className="cart-card">
            <div>
              <img src={item.image} alt={item.title} />
            </div>
            <div>
              <p>{item.title}</p>
              <span>
                ${item.price} x {item.count}
              </span>
              <button onClick={(e) => removeFromCart(item)}>Remove</button>
            </div>
          </div>
        );
      })}
      {itemsCount > 0 ? (
        <div className="cart-total">
          <span>Total : ${totalPrice.toFixed(2)} </span>
          <button>Proceed</button>
        </div>
      ) : null}
    </div>
  );
}
