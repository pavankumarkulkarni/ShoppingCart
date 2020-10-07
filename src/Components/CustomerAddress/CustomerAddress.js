import React, { useState } from "react";
import style from "./CustomerAddress.module.css";

export default function CustomerAddress({ addAddress }) {
  const [input, setInput] = useState({});
  const sendAddress = (e) => {
    e.preventDefault();
    addAddress(input);
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
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
          name='addressname'
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor='street'>Street :</label>
        <input type='text' name='street' onChange={handleChange} required />
        <label htmlFor='city'>City : </label>
        <input type='text' name='city' onChange={handleChange} required />
        <label htmlFor='state'>State :</label>
        <input type='state' name='' onChange={handleChange} required />
        <label htmlFor='zip'>Zip :</label>
        <input type='number' name='zip' onChange={handleChange} required />
        <button>Add Address</button>
      </form>
    </div>
  );
}
