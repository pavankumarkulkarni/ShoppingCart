import React from "react";
import DropdownMenu from "../HOC/DropdownMenu";
import { Link } from "react-router-dom";
import { GoogleLogout } from "react-google-login";

function LoggedInUser(props) {
  // const title = <i className="fas fa-user-circle fa-2x"></i>;

  return (
    <div>
      <button>
        <Link to='/profile'>Account Profile</Link>
      </button>
      <hr />
      {props.userType === "google" ? (
        <GoogleLogout
          clientId='658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
          buttonText='Google Logout'
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}>
              Google Logout
            </button>
          )}
          onLogoutSuccess={props.signOut}></GoogleLogout>
      ) : (
        <button onClick={props.regUserLogout}>Sign Out</button>
      )}
    </div>
  );
}

const LoggedInUserDropdown = DropdownMenu(LoggedInUser);
export default LoggedInUserDropdown;
