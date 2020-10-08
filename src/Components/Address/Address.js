import React from "react";
import style from "./Address.module.css";

export default function Address({ address, delAddress, editAddress }) {
  return (
    <div className={style.address}>
      <h5>Name : {address.addressName}</h5>
      <p>{address.street}</p>
      <p>{address.city}</p>
      <p>{address.state}</p>
      <p>zip : {address.zip}</p>
      <button
        className='iconButton'
        onClick={(e) => {
          editAddress(address);
        }}>
        <i>
          <i className='fas fa-edit'></i>
        </i>
      </button>
      <button
        className='iconButton'
        onClick={(e) => {
          delAddress(address._id);
        }}>
        <i className='fas fa-trash-alt'></i>
      </button>
    </div>
  );
}
