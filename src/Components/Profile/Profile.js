import React, { useState, useContext } from "react";
import Address from "../Address/Address";
import Card from "../Card/Card";
import CustomerCard from "../CustomerCard/CustomerCard";
import style from "./Profile.module.css";
import CustomerAddress from "../CustomerAddress/CustomerAddress";
import UserContext from "../Context/UserContext";
import {
  addCard,
  editCardMain,
  setFavCard,
  deleteCard,
  addAddress,
  editAddressMain,
  setFavAddress,
  deleteAddress,
} from "../DBUtility/DBUtility";

export default function Profile({ updateAddress, updateCard }) {
  const { loggedInUser } = useContext(UserContext);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [edtAddress, setedtAddress] = useState(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [edtCard, setedtCard] = useState(null);
  const sendAddress = (address) => {
    addAddress(
      (address = { ...address, fav: "false", usps: null }),
      loggedInUser.id
    ).then((address) => updateAddress(address));
    setShowAddressForm(false);
  };
  const cancelAddressChange = () => {
    setShowAddressForm(false);
  };
  const editAddressinDB = (address) => {
    setShowAddressForm(false);
    editAddressMain(
      loggedInUser.id,
      (address = { ...address })
    ).then((address) => updateAddress(address));
    setedtAddress(null);
  };
  const delAddress = (addId) => {
    deleteAddress(loggedInUser.id, addId).then((address) =>
      updateAddress(address)
    );
  };

  const editAddress = (address) => {
    setedtAddress(address);
    setShowAddressForm(true);
  };

  const setFavAdd = (id) => {
    setFavAddress(loggedInUser.id, id).then((address) =>
      updateAddress(address)
    );
  };

  const uspsUpdate = (address) => {
    editAddressMain(loggedInUser.id, address).then((address) =>
      updateAddress(address)
    );
  };

  const sendCard = (card) => {
    addCard((card = { ...card, fav: "false" }), loggedInUser.id).then((card) =>
      updateCard(card)
    );
    setShowCardForm(false);
  };
  const cancelCardChange = () => {
    setShowCardForm(false);
  };
  const editCardinDB = (card) => {
    // console.log(address);
    setShowCardForm(false);
    editCardMain(loggedInUser.id, (card = { ...card })).then((card) =>
      updateCard(card)
    );
    setedtCard(null);
  };
  const delCard = (addId) => {
    deleteCard(loggedInUser.id, addId).then((card) => updateCard(card));
  };

  const editCard = (card) => {
    setedtCard(card);
    setShowCardForm(true);
  };

  const setFavCrd = (id) => {
    setFavCard(loggedInUser.id, id).then((card) => updateCard(card));
  };

  const savedAddresses =
    loggedInUser && loggedInUser.address ? (
      loggedInUser.address.map((address) => {
        return (
          <Address
            address={address}
            key={address._id}
            delAddress={delAddress}
            editAddress={editAddress}
            setFavAddress={setFavAdd}
            uspsCheck={uspsUpdate}
          />
        );
      })
    ) : (
      <div>
        <button
          className='iconButton'
          onClick={(e) => setShowAddressForm(true)}>
          <i className='fas fa-plus-circle fa-2x'></i>
        </button>
        <p>Add new address</p>
      </div>
    );

  const savedCards =
    loggedInUser && loggedInUser.card ? (
      loggedInUser.card.map((card) => {
        return (
          <Card
            card={card}
            key={card._id}
            delCard={delCard}
            editCard={editCard}
            setFavCard={setFavCrd}
          />
        );
      })
    ) : (
      <div>
        <button className='iconButton' onClick={(e) => setShowCardForm(true)}>
          <i className='fas fa-plus-circle fa-2x'></i>
        </button>
        <p>Add new Card</p>
      </div>
    );
  return (
    <div className={style.profile}>
      <header>
        <h5>{loggedInUser && loggedInUser.displayName} </h5>
        <h5>{loggedInUser && loggedInUser.email}</h5>
      </header>

      <main className={style.profileMain}>
        <div>
          <h4>
            Address : <span>Save up to 6 addresses.</span>
          </h4>
          <div className={style.addressSection}>
            {savedAddresses}
            {loggedInUser &&
            loggedInUser.address &&
            loggedInUser.address.length < 6 &&
            loggedInUser.address.length >= 0 ? (
              <div className={style.addAddress}>
                <button
                  className='iconButton'
                  onClick={(e) => setShowAddressForm(true)}>
                  <i className='fas fa-plus-circle fa-2x'></i>
                </button>
                <p>Add new address</p>
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
        </div>
        <div>
          <h4>
            Card : <span>Save up to 6 cards.</span>
          </h4>
          <div className={style.addressSection}>
            {savedCards}
            {loggedInUser &&
            loggedInUser.card &&
            loggedInUser.card.length < 6 &&
            loggedInUser.card.length >= 0 ? (
              <div className={style.addAddress}>
                <button
                  className='iconButton'
                  onClick={(e) => setShowCardForm(true)}>
                  <i className='fas fa-plus-circle fa-2x'></i>
                </button>
                <p>Add new card</p>
              </div>
            ) : null}
          </div>
          {showCardForm ? (
            <CustomerCard
              addCard={sendCard}
              card={edtCard}
              editCard={editCardinDB}
              cancelCardChange={cancelCardChange}
            />
          ) : null}
        </div>
      </main>
    </div>
  );
}
