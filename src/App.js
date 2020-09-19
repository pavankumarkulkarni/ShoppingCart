// Feature 1
import React, { Component } from "react";
// import data from "./Components/data/data";
import Products from "./Components/Products/Products";
import Filterbar from "./Components/Filterbar/Filterbar";
import Cart from "./Components/Cart/Cart";

class App extends Component {
  state = {
    products: [], //data.products,
    size: "",
    sort: "latest",
    cartItems: sessionStorage.getItem("cartItems")
      ? JSON.parse(sessionStorage.getItem("cartItems"))
      : [],
    customer: {},
  };

  getData = async () => {
    let res = await fetch("/api/products");
    let data = await res.json();

    return data;
  };
  componentDidMount = async () => {
    let data = await this.getData();

    this.setState({ products: data });
  };

  filterBy = (event) => {
    // Get value from UI and filter
    const size = event.target.value;
    this.setState({ size: size }, this.filterProducts);
  };

  filterProducts = async () => {
    let tempProducts = await this.getData();
    if (tempProducts) {
      let filteredProducts;
      const size = this.state.size;
      if (size !== "") {
        filteredProducts = tempProducts.filter(
          (product) => product.availableSizes.indexOf(size) > -1
        );
      } else {
        filteredProducts = tempProducts;
      }

      // Sort based on state value
      const sort = this.state.sort;
      if (sort === "latest") {
        filteredProducts.sort((a, b) => {
          return a._id < b._id ? 1 : -1;
        });
      } else if (sort === "highest") {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else if (sort === "lowest") {
        filteredProducts.sort((a, b) => a.price - b.price);
      }

      this.setState({
        size: size,
        products: filteredProducts,
      });
    }
  };

  sortBy = (event) => {
    const sort = event.target.value;
    this.setState({ sort: sort }, this.filterProducts);
  };

  addToCart = (product) => {
    let cartItems = this.state.cartItems.slice();
    let inCart = false;
    cartItems.forEach((item, index) => {
      if (item._id === product._id) {
        cartItems[index].count = item.count + 1;
        inCart = true;
      }
    });
    if (!inCart) {
      cartItems.push({ ...product, count: 1 });
    }
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    this.setState({ cartItems: cartItems });
  };

  removeFromCart = (product) => {
    let cartItems = this.state.cartItems.slice();
    const updatedCartItems = cartItems.filter(
      (item) => item._id !== product._id
    );
    this.setState({
      cartItems: updatedCartItems,
    });
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  sendCustDetails = (customer) => {
    this.setState(
      {
        customer: customer,
      },
      this.sendOrder
    );
  };

  sendOrder = async () => {
    alert(`Order submitted for ${this.state.customer.name}`);
    let data = await this.getData();
    if (data) {
      this.setState({
        products: data,
        size: "",
        sort: "latest",
        cartItems: [],
        customer: {},
      });
    }
  };
  render() {
    return (
      <div className="grid-layout">
        <div className="header">
          <a href="/">Shopping Cart</a>
        </div>
        <div className="main">
          <div className="main-content">
            <div className="filter-bar">
              <Filterbar
                count={this.state.products.length}
                sort={this.state.sort}
                size={this.state.size}
                filterBy={this.filterBy}
                sortBy={this.sortBy}
              />
            </div>
            <div className="products">
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
          </div>
          <div className="side-bar">
            <Cart
              cartItems={this.state.cartItems}
              removeFromCart={this.removeFromCart}
              sendCustDetails={this.sendCustDetails}
            />
          </div>
        </div>

        <div className="footer">All rights reserved &copy;</div>
      </div>
    );
  }
}

export default App;
