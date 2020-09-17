import React, { Component } from "react";

export default class CustomerDetails extends Component {
  state = {
    name: "",
    email: "",
    address: "",
  };
  orderSubmit = (e) => {
    e.preventDefault();
    let customer = this.state;
    this.setState({ name: "", email: "", address: "" });
    this.props.sendCustDetails(customer);
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <form className="customer-details" onSubmit={this.orderSubmit}>
        <p>Customer Details</p>
        <label htmlFor="name"> Name : </label>
        <p className="label-hint">John Doe</p>
        <input
          type="text"
          name="name"
          required
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label htmlFor="name"> email : </label>
        <p className="label-hint">John.Doe@gmail.com</p>
        <input
          type="email"
          name="email"
          required
          value={this.state.email}
          onChange={this.handleChange}
        />
        <label htmlFor="name"> Address : </label>
        <p className="label-hint">123 main st some city my state 12345</p>
        <input
          type="text"
          name="address"
          required
          value={this.state.address}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
