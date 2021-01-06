import React, { useState } from "react";
import style from "./CustomerAddress.module.css";

export default function CustomerAddress({
  addAddress,
  address,
  editAddress,
  cancelAddressChange,
}) {
  const [input, setInput] = useState(
    address || {
      addressName: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      fav: "false",
      usps: "",
    }
  );
  const sendAddress = (e) => {
    e.preventDefault();
    address ? editAddress(input) : addAddress(input);
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      usps: "",
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    cancelAddressChange();
  };
  const btnText = address ? "Edit Address" : "Add Address";
  return (
    <div>
      {/* <h4>CustomerAddress</h4> */}
      <form
        className={style.form}
        onSubmit={(e) => {
          sendAddress(e);
        }}>
        <label htmlFor='addressName'>Address name :</label>
        <input
          type='text'
          name='addressName'
          onChange={(e) => handleChange(e)}
          required
          value={input ? input.addressName : ""}
        />
        <label htmlFor='street'>Street :</label>
        <input
          type='text'
          name='street'
          onChange={(e) => handleChange(e)}
          required
          value={input ? input.street : ""}
        />
        <label htmlFor='city'>City : </label>
        <input
          type='text'
          name='city'
          onChange={(e) => handleChange(e)}
          required
          value={input ? input.city : ""}
        />
        <label htmlFor='state'>State :</label>
        <input
          type='text'
          name='state'
          onChange={(e) => handleChange(e)}
          required
          value={input ? input.state : ""}
        />
        <label htmlFor='zip'>Zip :</label>
        <input
          pattern='[0-9]{5}'
          title='zip should be 5 digit'
          name='zip'
          onChange={(e) => handleChange(e)}
          required
          value={input ? input.zip : ""}
        />
        <div className={style.btns}>
          <button type='submit'>{btnText}</button>
          <button
            type='button'
            onClick={(e) => handleCancel(e)}
            className={style.cancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
