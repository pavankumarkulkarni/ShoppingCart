import React from "react";
import { WithModal } from "../HOC/Modal";

function Admin({ orderList }) {
  const orderlist = orderList.map((order) => {
    return (
      <tr>
        <td>{order._id}</td>
        <td>
          {order.name}
          {order.email}
          {order.address}
        </td>
        <td>
          <table>
            <tr>
              {order.cartItems.map((item) => {
                return (
                  <tr>
                    <td>{item._id}</td>
                    <td>{item.title}</td>
                    <td>
                      {item.count}x ${item.price}
                    </td>
                  </tr>
                );
              })}
            </tr>
          </table>
          <td>Total : ${order.totalPrice}</td>
        </td>
        <td>
          <button className="secondaryBtn">delete</button>
        </td>
      </tr>
    );
  });
  return (
    <>
      <h3 className="modal-headline">Order List</h3>
      <table className="orderListTable">
        <tr>{orderlist}</tr>
      </table>
    </>
  );
}

const AdminModal = WithModal(Admin);
export default AdminModal;
