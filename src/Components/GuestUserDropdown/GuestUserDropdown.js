import React from "react";
import GoogleSignin from "../GoogleSignin/GoogleSignin";
import DropdownMenu from "../HOC/DropdownMenu";

function GuestUser(props) {
  const googleLogin = (userEmail, user) => {
    props.setLogin(true);
    props.setUser(userEmail);
    props.setCurrentUser(user);
  };
  return (
    <div>
      <GoogleSignin setLogin={googleLogin} />
      <hr />
      <button
        onClick={(e) => {
          props.openAuthModal();
        }}>
        SignIn/SignUp
      </button>
    </div>
  );
}

const GuestUserDropdown = DropdownMenu(GuestUser);
export default GuestUserDropdown;
