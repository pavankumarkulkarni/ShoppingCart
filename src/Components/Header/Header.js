import React from "react";
import style from "./Header.module.css";
// import DropdownMenu from "../HOC/DropdownMenu";
import LoggedInUserDropdown from "../LoggedInUser/LoggedInUser";
import GuestUserDropdown from "../GuestUserDropdown/GuestUserDropdown";
import CartPopup from "../CartPopup/CartPopup";

export default function Header({
  openAdminModal,
  openAuthModal,
  setLogin,
  login,
  setUser,
  cartItems,
  removeFromCart,
  sendCustDetails,
}) {
  const signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      // console.log("Google User logged out!");
      alert("Google User logged out!");
      setLogin(false);
    });
  };
  const LoggedInIcon = <i className="fas fa-user-circle fa-2x"></i>;
  const guestIcon = <i className="fas fa-user-secret fa-2x"></i>;
  const cartIcon = <i className="fas fa-shopping-cart fa-2x"></i>;

  const cartSize =
    cartItems.length === 0 ? 0 : cartItems.reduce((a, b) => a + b.count, 0);

  return (
    <div className={style.header}>
      <a href="/">Shopping Cart</a>
      <div className={style.icons}>
        {login ? (
          <div className={style.loginBtn}>
            <LoggedInUserDropdown signOut={signOut} title={LoggedInIcon} />
          </div>
        ) : (
          <div className={style.loginBtn}>
            {/* <i className="fas fa-user-secret fa-2x"></i> */}
            <GuestUserDropdown
              title={guestIcon}
              setLogin={setLogin}
              setUser={setUser}
              openAuthModal={openAuthModal}
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
            style={{ display: cartSize === 0 ? "none" : "grid" }}
          >
            {cartSize}
          </span>
        </div>

        <button className={style.headerBtn} onClick={openAdminModal}>
          Admin
        </button>
      </div>
    </div>
  );
}
