import React from "react";
import { WithModal } from "../HOC/Modal";
import style from "./AdminModal.module.css";

function Admin({ orderList, deleteOrder }) {
  const orderlist = orderList.map((order) => {
    return (
      <tr key={order._id}>
        <td valign="top">{order._id}</td>
        <td valign="top">
          {order.name}
          {order.email}
          {order.address}
        </td>
        <td style={{ padding: "0" }}>
          <table align="right">
            <tbody>
              {order.cartItems.map((item) => {
                return (
                  <tr key={item._id}>
                    <td valign="top">{item._id}</td>
                    <td valign="top">{item.title}</td>
                    <td align="right" valign="top">
                      {item.count}x ${item.price}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td></td>
                <td></td>
                <td align="right" valign="top">
                  <strong>Total : ${order.totalPrice}</strong>{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
        <td valign="bottom">
          <button
            className={style.secondaryBtn}
            onClick={(e) => deleteOrder(order._id)}
          >
            delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div className={style.orderList}>
      <h3 className={style.modalheadline}>Order List</h3>

      <table className={style.orderListTable}>
        <caption>
          Order List table order id, customer details, order details and option
          to delete order.
        </caption>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Order</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{orderlist}</tbody>
      </table>
    </div>
  );
}

const AdminModal = WithModal(Admin);
export default AdminModal;
