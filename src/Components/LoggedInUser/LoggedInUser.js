import React from "react";
import DropdownMenu from "../HOC/DropdownMenu";

function LoggedInUser(props) {
  // const title = <i className="fas fa-user-circle fa-2x"></i>;

  return (
    <div>
      <button>Profile</button>
      <button onClick={props.signOut}>Logout</button>
    </div>
  );
}

const LoggedInUserDropdown = DropdownMenu(LoggedInUser);
export default LoggedInUserDropdown;
