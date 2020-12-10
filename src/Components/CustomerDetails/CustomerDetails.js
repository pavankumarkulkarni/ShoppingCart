import React, { Component } from "react";
import style from "./CustomerDetails.module.css";
import { withRouter } from "react-router-dom";

class CustomerDetails extends Component {
  state = {
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
      phone: "",
      card: "",
      expiry: "",
      cvv: "",
    });
    this.props.sendCustDetails(customer);
    this.props.history.push("/");
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <form className={style.customerdetails} onSubmit={this.orderSubmit}>
        <p>Customer Details</p>
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
        <label htmlFor='name'> Address : </label>
        <p className={style.labelhint}>123 main st some city my state 12345</p>
        <input
          type='text'
          name='address'
          required
          value={this.state.address}
          onChange={this.handleChange}
        />
        <label htmlFor='name'> Phone : </label>
        <p className={style.labelhint}>1234567890</p>
        <input
          type='number'
          name='phone'
          required
          value={this.state.phone}
          onChange={this.handleChange}
        />
        {/* <hr /> */}
        <p>Card Details</p>
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
