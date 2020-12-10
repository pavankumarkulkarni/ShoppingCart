import React, { Component } from "react";
import CustomerDetails from "../CustomerDetails/CustomerDetails";
import style from "./Cart.module.css";
import { Link } from "react-router-dom";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    };
  }

  itemsCount = () => {
    return this.props.cartItems.length === 0
      ? 0
      : this.props.cartItems.reduce((a, b) => a + b.count, 0);
  };

  totalPrice = () => {
    return this.props.cartItems.length === 0
      ? 0
      : this.props.cartItems.reduce((a, b) => a + b.price * b.count, 0);
  };

  handleRemoveItems = (item) => {
    if (this.props.cartItems.length === 1) {
      this.setState({ showForm: false });
    }
    this.props.removeFromCart(item);
  };

  handleCustDetails = (customer) => {
    this.setState({ showForm: false });
    this.props.sendCustDetails(customer, this.totalPrice().toFixed(2));
  };
  render() {
    return (
      <div className={style.cart}>
        <div className={style.cartheader}>
          {this.props.cartItems.length === 0
            ? "Cart is empty"
            : `You have ${this.itemsCount()} items in cart.`}
        </div>
        {this.props.cartItems.map((item) => {
          return (
            <div className={style.cartcard} key={item._id}>
              <div>
                <img src={item.image} alt={item.title} />
              </div>
              <div>
                <p>{item.title}</p>
                <span>
                  ${item.price} x {item.count}
                </span>
                <button
                  className={style.secondaryBtn}
                  onClick={(e) => this.handleRemoveItems(item)}>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
        {this.itemsCount() > 0 ? (
          <div className={style.carttotal}>
            <span>Total : ${this.totalPrice().toFixed(2)} </span>
            {/* <button onClick={(e) => this.setState({ showForm: true })}>
              Proceed
            </button> */}
            <button>
              <Link to='/checkout'>PROCEED</Link>
            </button>
          </div>
        ) : null}
        {this.state.showForm && this.itemsCount() > 0 && (
          <CustomerDetails sendCustDetails={this.handleCustDetails} />
        )}
      </div>
    );
  }
}
