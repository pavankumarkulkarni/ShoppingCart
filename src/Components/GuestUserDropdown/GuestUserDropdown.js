import React from "react";
import GoogleSignin from "../GoogleSignin/GoogleSignin";
import DropdownMenu from "../HOC/DropdownMenu";
// import UserContext from "../Context/UserContext"

function GuestUser(props) {
  // const {loggedInUser, setLoggedInUSer} = UserContext
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
        Sign In / Sign Up
      </button>
    </div>
  );
}

const GuestUserDropdown = DropdownMenu(GuestUser);
export default GuestUserDropdown;
