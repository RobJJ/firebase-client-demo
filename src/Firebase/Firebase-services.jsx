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
  //   //
  //   updateBook = (id, updatedBook) => {
  //     const bookDoc = doc(db, "books", id);
  //     return updateDoc(bookDoc, updatedBook);
  //   };
  //   //
  deleteClient = (id) => {
    const clientDoc = doc(db, "clients", id);
    return deleteDoc(clientDoc);
  };
  //   //
  getAllClients = () => {
    return getDocs(clientCollectionRef);
  };
  //
  //   getBook = (id) => {
  //     const bookDoc = doc(db, "books", id);
  //     return getDoc(bookDoc);
  //   };
}

export default new ClientDataService();
