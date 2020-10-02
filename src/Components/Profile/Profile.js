import React from "react";
import CustomerDetails from "../CustomerDetails/CustomerDetails";
import style from "./Profile.module.css";

export default function Profile() {
  const sendCustDetails = (customer) => {
    console.log(customer);
  };
  return (
    <div className={style.profile}>
      <h4>Account Profile Setup</h4>
      <CustomerDetails sendCustDetails={sendCustDetails} />
    </div>
  );
}
