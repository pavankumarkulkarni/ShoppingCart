import React, { useState } from "react";
import style from "./CustomerAddress.module.css";

export default function CustomerAddress({
  addAddress,
  address = null,
  editAddress,
}) {
  const [input, setInput] = useState(address);
  const sendAddress = (e) => {
    e.preventDefault();
    address ? editAddress(input) : addAddress(input);
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const btnText = address ? "Edit Address" : "Add Address";
  return (
    <div>
      <h4>CustomerAddress</h4>
      <form
        className={style.form}
        onSubmit={(e) => {
          sendAddress(e);
        }}>
        <label htmlFor='name'>Address name :</label>
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
          onChange={handleChange}
          required
          value={input ? input.street : ""}
        />
        <label htmlFor='city'>City : </label>
        <input
          type='text'
          name='city'
          onChange={handleChange}
          required
          value={input ? input.city : ""}
        />
        <label htmlFor='state'>State :</label>
        <input
          type='text'
          name='state'
          onChange={handleChange}
          required
          value={input ? input.state : ""}
        />
        <label htmlFor='zip'>Zip :</label>
        <input
          type='number'
          name='zip'
          onChange={handleChange}
          required
          value={input ? input.zip : ""}
        />
        <button>{btnText}</button>
      </form>
    </div>
  );
}
