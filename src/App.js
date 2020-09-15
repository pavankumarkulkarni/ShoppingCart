// Feature 1
import React, { Component } from "react";
import data from "./Components/data/data";
import Products from "./Components/Products/Products";

class App extends Component {
  state = {
    products: data.products,
  };
  render() {
    return (
      <div className="grid-layout">
        <div className="header">
          <a href="/">Shopping Cart</a>
        </div>
        <div className="main">
          <div className="products">
            <Products products={this.state.products} />
          </div>
          <div className="side-bar">sidebar</div>
        </div>
        <div className="footer">All rights reserved &copy;</div>
      </div>
    );
  }
}

export default App;
