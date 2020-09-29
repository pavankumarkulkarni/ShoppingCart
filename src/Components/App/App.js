// Feature 1
import React, { Component } from "react";
import Products from "../Products/Products";
import Filterbar from "../Filterbar/Filterbar";
import Cart from "../Cart/Cart";
import OrderDetails from "../OrderDetails/OrderDetails";
import AdminModal from "../AdminModal/AdminModal";
import AuthModal from "../AuthModal/AuthModal";
import Header from "../Header/Header";
import style from "./App.module.css";

class App extends Component {
  state = {
    products: [], //data.products,
    size: "",
    sort: "latest",
    cartItems: sessionStorage.getItem("cartItems")
      ? JSON.parse(sessionStorage.getItem("cartItems"))
      : [],
    customer: {},
    totalPrice: 0,
    orderForm: false,
    order: {},
    adminModal: false,
    orderList: [],
    authModal: false,
    login: false,
    userEmail: "",
  };

  setUser = (email) => {
    this.setState({ userEmail: email });
  };
  getOrders = async () => {
    let o = await fetch("/api/orders");
    let d = await o.json();
    return d;
  };
  getData = async () => {
    try {
      let res = await fetch("/api/products");
      let data = await res.json();
      return data;
    } catch (error) {
      console.log(`Error in getting products data ${error}`);
      return;
    }
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

  sendCustDetails = (customer, totalPrice) => {
    this.setState(
      {
        customer: customer,
        totalPrice: totalPrice,
      },
      this.sendOrder
    );
  };

  prepareOrder = async () => {
    const order = {
      name: this.state.customer.name,
      email: this.state.customer.email,
      address: this.state.customer.address,
      totalPrice: this.state.totalPrice,
      cartItems: this.state.cartItems,
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    const data = await res.json();
    return data;
  };

  sendOrder = async () => {
    const order = await this.prepareOrder();
    if (order) {
      this.setState({ orderForm: true, order: order });
    }

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
  closeModal = () => {
    this.setState({ orderForm: false });
  };

  // fetch orderlist
  getOrderList = async () => {
    const orderListRes = await fetch("/api/orders");
    const orderList = await orderListRes.json();
    return orderList;
  };
  closeAdminModal = () => {
    this.setState({ adminModal: false });
  };

  openAdminModal = async () => {
    const orderList = await this.getOrderList();
    this.setState({ adminModal: true, orderList: orderList });
  };

  deleteOrder = async (id) => {
    fetch(`/api/orders/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        alert(`${id} Order deleted!`);
      })
      .catch((err) => {
        alert(`Error in deleting order ${err}`);
      });
    const orderList = await this.getOrderList();
    this.setState({ orderList: orderList });
    this.openAdminModal();
  };

  openAuthModal = () => {
    this.setState({ authModal: true });
  };

  closeAuthModal = () => {
    this.setState({ authModal: false });
  };

  setLogin = (state) => {
    this.setState({ login: state });
  };

  render() {
    return (
      <div className={style.gridlayout}>
        <Header
          openAdminModal={this.openAdminModal}
          openAuthModal={this.openAuthModal}
          setLogin={this.setLogin}
          login={this.state.login}
          setUser={this.setUser}
          cartItems={this.state.cartItems}
          removeFromCart={this.removeFromCart}
          sendCustDetails={this.sendCustDetails}
        />
        <div className={style.main}>
          <div className={style.maincontent}>
            <div className={style.filterbar}>
              <Filterbar
                count={this.state.products.length}
                sort={this.state.sort}
                size={this.state.size}
                filterBy={this.filterBy}
                sortBy={this.sortBy}
              />
            </div>
            <div className={style.products}>
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
          </div>
          {/* <div className={style.sidebar}>
            <Cart
              cartItems={this.state.cartItems}
              removeFromCart={this.removeFromCart}
              sendCustDetails={this.sendCustDetails}
            />
          </div> */}
        </div>
        {this.state.orderForm && (
          <OrderDetails order={this.state.order} closeModal={this.closeModal} />
        )}
        {this.state.adminModal && (
          <AdminModal
            closeModal={this.closeAdminModal}
            orderList={this.state.orderList}
            deleteOrder={this.deleteOrder}
          />
        )}
        {this.state.authModal && (
          <AuthModal
            closeModal={this.closeAuthModal}
            setLogin={this.setLogin}
            setUser={this.setUser}
          />
        )}

        <div className={style.footer}>All rights reserved &copy;</div>
      </div>
    );
  }
}

export default App;
