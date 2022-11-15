import React from "react";
import { signInWithGooglePopup } from "../Firebase/Firebase-config";
//
const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  };
  //
  //
  return (
    <div>
      <h2>Sign In!</h2>
      <button type="button" onClick={logGoogleUser}>
        Sign in with Google popup
      </button>
    </div>
  );
};
//
export default SignIn;
