import React from "react";
import style from "./Address.module.css";
import {} from "dotenv/config";

export default function Address({
  address,
  delAddress,
  editAddress,
  setFavAddress,
  uspsCheck,
}) {
  const uspsValidator = (e) => {
    e.preventDefault();
    fetch("/api/address/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          uspsCheck({ ...address, usps: "fail" });
          alert(data.error);
        } else {
          uspsCheck({ ...address, usps: "pass" });
          alert("Address was successfully validated via USPS !");
        }
      });
  };
  const uspsBtn = address.usps ? (
    address.usps === "pass" ? (
      <button
        className={`iconButton ${style.tooltip} ${style.tooltipTop}`}
        data-tooltiptext='Verified via United states postal.'>
        <i className='fas fa-check'></i>
      </button>
    ) : address.usps === "fail" ? (
      <button
        className={`iconButton ${style.tooltip} ${style.tooltipTop}`}
        data-tooltiptext='Address not found in USPS database. Edit and reverify'>
        <i className='fas fa-exclamation'></i>
      </button>
    ) : null
  ) : (
    <button
      className={`${style.checkBtn} ${style.tooltip} ${style.tooltipTop}`}
      data-tooltiptext='Check the accuracy of address via USPS'
      onClick={(e) => uspsValidator(e)}>
      {" "}
      via USPS
    </button>
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
          className={`iconButton ${style.tooltip} ${style.tooltipRight}`}
          data-tooltiptext='Click to edit the address.'
          onClick={(e) => {
            editAddress(address);
          }}>
          <i>
            <i className='fas fa-edit'></i>
          </i>
        </button>

        <button
          className={`iconButton ${style.tooltip} ${style.tooltipTop}`}
          data-tooltiptext='Click to save as favorite address.'
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
          className={`iconButton ${style.tooltip} ${style.tooltipLeft}`}
          data-tooltiptext='Click to delete the address.'
          onClick={(e) => {
            delAddress(address._id);
          }}>
          <i className='fas fa-trash-alt'></i>
        </button>
      </div>
      <div className={style.usps}>
        {address.usps ? (
          <span>USPS verification - </span>
        ) : (
          <span>Verify address - </span>
        )}
        {uspsBtn}
      </div>
    </div>
  );
}
