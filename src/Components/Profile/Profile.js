import React, { useState } from "react";
import Address from "../Address/Address";
import style from "./Profile.module.css";
import CustomerAddress from "../CustomerAddress/CustomerAddress";

export default function Profile({
  currentUser,
  deleteAddress,
  addAddress,
  editAddressMain,
  setFavAddress,
}) {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [edtAddress, setedtAddress] = useState(null);
  const sendAddress = (address) => {
    addAddress((address = { ...address, fav: "false" }), currentUser._id);
    setShowAddressForm(false);
  };
  const cancelAddressChange = () => {
    setShowAddressForm(false);
  };
  const editAddressinDB = (address) => {
    // console.log(address);
    setShowAddressForm(false);
    editAddressMain(currentUser._id, (address = { ...address }));
    setedtAddress(null);
  };
  const delAddress = (addId) => {
    deleteAddress(currentUser._id, addId);
  };

  const editAddress = (address) => {
    setedtAddress(address);

    setShowAddressForm(true);
  };

  const setFavAdd = (id) => {
    setFavAddress(currentUser._id, id);
  };
  const savedAddresses = currentUser.address ? (
    currentUser.address.map((address) => {
      return (
        <Address
          address={address}
          key={address._id}
          delAddress={delAddress}
          editAddress={editAddress}
          setFavAddress={setFavAdd}
          uspsCheck={"pass"}
        />
      );
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
      <header>
        <h5>John Doe </h5>
        <h5>John@Doe.com </h5>
      </header>
      <h4>
        Account Profile Setup: <span>Edit your account profile here.</span>{" "}
      </h4>

      <section>
        <h4>
          Address : <span>You can save up to 6 addresses.</span>
        </h4>
        <div className={style.addressSection}>
          {savedAddresses}
          {currentUser &&
          currentUser.address &&
          currentUser.address.length < 6 &&
          currentUser.address.length >= 0 ? (
            <div className={style.addAddress}>
              <button
                className='iconButton'
                onClick={(e) => setShowAddressForm(true)}>
                <i className='fas fa-plus-circle fa-2x'></i>
              </button>
              <p>Click to add new address</p>
            </div>
          ) : null}
        </div>
        {showAddressForm ? (
          <CustomerAddress
            addAddress={sendAddress}
            address={edtAddress}
            editAddress={editAddressinDB}
            cancelAddressChange={cancelAddressChange}
          />
        ) : null}
      </section>
    </div>
  );
}
