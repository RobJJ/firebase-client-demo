import React, { useContext, useState, useReducer, useEffect } from "react";
import reducer from "./Reducer";
import ClientDataService from "../Firebase/Firebase-services";
import { v4 as uuidv4 } from "uuid";
import { onAuthStateChangedListener } from "../Firebase/Firebase-config";
//
const AppContext = React.createContext();
//
// Initial State
const initialState = {
  clients: [],
  // loading: false,
  focused: {},
  uniqueClients: 0,
};
// Client Default
const clientTemplate = {
  name: "",
  joined: "",
  debits: [],
  credits: [],
  notes: [],
};
//
const debitTemplate = {
  date: "",
  id: "",
  amount: "",
  sessions: 0,
  notes: "",
};
//
const AppProvider = ({ children }) => {
  //   const [clientCollection, setClientCollection] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [client, setClient] = useState(clientTemplate);
  const [clients, setClients] = useState([]);
  const [editClient, setEditClient] = useState({});
  const [id, setId] = useState("");
  const [debitInfo, setDebitInfo] = useState(debitTemplate);
  const [currentUser, setCurrentUser] = useState(null);
  // try
  const [viewNote, setViewNote] = useState(false);
  //
  useEffect(() => {
    // Passing the callback to the listener - calls unsub on unmount - cleans up the function on the listener
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        ClientDataService.createUserDocFromAuth(user);
        getAllUsersClients(user.uid);
      } else {
        setClients([]);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  // Methods
  ////////////////////////////////////////////////
  // OLD WAY
  const submitNewClient = async (e) => {
    // console.log("Event: ", e);
    e.preventDefault();
    const dateJoined = new Date().toISOString().slice(0, 10);

    await ClientDataService.addClient({ ...client, joined: dateJoined });
    dispatch({ type: "ADD_CLIENT", payload: { client, dateJoined } });
    getAllClients();
    setClient(clientTemplate);
  };
  // NEW WAY -
  const submitNewClientToUser = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    const currentUserID = currentUser.uid;
    // console.log(currentUserID);
    await ClientDataService.addClientToUser(currentUserID, client);
    getAllUsersClients(currentUserID);
    setClient(clientTemplate);
  };
  //////////////////////////////////////////////////
  // OLD WAY
  const getAllClients = async () => {
    const data = await ClientDataService.getAllClients();
    // This log returns the length of the client collection...(on add or delete)
    // console.log(data.docs.length);
    // clientsArr is an array of client objects that contains their properties
    const clientsArr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // console.log("Client ARray from call: ", clientsArr);
    setClients(clientsArr);
  };
  // NEW WAY - needs to be called in correct moments
  // First: When a user logs in
  // Second: When a user adds a client
  // Third: When a user logs out - setClients([])
  const getAllUsersClients = async (userId) => {
    const data = await ClientDataService.getAllUsersClients(userId);
    const clientsArr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setClients(clientsArr);
  };
  ////////////////////////////////////////////////////
  const handleDelete = async (id) => {
    try {
      await ClientDataService.deleteClient(id);
    } catch (error) {
      console.log("Error in handleDelete: ", error);
    }
    getAllClients();
  };
  //
  const handleDebit = async (e) => {
    e.preventDefault();
    // Old way of handling the debit
    // const docSnap = await ClientDataService.getClient(id);
    //
    // const updatedClient = {
    //   ...docSnap.data(),
    //   debits: [...docSnap.data().debits, { ...debitInfo, id: uuidv4() }],
    // };
    // New way
    const updatedClient = {
      ...editClient,
      debits: [...editClient.debits, { ...debitInfo, id: uuidv4() }],
    };
    //
    await ClientDataService.updateClient(id, updatedClient);
    const docSnap = await ClientDataService.getClient(id);
    setEditClient({ ...docSnap.data() });
    //
    // setId("");
    setDebitInfo(debitTemplate);
  };
  //
  return (
    <AppContext.Provider
      value={{
        ...state,
        client,
        setClient,
        submitNewClient,
        getAllClients,
        clients,
        handleDelete,
        id,
        setId,
        editClient,
        setEditClient,
        handleDebit,
        debitInfo,
        setDebitInfo,
        viewNote,
        setViewNote,
        currentUser,
        setCurrentUser,
        submitNewClientToUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
//
//
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
