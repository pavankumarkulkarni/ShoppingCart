import React from "react";
import style from "./Address.module.css";

export default function Address({
  address,
  delAddress,
  editAddress,
  setFavAddress,
}) {
  return (
    <div className={address.fav === "true" ? style.favAddress : style.address}>
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
          setFavAddress(address._id);
        }}>
        <i class='far fa-heart'></i>
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
