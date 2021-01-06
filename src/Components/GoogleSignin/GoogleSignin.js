import React, { useContext } from "react";
import GoogleLogin from "react-google-login";
import UserContext from "../Context/UserContext";

export default function GoogleSignin() {
  const { setLoggedInUser } = useContext(UserContext);
  const onSuccess = async (googleUser) => {
    const profile = googleUser.getBasicProfile();
    const uname = profile.getName();
    const uemail = profile.getEmail();

    let user, userdata;
    user = await fetch(`/api/users/${uemail}`);
    if (user.status === 200) {
      userdata = await user.json();
      alert(`Welcome back ${uname}`);
    } else {
      user = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: uemail,
          displayName: uname,
          type: "google",
        }),
      });
      userdata = await user.json();

      alert(`Thanks for joining us ${uname}`);
    }

    // this.props.setLogin(profile.getName(), userdata);

    setLoggedInUser({
      displayName: uname,
      email: uemail,
      id: userdata.user._id,
      token: userdata.token,
      type: "google",
      card: userdata.user.card,
      address: userdata.user.address,
    });
    sessionStorage.setItem("authxtoken", userdata.token);
  };

  return (
    <GoogleLogin
      render={(renderProps) => (
        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
          Login with Google
        </button>
      )}
      clientId='55500008962-naome7c4ht95kve4c525vistnllf1195.apps.googleusercontent.com'
      buttonText='Login'
      onSuccess={onSuccess}
      // onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      // isSignedIn={true}
    />
  );
}
