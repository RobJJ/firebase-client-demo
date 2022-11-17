import React from "react";
import { useGlobalContext } from "../Context-Reducer/Context";
import {
  signInWithGooglePopup,
  signOutUser,
} from "../Firebase/Firebase-config";
import ClientDataService from "../Firebase/Firebase-services";
//
const SignIn = () => {
  //
  const { currentUser, setClients } = useGlobalContext();
  //
  const logGoogleUser = async () => {
    await signInWithGooglePopup();
    // response from creation
    // console.log(response.user);
    // await ClientDataService.getUser(response.user.uid);
    // logging the unique id of the user
    // console.log(currentUser.id);
    // logging the data of the user
    // console.log(currentUser.data());
  };
  //
  const handleLogOut = async () => {
    // Sign out the user from firestore
    await signOutUser().then(console.log("User logged out"));
  };
  //
  //
  return (
    <div>
      <h2>{currentUser ? "Sign Out" : "Sign In"}</h2>
      <button
        className="bg-slate-200 p-2 mt-2"
        type="button"
        onClick={logGoogleUser}
      >
        Google Sign In!
      </button>
      <br></br>
      <button
        className="bg-slate-200 p-2 mt-2"
        type="button"
        onClick={handleLogOut}
      >
        Sign Out!
      </button>
    </div>
  );
};
//
export default SignIn;
