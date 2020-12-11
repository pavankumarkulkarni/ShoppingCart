import React from "react";
import style from "./CheckOut.module.css";
import CustomerDetails from "../CustomerDetails/CustomerDetails";

export default function CheckOut({ sendCustDetails, currentUser }) {
  return (
    <div className={style.checkout}>
      <CustomerDetails
        sendCustDetails={sendCustDetails}
        currentUser={currentUser}
      />
    </div>
  );
}
