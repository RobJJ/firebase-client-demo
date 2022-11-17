// Import the database that you have created
import { db } from "./Firebase-config";
// Import functions from firestore
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
//
// This is a reference to the 'clients' collection in your firestore database
const clientCollectionRef = collection(db, "clients");
const userCollectionRef = collection(db, "users");
//
// Creating a new class here, to share methods
class ClientDataService {
  /////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////
  // This adds a client to the collection
  addClient = (newClient) => {
    // addDoc - adds the doc to the collection with a new UID. The data passed to it will be the data at that UID in the collections
    return addDoc(clientCollectionRef, newClient);
  };
  // I want this to target the correct user, and then add a client to it
  addClientToUser = async (userUID, newClient) => {
    // First: Get the docRef for the current user
    const userDocRef = doc(db, "users", userUID);
    // Second: Get the collectionRef for the clients of current user
    const userClientsCollectionRef = collection(userDocRef, "clients");
    // Third: Add a document to that collection - the document is the unique client and the data is the object passed in.
    return addDoc(userClientsCollectionRef, newClient);
  };
  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////
  // This method updates the doc @ id with a new object
  updateClient = (id, newData) => {
    const clientDoc = doc(db, "clients", id);
    return updateDoc(clientDoc, newData);
  };
  //   //
  deleteClient = (id) => {
    const clientDoc = doc(db, "clients", id);
    return deleteDoc(clientDoc);
  };
  //   //
  getAllClients = () => {
    return getDocs(clientCollectionRef);
  };
  // This gets you the client at id - its passed from the clientList
  getClient = (id) => {
    const clientDoc = doc(db, "clients", id);
    // getDoc() is more of a getter
    return getDoc(clientDoc);
  };
  //
  // ************************
  // Creating User Based methods here,, should seperate this into its own class ... try here first. Do they share any info? besides the db...
  createUserDocFromAuth = async (userAuth) => {
    // doc() gets the doc back
    const userDocRef = doc(db, "users", userAuth.uid);
    //
    const userSnapShot = await getDoc(userDocRef);
    //
    // Does the user exists? If not lets create one for DB
    if (!userSnapShot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      // Create this object to contain the basic info, which in turn seperates it from the clients object. Singular field vs spread out
      const userInfo = {
        displayName,
        email,
        createdAt,
      };
      try {
        await setDoc(userDocRef, {
          userInfo,
        });
      } catch (error) {
        console.log("Error creating the user! : ", error.message);
      }
    }
    // User does exist? Then just return the userDocRef from DB
    return userDocRef;
  };
  //
  getUser = (uid) => {
    const userDoc = doc(db, "users", uid);
    return getDoc(userDoc);
  };
}
//

export default new ClientDataService();
