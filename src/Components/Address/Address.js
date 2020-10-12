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
    const str =
      'https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=<AddressValidateRequest USERID="940SELFD5341">' +
      "<Address>" +
      "<Address1> </Address1>" +
      `<Address2>${address.street}</Address2>` +
      `<City>${address.city}</City>` +
      `<State>${address.state}</State>` +
      `<Zip5>${address.zip}</Zip5>` +
      "<Zip4></Zip4>" +
      "</Address>" +
      "</AddressValidateRequest>";

    fetch(str)
      .then((res) => res.text())
      .then((data) => {
        // console.log(data);
        let xmlDoc;

        const parser = new DOMParser();
        xmlDoc = parser.parseFromString(data, "text/xml");

        if (xmlDoc.getElementsByTagName("Description")[0]) {
          // console.log(
          //   xmlDoc.getElementsByTagName("Description")[0].childNodes[0]
          //     .nodeValue
          // );
          uspsCheck({ ...address, usps: "fail" });
          alert(
            "Address not found via USPS. Please edit the address and revalidate."
          );
        } else {
          // console.log("Address Validated");
          uspsCheck({ ...address, usps: "pass" });
          alert("Address was successfully validated via USPS !");
        }
      });
  };
  const uspsBtn = address.usps ? (
    address.usps === "pass" ? (
      <i className='fas fa-check'></i>
    ) : address.usps === "fail" ? (
      <i className='fas fa-exclamation'></i>
    ) : null
  ) : (
    <button className={style.checkBtn} onClick={(e) => uspsValidator(e)}>
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
