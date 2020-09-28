import React from "react";
import style from "./GoogleSignin.module.css";
const GOOGLE_BUTTON_ID = "google-sign-in-button";

export default class GoogleSignin extends React.Component {
  componentDidMount() {
    window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
      width: 200,
      height: 50,
      onsuccess: this.onSuccess,
    });
  }

  onSuccess = (googleUser) => {
    alert("Google sign in success !");
    const profile = googleUser.getBasicProfile();
    this.props.setLogin(profile.getName());
  };

  render() {
    return <div id={GOOGLE_BUTTON_ID} className={style.login} />;
  }
}
