import React from "react";
import GoogleSignin from "../GoogleSignin/GoogleSignin";
import DropdownMenu from "../HOC/DropdownMenu";

function GuestUser(props) {
  // const [email, setEmail] = useState("");
  // const [passwd, setPasswd] = useState("");
  // const [repasswd, setRepasswd] = useState("");
  // const [signup, setSignup] = useState(false);
  const googleLogin = (userEmail) => {
    props.setLogin(true);
    props.setUser(userEmail);
  };
  return (
    <div>
      <GoogleSignin setLogin={googleLogin} />
      <button
        onClick={(e) => {
          props.openAuthModal();
        }}
      >
        SignIn/SignUp
      </button>
    </div>
  );
}

const GuestUserDropdown = DropdownMenu(GuestUser);
export default GuestUserDropdown;
