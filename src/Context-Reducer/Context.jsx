import React, { useContext, useState, useReducer } from "react";
import reducer from "./Reducer";
import ClientDataService from "../Firebase/Firebase-services";
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
  const [id, setId] = useState("");
  const [debitInfo, setDebitInfo] = useState(debitTemplate);
  //
  // Methods
  //
  const submitNewClient = async (e) => {
    // console.log("Event: ", e);
    e.preventDefault();
    const dateJoined = new Date().toISOString().slice(0, 10);

    await ClientDataService.addClient({ ...client, joined: dateJoined });
    dispatch({ type: "ADD_CLIENT", payload: { client, dateJoined } });
    getAllClients();
    setClient(clientTemplate);
  };
  //
  const getAllClients = async () => {
    const data = await ClientDataService.getAllClients();
    // clientsArr is an array of client objects that contains their properties
    const clientsArr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // console.log("Client ARray from call: ", clientsArr);
    setClients(clientsArr);
  };
  //
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
    const docSnap = await ClientDataService.getClient(id);
    console.log(docSnap.data().name);
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
        handleDebit,
        debitInfo,
        setDebitInfo,
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
