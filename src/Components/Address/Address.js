import React from "react";
import style from "./Address.module.css";

export default function Address({
  address,
  delAddress,
  editAddress,
  setFavAddress,
  uspsCheck,
}) {
  const uspsBtn = uspsCheck ? (
    uspsCheck === "pass" ? (
      <i className='fas fa-check'></i>
    ) : uspsCheck === "fail" ? (
      <i class='fas fa-exclamation'></i>
    ) : null
  ) : (
    <button className={style.checkBtn}>USPS</button>
  );
  return (
    <div className={address.fav === "true" ? style.favAddress : style.address}>
      <h5>Name : {address.addressName}</h5>
      <p>{address.street}</p>
      <p>{address.city}</p>
      <p>{address.state}</p>
      <p>zip : {address.zip}</p>
      <div className={style.icons}>
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
          {address.fav === "true" ? (
            <i className='fas fa-heart'></i>
          ) : (
            <i className='far fa-heart'></i>
          )}
        </button>
        <button
          className='iconButton'
          onClick={(e) => {
            delAddress(address._id);
          }}>
          <i className='fas fa-trash-alt'></i>
        </button>
      </div>
      <div className={style.usps}>
        {uspsCheck ? (
          <span>USPS verification - </span>
        ) : (
          <span>Verify address - </span>
        )}
        {uspsBtn}
      </div>
    </div>
  );
}
