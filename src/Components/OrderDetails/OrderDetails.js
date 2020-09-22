import React from "react";
import { WithModal } from "../HOC/Modal";

function Details(props) {
  const items = props.order.cartItems.map((item) => {
    return (
      <tr key={item._id}>
        <td>{item.title}</td>
        <td align="right">
          {item.count} x ${item.price}
        </td>
      </tr>
    );
  });
  return (
    <div className="orderModal">
      <h3 className="modal-headline">Order Details</h3>
      <h4>Order ID: {props.order._id}</h4>
      <h4 className="subsection">Customer</h4>
      <p>Name: {props.order.name}</p>
      <p>Email: {props.order.email}</p>
      <p>Address: {props.order.address}</p>
      <h4 className="subsection">Order</h4>
      <table>
        <tbody>
          {items}
          <tr>
            <td></td>
            <td align="right">
              <strong>Total price: ${props.order.totalPrice}</strong>{" "}
            </td>
          </tr>
        </tbody>
      </table>

      <button onClick={props.closeModal}>Close</button>
    </div>
  );
}

const OrderDetailsWithModal = WithModal(Details);
export default OrderDetailsWithModal;
