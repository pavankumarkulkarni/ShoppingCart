import React, { useState } from "react";
import Address from "../Address/Address";
import style from "./Profile.module.css";
import CustomerAddress from "../CustomerAddress/CustomerAddress";

export default function Profile({ currentUser }) {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const addAddress = (address) => {
    console.log(address);
    setShowAddressForm(false);
  };

  const savedAddresses = currentUser.address ? (
    currentUser.address.map((address) => {
      return <Address address={address} key={address._id} />;
    })
  ) : (
    <div>
      <button className='iconButton' onClick={(e) => setShowAddressForm(true)}>
        <i className='fas fa-plus-circle fa-2x'></i>
      </button>
      <p>Click to add new address</p>
    </div>
  );
  return (
    <div className={style.profile}>
      <h4>Account Profile Setup</h4>
      <p>You can edit and save your account profiles here. </p>
      <h5>Name: John Doe </h5>
      <h5>Email: John@Doe.com </h5>
      <section>
        <h4>Address :</h4>
        <p>You can save up to 6 addresses.</p>
        <div className={style.addressSection}>
          {savedAddresses}
          {currentUser &&
          currentUser.address.length < 6 &&
          currentUser.address.length > 0 ? (
            <div>
              <button
                className='iconButton'
                onClick={(e) => setShowAddressForm(true)}>
                <i className='fas fa-plus-circle fa-2x'></i>
              </button>
              <p>Click to add new address</p>
            </div>
          ) : null}
        </div>
        {showAddressForm ? <CustomerAddress addAddress={addAddress} /> : null}
      </section>
    </div>
  );
}
