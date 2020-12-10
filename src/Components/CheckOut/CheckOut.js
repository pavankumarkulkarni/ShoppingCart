import React from "react";
import style from "./CheckOut.module.css";
import CustomerDetails from "../CustomerDetails/CustomerDetails";

export default function CheckOut({ sendCustDetails }) {
  return (
    <div className={style.checkout}>
      <CustomerDetails sendCustDetails={sendCustDetails} />
    </div>
  );
}
