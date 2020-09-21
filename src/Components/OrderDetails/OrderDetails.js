import React from "react";
import { WithModal } from "../HOC/Modal";

function Details(props) {
  const items = props.order.cartItems.map((item) => {
    return (
      <ul key={item._id}>
        <li> Dress: {item.title}</li>
        <li>
          {" "}
          {item.count} x {item.price}
        </li>
      </ul>
    );
  });
  return (
    <div>
      <h4>Order ID: {props.order._id}</h4>
      <p>Name: {props.order.name}</p>
      <p>Email: {props.order.email}</p>
      <p>Address: {props.order.address}</p>
      {items}
      <h4>Total price: ${props.order.totalPrice}</h4>
      <button>Close</button>
    </div>
  );
}

const OrderDetailsWithModal = WithModal(Details);
export default OrderDetailsWithModal;
