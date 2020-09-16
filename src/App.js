// Feature 1
import React, { Component } from "react";
import data from "./Components/data/data";
import Products from "./Components/Products/Products";
import Filterbar from "./Components/Filterbar/Filterbar";

class App extends Component {
  state = {
    products: data.products,
    size: "",
    sort: "latest",
  };
  filterBy = (event) => {
    // Get value from UI and filter
    const size = event.target.value;
    this.setState({ size: size }, this.filterProducts);
    // this.filterProducts(size);
  };

  filterProducts = () => {
    let tempProducts = data.products.slice();
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
  };

  sortBy = (event) => {
    const sort = event.target.value;
    this.setState({ sort: sort }, this.filterProducts);
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
              <Products products={this.state.products} />
            </div>
          </div>
          <div className="side-bar">sidebar</div>
        </div>

        <div className="footer">All rights reserved &copy;</div>
      </div>
    );
  }
}

export default App;
