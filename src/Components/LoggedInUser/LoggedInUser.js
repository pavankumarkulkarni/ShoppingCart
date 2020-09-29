import React from "react";
import DropdownMenu from "../HOC/DropdownMenu";
import { Link } from "react-router-dom";

function LoggedInUser(props) {
  // const title = <i className="fas fa-user-circle fa-2x"></i>;

  return (
    <div>
      <Link to="/profile">Profile</Link>
      {/* <a href="/profile">Profile</a> */}
      <hr />
      <button onClick={props.signOut}>Logout</button>
    </div>
  );
}

const LoggedInUserDropdown = DropdownMenu(LoggedInUser);
export default LoggedInUserDropdown;
