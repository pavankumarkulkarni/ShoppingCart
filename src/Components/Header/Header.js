import React from "react";
import style from "./Header.module.css";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

export default function Header({
  openAdminModal,
  openAuthModal,
  setLogin,
  login,
}) {
  const signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log("Google User logged out!");
      alert("Google User logged out!");
      setLogin(false);
    });
  };
  const title = <i className="fas fa-user-circle fa-2x"></i>;
  const account_items = [
    <button>Profile</button>,
    <button onClick={signOut}>Logout</button>,
  ];
  return (
    <div className={style.header}>
      <a href="/">Shopping Cart</a>
      <div className={style.icons}>
        {login ? (
          <button className={style.loginBtn}>
            <DropdownMenu
              title={title}
              items={account_items}
              signOut={signOut}
            />
          </button>
        ) : (
          <button className={style.loginBtn} onClick={openAuthModal}>
            <i className="fas fa-user-secret fa-2x"></i>
          </button>
        )}

        <button className={style.headerBtn} onClick={openAdminModal}>
          Admin
        </button>
      </div>
    </div>
  );
}
