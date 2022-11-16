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
//
// Creating a new class here, to share methods
class ClientDataService {
  //
  addClient = (newClient) => {
    return addDoc(clientCollectionRef, newClient);
  };
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
    return getDoc(clientDoc);
  };
  //
  // ************************
  // Creating User Based methods here,, should seperate this into its own class ... try here first. Do they share any info? besides the db...
  createUserDocFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);
    //
    const userSnapShot = await getDoc(userDocRef);
    //
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
    return userDocRef;
  };
}
//

export default new ClientDataService();
