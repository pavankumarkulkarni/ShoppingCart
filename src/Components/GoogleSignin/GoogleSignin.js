import React from "react";
// import style from "./GoogleSignin.module.css";
// const GOOGLE_BUTTON_ID = "google-sign-in-button";
import GoogleLogin from "react-google-login";

export default class GoogleSignin extends React.Component {
  // componentDidMount() {
  //   // window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
  //   //   width: 200,
  //   //   height: 50,
  //   //   onsuccess: this.onSuccess,
  //   // });
  //   <GoogleLogin
  //   clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
  //   buttonText="Login"
  //   onSuccess={responseGoogle}
  //   onFailure={responseGoogle}
  //   cookiePolicy={'single_host_origin'}
  // />
  // }

  onSuccess = (googleUser) => {
    // alert("Google sign in success !");
    const profile = googleUser.getBasicProfile();
    this.props.setLogin(profile.getName());
    console.log(profile);
    console.log(profile.getName());
    console.log(profile.getImageUrl());
    console.log(profile.getEmail());
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
