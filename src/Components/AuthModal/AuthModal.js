import React, { Component } from "react";
import { WithModal } from "../HOC/Modal";
import style from "./AuthModal.module.css";
// import GoogleSignin from "../GoogleSignin/GoogleSignin";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      repassword: "",
      signUp: false,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // this.props.closeModal();
    // this.props.setLogin(true);
    if (this.state.signUp) {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          passwordcheck: this.state.repassword,
        }),
      });
      const data = await res.json();
      alert(data.msg);
      if (res.status === 200) {
        this.props.closeModal();
      }
    }
  };

  googleLogin = (userEmail) => {
    this.props.closeModal();
    this.props.setLogin(true);
    this.props.setUser(userEmail);
  };

  signIn = (e) => {
    this.setState({ signUp: false, email: "", password: "", repassword: "" });
    // console.log("Sign In");
  };
  signUp = (e) => {
    this.setState({ signUp: true, email: "", password: "", repassword: "" });
    // console.log("Sign Up");
  };
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    console.log(value);
    this.setState({ [name]: value });
  };

  render() {
    const bgColor = this.state.signUp
      ? "rgba(85,61,103,0.6)"
      : "rgba(80,27,29,0.5)";
    const signUpPadding = this.state.signUp
      ? { padding: "1rem" }
      : { padding: "0.5rem" };
    const signIpPadding = !this.state.signUp
      ? { padding: "1rem" }
      : { padding: "0.5rem" };
    return (
      <div className={style.auth} style={{ backgroundColor: bgColor }}>
        <button
          className={style.signin}
          style={signIpPadding}
          onClick={this.signIn}>
          Sign In
        </button>
        <button
          style={signUpPadding}
          className={style.signup}
          onClick={this.signUp}>
          Sign Up
        </button>
        <form onSubmit={this.handleSubmit} className={style.authform}>
          <label htmlFor='email'>Email : </label>
          <input
            type='email'
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
            required
            pattern='.{6,12}'
            title='Password length 6-12 characters'
          />

          {this.state.signUp ? (
            <>
              <label htmlFor='repassword'>Confirm password: </label>
              <input
                type='password'
                name='repassword'
                value={this.state.repassword}
                onChange={this.handleChange}
                required
                pattern='.{6,12}'
                title='Password length 6-12 characters'
              />
              <button type='submit' className={style.join}>
                Join
              </button>
            </>
          ) : (
            <button type='submit' className={style.enter}>
              Enter
            </button>
          )}
        </form>
        {/* {!this.state.signUp ? (
          <GoogleSignin setLogin={this.googleLogin} />
        ) : null} */}
      </div>
    );
  }
}

const AuthWithModal = WithModal(Auth);
export default AuthWithModal;
