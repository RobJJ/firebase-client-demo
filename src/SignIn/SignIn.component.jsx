import React from "react";
import { signInWithGooglePopup } from "../Firebase/Firebase-config";
import ClientDataService from "../Firebase/Firebase-services";
//
const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    ClientDataService.createUserDocFromAuth(response.user);
  };
  //
  //
  return (
    <div>
      <h2>Sign In!</h2>
      <button
        className="bg-slate-200 p-2"
        type="button"
        onClick={logGoogleUser}
      >
        Sign in with Google popup
      </button>
    </div>
  );
};
//
export default SignIn;
