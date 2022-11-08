// Import the database that you have created
import { db } from "./Firebase-config";
// Import functions from firestore
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
//
// This is a reference to the 'books' collection in your firestore database
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
}

export default new ClientDataService();
