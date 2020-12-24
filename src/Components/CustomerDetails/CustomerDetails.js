import React, { Component } from "react";
import style from "./CustomerDetails.module.css";
import { withRouter } from "react-router-dom";

class CustomerDetails extends Component {
  card =
    this.props.currentUser !== ""
      ? this.props.currentUser.card.filter((card) => card.fav === "true")[0]
      : null;
  address =
    this.props.currentUser &&
    this.props.currentUser.address.filter(
      (address) => address.fav === "true"
    )[0];

  state = this.props.currentUser
    ? {
        name: this.props.currentUser.name,
        email: this.props.currentUser.email,
        address: `${this.address.street} ${this.address.city} ${this.address.state} ${this.address.zip} `,
        card: this.card && this.card.number,
        expiry: this.card && this.card.expiry,
        cvv: this.card && this.card.CVV,
      }
    : {
        name: "",
        email: "",
        address: "",
        phone: "",
        card: "",
        expiry: "",
        cvv: "",
      };
  orderSubmit = (e) => {
    e.preventDefault();
    let customer = this.state;
    this.setState({
      name: "",
      email: "",
      address: "",
      // phone: "",
      card: "",
      expiry: "",
      cvv: "",
    });
    sessionStorage.setItem("cartItems", "");
    this.props.sendCustDetails(customer);
    this.props.history.push("/");
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateAddress = (e) => {
    const addresses = this.props.currentUser.address;
    const chosenAddress = addresses.filter(
      (address) => address._id === e.target.value
    );
    const { street, city, state, zip } = chosenAddress[0];
    this.setState({
      address: `${street} ${city} ${state} ${zip}`,
    });
  };
  retrieveSavedAddresses = this.props.currentUser ? (
    <>
      <label htmlFor='addressDropdown'>Ship to saved address ... </label>
      <select
        onChange={this.updateAddress}
        name='addressDropdown'
        className={style.select}>
        {this.props.currentUser.address ? (
          this.props.currentUser.address.map((address) => (
            <option
              selected={address.fav === "true" ? true : false}
              value={address._id}
              key={address._id}>
              {" "}
              {address.addressName}
              {address.fav === "true" ? " (favorite)" : null}
              {address.usps === "pass" ? " (Verified)" : null}
            </option>
          ))
        ) : (
          <option>Save address on profile page for easy retrieval </option>
        )}
      </select>
    </>
  ) : null;

  updateCard = (e) => {
    const cards = this.props.currentUser.card;
    const chosenCard = cards.filter((card) => card._id === e.target.value);
    const { number, expiry, CVV } = chosenCard[0];
    this.setState({
      card: number,
      expiry: expiry,
      cvv: CVV,
    });
  };
  retrieveSavedCards = this.props.currentUser ? (
    <>
      <label htmlFor='cardDropdown'>Charge saved card ... </label>
      <select
        name='cardDropdown'
        onChange={this.updateCard}
        className={style.select}>
        {this.props.currentUser.card ? (
          this.props.currentUser.card.map((card) => (
            <option
              selected={card.fav === "true" ? true : false}
              value={card._id}
              key={card._id}>
              {" "}
              {card.cardName}
              {card.fav === "true" ? " (favorite)" : null}
            </option>
          ))
        ) : (
          <option>"Save card details on Profile ..."</option>
        )}
      </select>
    </>
  ) : null;

  render() {
    return (
      <form className={style.customerdetails} onSubmit={this.orderSubmit}>
        <h3>Checkout Form </h3>
        {this.props.currentUser ? (
          <div className={style.flexDisplay}>
            <p>Name : {this.props.currentUser.name}</p>
            <p>eMail : {this.props.currentUser.email}</p>
          </div>
        ) : (
          <>
            <label htmlFor='name'> Name : </label>
            <p className={style.labelhint}>John Doe</p>
            <input
              type='text'
              name='name'
              required
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label htmlFor='name'> email : </label>
            <p className={style.labelhint}>John.Doe@gmail.com</p>
            <input
              type='email'
              name='email'
              required
              value={this.state.email}
              onChange={this.handleChange}
            />
          </>
        )}

        {this.retrieveSavedAddresses}
        <label htmlFor='name'> Address : </label>
        <p className={style.labelhint}>123 main st some city my state 12345</p>
        <input
          type='text'
          name='address'
          required
          value={this.state.address}
          onChange={this.handleChange}
        />

        {this.retrieveSavedCards}
        <label htmlFor='name'> Card : </label>
        <p className={style.labelhint}>1234 1234 1234 1234</p>
        <input
          type='number'
          name='card'
          required
          value={this.state.card}
          onChange={this.handleChange}
        />
        <label htmlFor='name'> Expiry (mmyy): </label>
        <p className={style.labelhint}>0922</p>
        <input
          type='number'
          name='expiry'
          required
          value={this.state.expiry}
          onChange={this.handleChange}
        />
        <label htmlFor='name'> CVV: </label>
        <p className={style.labelhint}>123</p>
        <input
          type='number'
          name='cvv'
          required
          value={this.state.cvv}
          onChange={this.handleChange}
        />
        <label htmlFor='shipping'> Preferred shipping</label>
        <select name='shipping'>
          <option value='Priority shipping' checked>
            Priority Shipping
          </option>
          <option value='Normal shipping'>Normal Shipping</option>
        </select>
        <button type='submit'>Submit</button>
      </form>
    );
  }
}

export default withRouter(CustomerDetails);
