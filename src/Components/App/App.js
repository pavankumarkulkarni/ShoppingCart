// Feature 1
import React, { Component } from "react";
import UserContext from "../Context/UserContext";
import Products from "../Products/Products";
import Filterbar from "../Filterbar/Filterbar";
import OrderDetails from "../OrderDetails/OrderDetails";
import AdminModal from "../AdminModal/AdminModal";
import AuthModal from "../AuthModal/AuthModal";
import Header from "../Header/Header";
import style from "./App.module.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "../Profile/Profile";
import AboutUs from "../AboutUs/AboutUs";
import CheckOut from "../CheckOut/CheckOut";

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
    loggedInUser: {},
  };

  getOrders = async () => {
    try {
      let o = await fetch("/api/orders");
      let d = await o.json();
      return d;
    } catch (err) {
      console.log(`Error in getting orders. ${err}`);
      return;
    }
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
  static contextType = UserContext;
  componentDidMount = async () => {
    const { setLoggedInUser } = this.context;
    let data = await this.getData();
    this.setState({ products: data });
    let authxtoken = sessionStorage.getItem("authxtoken");
    if (!authxtoken) {
      authxtoken = "";
    }
    try {
      const user = await fetch("/api/users/userByToken", {
        method: "POST",
        headers: {
          authxtoken: authxtoken,
        },
      });
      if (user.ok) {
        const userData = await user.json();
        setLoggedInUser({ userData });
        this.setState({ loggedInUser: userData });
      } else {
        setLoggedInUser("");
        this.setState({ loggedInUser: "" });
      }
    } catch (err) {
      setLoggedInUser({});
      this.setState({ loggedInUser: "" });
      console.log(`Error in getting user details. ${err}`);
    }
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
    const totalPrice =
      this.state.cartItems.length === 0
        ? 0
        : this.state.cartItems.reduce((a, b) => a + b.price * b.count, 0);
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
    sessionStorage.setItem("loggedInUser", JSON.stringify(state));
    this.setState({ login: state });
  };

  setLoggedInUser = (user) => {
    this.setState({ loggedInUser: user });
  };

  updateAddress = (newAddress) => {
    this.setState((prevstate) => ({
      loggedInUser: {
        ...prevstate.loggedInUser,
        address: newAddress,
      },
    }));
  };
  updateCard = (newCard) => {
    this.setState((prevstate) => ({
      loggedInUser: {
        ...prevstate.loggedInUser,
        card: newCard,
      },
    }));
  };

  render() {
    return (
      <Router>
        <UserContext.Provider
          value={{
            loggedInUser: this.state.loggedInUser,
            setLoggedInUser: this.setLoggedInUser,
          }}>
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
            {this.state.orderForm && (
              <OrderDetails
                order={this.state.order}
                closeModal={this.closeModal}
              />
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
            <div className={style.main}>
              <div className={style.maincontent}>
                <Switch>
                  <Route path='/' exact>
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
                  </Route>
                  <Route path='/profile'>
                    <Profile
                      updateAddress={this.updateAddress}
                      updateCard={this.updateCard}
                    />
                  </Route>
                  <Route path='/aboutus'>
                    <AboutUs />
                  </Route>
                  <Route path='/checkout'>
                    <CheckOut sendCustDetails={this.sendCustDetails} />
                  </Route>
                </Switch>
              </div>
            </div>
            <div className={style.footer}>All rights reserved &copy;</div>
          </div>
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;
