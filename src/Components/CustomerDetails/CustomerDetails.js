import React from "react";

export default function CustomerDetails() {
  const orderSubmit = (e) => {
    console.log("order submitted");
  };
  return (
    <form className="customer-details" onSubmit={orderSubmit}>
      <p>Customer Details</p>
      <label htmlFor="name"> Name : </label>
      <input type="text" name="name" required placeholder="John Doe" />
      <label htmlFor="name"> email : </label>
      <input
        type="email"
        name="email"
        required
        placeholder=" jonh.doe@gmail.com"
      />
      <label htmlFor="name"> Address : </label>
      <input
        type="text"
        name="address"
        required
        placeholder=" 123 main st some city my state 12345"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
