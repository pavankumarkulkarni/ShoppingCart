import React, { useContext } from "react";
import style from "./Header.module.css";
import LoggedInUserDropdown from "../LoggedInUser/LoggedInUser";
import GuestUserDropdown from "../GuestUserDropdown/GuestUserDropdown";
import CartPopup from "../CartPopup/CartPopup";
import { withRouter } from "react-router";
import UserContext from "../Context/UserContext";

function Header({
  openAdminModal,
  openAuthModal,
  setLogin,
  login,
  setUser,
  cartItems,
  removeFromCart,
  sendCustDetails,
  history,
  setCurrentUser,
}) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      // console.log("Google User logged out!");
      alert("Google User logged out!");
      // setLogin(false);
      setLoggedInUser({});
      sessionStorage.setItem("authxtoken", "");
      history.push("/");
    });
  };
  const LoggedInIcon = <i className='fas fa-user-circle fa-2x'></i>;
  const guestIcon = <i className='fas fa-user-secret fa-2x'></i>;
  const cartIcon = <i className='fas fa-shopping-cart fa-2x'></i>;

  const regUserLogout = () => {
    alert("User logged out!");
    setLoggedInUser({});
    sessionStorage.setItem("authxtoken", "");
    history.push("/");
  };

  const cartSize =
    cartItems.length === 0 ? 0 : cartItems.reduce((a, b) => a + b.count, 0);

  return (
    <div className={style.header}>
      <a href='/'>Shopping Cart</a>
      <div className={style.icons}>
        {loggedInUser && loggedInUser.displayName ? (
          <div className={style.loginBtn}>
            <LoggedInUserDropdown
              signOut={signOut}
              title={LoggedInIcon}
              userType={loggedInUser.type}
              regUserLogout={regUserLogout}
            />
          </div>
        ) : (
          <div className={style.loginBtn}>
            {/* <i className='fas fa-user-secret fa-2x'></i> */}
            <GuestUserDropdown
              title={guestIcon}
              // setLogin={setLogin}
              // setUser={setUser}
              openAuthModal={openAuthModal}
              // setCurrentUser={setCurrentUser}
            />
          </div>
        )}
        <div className={style.cartarea}>
          <CartPopup
            title={cartIcon}
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            sendCustDetails={sendCustDetails}
          />

          <span
            className={style.cartTotal}
            style={{ display: cartSize === 0 ? "none" : "grid" }}>
            {cartSize}
          </span>
        </div>

        <button className={style.headerBtn} onClick={openAdminModal}>
          Admin
        </button>
        <a href='/aboutus' className={style.aboutus}>
          About Us
        </a>
      </div>
    </div>
  );
}

export default withRouter(Header);
