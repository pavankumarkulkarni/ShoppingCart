import React from "react";
// import style from "./GoogleSignin.module.css";
// const GOOGLE_BUTTON_ID = "google-sign-in-button";
import GoogleLogin from "react-google-login";

export default class GoogleSignin extends React.Component {
  onSuccess = async (googleUser) => {
    // alert("Google sign in success !");
    const profile = googleUser.getBasicProfile();
    const uname = profile.getName();
    const uemail = profile.getEmail();
    this.props.setLogin(profile.getName());
    let user, userdata;
    user = await fetch(`/api/users/${uemail}`);
    userdata = await user.json();
    if (userdata.length > 0) {
      alert(`Welcome back ${uname}`);
    } else {
      user = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: uemail, name: uname }),
      });
      userdata = await user.json();
      alert(`Thanks for joining us ${uname}`);
    }
  };

  render() {
    return (
      <GoogleLogin
        render={(renderProps) => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Login with Google
          </button>
        )}
        clientId="55500008962-naome7c4ht95kve4c525vistnllf1195.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.onSuccess}
        // onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    );
  }
}
